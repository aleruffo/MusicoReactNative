import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const TabIcon = ({ icon, color, focused }) => {
  if (focused && icon === 'sparkles') {
    return (
      <LinearGradient
        colors={['#F42D78', '#6E31D8']}
        className={'px-6 py-3 rounded-full flex-row items-center'}
      >
        <Icon name={focused ? icon : icon + '-outline'} ty size={24} color={'#F0ECF7'} />
      </LinearGradient>
    );
  }

  return (
    <View
      className={focused ? 'px-6 py-3 rounded-full bg-secondary-default' : 'px-6 py-3 rounded-full'}
    >
      <Icon name={focused ? icon : icon + '-outline'} ty size={24} color={'#F0ECF7'} />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarBackground: () => (
            <LinearGradient
              colors={['#0C0A10', '#0C0A10']}
              start={[0, 1]}
              end={[0, 0]}
              style={{ flex: 1 }}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 100,
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Feed',
            headerShown: false,

            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={'home'} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: 'Events',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={'calendar'} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="ai"
          options={{
            title: 'AI',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={'sparkles'} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chats ',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={'chatbubbles'} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={'person'} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
