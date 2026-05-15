import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { View, Image, Text } from 'react-native';

import TarefaScreen from './screens/tarefas/TarefaScreen';
import HomeScreen from './screens/home/HomeScreen';

// Cria Drawer
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          // Header
          headerStyle: {
            backgroundColor: 'rgba(241, 225, 250, 1)',
          },

          // Cor do texto do header
          headerTintColor: '#69328d',

          // Título
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={require('./assets/logo.png')}
                style={{
                  width: 22,
                  height: 30,
                }}
              />

              <Text
                style={{
                  color: '#69328d',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                ToList
              </Text>
            </View>
          ),

          // Drawer lateral
          drawerStyle: {
            backgroundColor: '#f5f5f5',
            width: 260,
          },

          // Item ativo
          drawerActiveBackgroundColor: 'rgba(241, 225, 250, 1)',

          // Texto ativo
          drawerActiveTintColor: '#69328d',

          // Texto inativo
          drawerInactiveTintColor: '#555',

          // Texto drawer
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="ToList" component={TarefaScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
