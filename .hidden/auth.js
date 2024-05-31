// const [accessToken, setAccessToken] = useState();
// const [idToken, setIdToken] = useState();
// const [refreshToken, setRefreshToken] = useState(null);
// const [discoveryResult, setDiscoveryResult] = useState();
// let userEmail = '';

// WebBrowser.maybeCompleteAuthSession();
// const redirectUri = 'myapp://redirect';
// const keycloakUri = 'http://204.216.223.231:8080';
// const keycloakRealm = 'musico-realm';
// const clientId = 'musico-gateway';

// export function generateShortUUID() {
//   return Math.random().toString(36).substring(2, 15);
// }

// useEffect(() => {
//   const getDiscoveryDocument = async () => {
//     const discoveryDocument = await AuthSession.fetchDiscoveryAsync(
//       `${keycloakUri}/realms/${keycloakRealm}`
//     );
//     setDiscoveryResult(discoveryDocument);
//   };
//   getDiscoveryDocument();
// }, []);

// export const login = async () => {
//   const state = generateShortUUID();
//   // Get Authorization code
//   const authRequestOptions = {
//     responseType: AuthSession.ResponseType.Code,
//     clientId,
//     redirectUri: redirectUri,
//     prompt: AuthSession.Prompt.Login,
//     scopes: ['openid', 'profile', 'email', 'offline_access'],
//     state: state,
//     usePKCE: true,
//   };
//   const authRequest = new AuthSession.AuthRequest(authRequestOptions);
//   const authorizeResult = await authRequest.promptAsync(discoveryResult, {
//     useProxy: true,
//   });

//   if (authorizeResult.type === 'success') {
//     // If successful, get tokens
//     const tokenResult = await AuthSession.exchangeCodeAsync(
//       {
//         code: authorizeResult.params.code,
//         clientId: clientId,
//         redirectUri: redirectUri,
//         extraParams: {
//           code_verifier: authRequest.codeVerifier || '',
//         },
//       },
//       discoveryResult
//     ).catch((error) => {
//       console.error('error', error);
//     });
//     const parts = tokenResult.accessToken
//       .split('.')
//       .map((part) => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
//     const header = JSON.parse(parts[1]);
//     userEmail = header.email;

//     console.log('token', tokenResult);

//     const setTokens = async () => {
//       setAccessToken(tokenResult.accessToken);
//       setIdToken(tokenResult.idToken);
//       setRefreshToken(tokenResult.refreshToken);
//     };
//     await setTokens();

//     alert('Logged in');
//   }
// };

// export const refresh = async () => {
//   const refreshTokenObject = {
//     clientId: clientId,
//     refreshToken: refreshToken,
//   };
//   const tokenResult = await AuthSession.refreshAsync(refreshTokenObject, discoveryResult);
//   console.log('token_refresh', tokenResult);

//   const setTokens = async () => {
//     setAccessToken(tokenResult.accessToken);
//     setIdToken(tokenResult.idToken);
//     setRefreshToken(tokenResult.refreshToken);
//   };
//   await setTokens();

//   alert('Token refreshed');
// };

// export const logout = async () => {
//   if (!accessToken) return;
//   const redirectUrl = AuthSession.makeRedirectUri({ useProxy: false });
//   const revoked = await AuthSession.revokeAsync({ token: accessToken }, discoveryResult);
//   if (!revoked) return;

//   // The default revokeAsync method doesn't work for Keycloak, we need to explicitely invoke the OIDC endSessionEndpoint with the correct parameters
//   const logoutUrl = `${discoveryResult.endSessionEndpoint}?client_id=${clientId}&post_logout_redirect_uri=${redirectUrl}&id_token_hint=${idToken}`;

//   const res = await WebBrowser.openAuthSessionAsync(logoutUrl, redirectUrl);
//   console.log('res', res);
//   if (res.type === 'success') {
//     const resetTokens = async () => {
//       setAccessToken(undefined);
//       setIdToken(undefined);
//       setRefreshToken(undefined);
//     };
//     await resetTokens();
//   }
// };

// if (!discoveryResult) return <ActivityIndicator />;
