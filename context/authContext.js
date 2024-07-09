// @ts-check
import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs.js';
import { router } from 'expo-router';

/**
 * @type {typedefs.AuthState}
 */
const initialState = {
  isSignedIn: false,
  accessToken: null,
  idToken: null,
  userInfo: null,
};

const AuthContext = createContext({
  state: initialState,
  signIn: () => {},
  signOut: () => {},
  refreshToken: async () => {},
  checkUserProfile: async () => {},
  hasRole: (role) => false,
});

const AuthProvider = ({ children }) => {
  // @ts-ignore
  const discovery = useAutoDiscovery(process.env.EXPO_PUBLIC_KEYCLOAK_URL);
  const redirectUri = 'myapp://redirect';
  const [request, response, promptAsync] = useAuthRequest(
    {
      // @ts-ignore
      clientId: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID,
      redirectUri: redirectUri,
      scopes: ['openid', 'profile'],
    },
    discovery
  );

  const [authState, dispatch] = useReducer((previousState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...previousState,
          isSignedIn: true,
          accessToken: action.payload.access_token,
          idToken: action.payload.id_token,
        };
      case 'USER_INFO':
        return {
          ...previousState,
          userInfo: {
            username: action.payload.preferred_username,
            givenName: action.payload.given_name,
            familyName: action.payload.family_name,
            email: action.payload.email,
            roles: action.payload.roles,
          },
        };
      case 'SIGN_OUT':
        return {
          initialState,
        };
    }
  }, initialState);

  const getToken = async ({ code, codeVerifier, redirectUri }) => {
    try {
      const formData = {
        grant_type: 'authorization_code',
        client_id: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID,
        code: code,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri,
      };
      const formBody = [];
      for (const property in formData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(formData[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formBody.join('&'),
        }
      );
      if (response.ok) {
        const payload = await response.json();
        console.log('TOKEN: ', payload);
        await AsyncStorage.setItem('accessToken', JSON.stringify(payload.access_token));
        await SecureStore.setItemAsync('refreshToken', payload.refresh_token);
        dispatch({ type: 'SIGN_IN', payload });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const authContext = useMemo(
    () => ({
      state: authState,
      signIn: async () => {
        try {
          console.log('Prompting for authentication...');
          const result = await promptAsync();
          console.log('Auth prompt result:', result);

          if (result.type === 'success') {
            const { code } = result.params;
            console.log('Obtaining token...');
            const tokenSuccess = await getToken({
              code,
              codeVerifier: request?.codeVerifier,
              redirectUri,
            });
            console.log('Token obtained:', tokenSuccess);

            if (tokenSuccess) {
              console.log('Sign-in successful');
              return true;
            }
          }
          console.log('Sign-in unsuccessful');
          return false;
        } catch (error) {
          console.error('Error during sign-in:', error);
          return false;
        }
      },

      signOut: async () => {
        try {
          const idToken = authState.idToken;
          await fetch(
            `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/logout?id_token_hint=${idToken}`
          );
          await AsyncStorage.clear(); // <-- Remove tokens from AsyncStorage on sign-out
          // @ts-ignore
          dispatch({ type: 'SIGN_OUT' });
        } catch (e) {
          console.warn(e);
        }
      },
      refreshToken: async () => {
        try {
          console.log('Refreshing token...');
          const refreshToken = await SecureStore.getItemAsync('refreshToken');
          console.log('REFRESH TOKEN: ', refreshToken);
          if (!refreshToken) {
            return false;
          }

          const response = await fetch(
            `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/token`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID,
                refresh_token: refreshToken,
              }).toString(),
            }
          );

          if (response.ok) {
            const payload = await response.json();
            await AsyncStorage.setItem('accessToken', payload.access_token);
            await SecureStore.setItemAsync('refreshToken', payload.refresh_token);
            dispatch({ type: 'SIGN_IN', payload });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error refreshing token:', error);
          return false;
        }
      },
      checkUserProfile: async () => {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          const response = await fetch('http://204.216.223.231:8080/user/profile/get', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken.replace(/^"(.*)"$/, '$1'),
            },
          });
          console.log('PROFILE RESPONSE: ', response);
          if (response.ok) {
            const data = await response.json();
            // Store profile data if needed
            // await AsyncStorage.setItem('userProfile', JSON.stringify(data));
            return { exists: true, data };
          } else {
            return { exists: false };
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          return { exists: false, error };
        }
      },
      hasRole: (role) => authState.userInfo?.roles.indexOf(role) != -1,
    }),
    [authState, promptAsync]
  );

  /**
   * Get access-token when authorization-code is available
   */
  useEffect(() => {
    //console.log(response);
    if (response?.type === 'success') {
      const { code } = response.params;
      getToken({
        code,
        codeVerifier: request?.codeVerifier,
        redirectUri,
      });
    } else if (response?.type === 'error') {
      console.warn('Authentication error: ', response.error);
    } else if (response?.type === 'cancel') {
      console.log('Authentication dismissed');
      //wait 0.5 seconds before prompting again
      setTimeout(() => {
        promptAsync();
      }, 500);
    }
  }, [dispatch, redirectUri, request?.codeVerifier, response]);

  /**
   * Get user-info when signing in completed
   */
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const accessToken = authState.accessToken;
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/userinfo`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + accessToken,
              Accept: 'application/json',
            },
          }
        );
        if (response.ok) {
          const payload = await response.json();
          // @ts-ignore
          dispatch({ type: 'USER_INFO', payload });
        }
      } catch (e) {
        console.warn(e);
      }
    };
    if (authState.isSignedIn) {
      getUserInfo();
    }
  }, [authState.accessToken, authState.isSignedIn, dispatch]);

  useEffect(() => {
    const checkStoredTokens = async () => {
      const storedTokens = await AsyncStorage.getItem('accessToken'); // <-- Check for stored tokens when the component mounts
      if (storedTokens) {
        const payload = JSON.parse(storedTokens);
        dispatch({ type: 'SIGN_IN', payload });
      }
    };
    checkStoredTokens();
  }, []);

  return (
    <AuthContext.Provider
      // @ts-ignore
      value={authContext}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
