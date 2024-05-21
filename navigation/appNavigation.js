import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen'
import RegistroScreen from '../screens/RegistroScreen'
import PerfilScreen from '../screens/PerfilScreen'
import HomeScreen from '../screens/HomeScreen';
import ProductoListScreen from '../screens/ProductoListScreen';
import ProductoFormScreen from '../screens/ProductoFormScreen';
import ProductoScreen from '../screens/ProductoScreen';
import PedidoListScreen from '../screens/PedidoListScreen';
import PedidoMioFormScreen from '../screens/PedidoMioListScreen';
import PedidoFormScreen from '../screens/PedidoFormScreen';
import UsuarioFormScreen from '../screens/UsuarioFormScreen';
import PayPalWebView from '../screens/PayPalWebView';
import { Dimensions, LogBox, Text, View } from 'react-native';
import ProductScreen from '../screens/ProductScreen';
import { themeColors } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon as HomeOutline, TagIcon as TagOutline, TruckIcon as TruckIconOutline, ShoppingCartIcon as CartOutline } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolid, TagIcon as TagSolid, TruckIcon as TruckIconSolid, ShoppingCartIcon as CartSolid } from 'react-native-heroicons/solid';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        contentStyle: { backgroundColor: 'white' }
      }}>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Registro" options={{ headerShown: false }} component={RegistroScreen} />
        <Stack.Screen name="Perfil" options={{ headerShown: false }} component={PerfilScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name="Producto" options={{ headerShown: false }} component={ProductoListScreen} />
        <Stack.Screen name="ProductoForm" options={{ headerShown: false }} component={ProductoFormScreen} />
        <Stack.Screen name="ProductoInfo" options={{ headerShown: false }} component={ProductoScreen} />
        <Stack.Screen name="Pedido" options={{ headerShown: false }} component={PedidoListScreen} />
        <Stack.Screen name="PedidoMio" options={{ headerShown: false }} component={PedidoMioFormScreen} />
        <Stack.Screen name="PedidoForm" options={{ headerShown: false }} component={PedidoFormScreen} />
        <Stack.Screen name="Product" options={{ headerShown: false }} component={ProductScreen} />
        <Stack.Screen name="Usuario" options={{ headerShown: false }} component={UsuarioFormScreen} />
        <Stack.Screen name="PayPalWebView" options={{ headerShown: false }} component={PayPalWebView} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => menuIcons(route, focused),
      tabBarStyle: {
        marginBottom: 20,
        height: 75,
        alignItems: 'center',

        borderRadius: 100,
        marginHorizontal: 20,
        backgroundColor: themeColors.bgLight,

      },
      tabBarItemStyle: {
        marginTop: 0,

      }
    })}

    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="producto" component={ProductoListScreen} />
      <Tab.Screen name="pedidoMio" component={PedidoMioFormScreen} />
      <Tab.Screen name="pedido" component={PedidoListScreen} />
    </Tab.Navigator>
  )
}

const menuIcons = (route, focused) => {
  let icon;


  if (route.name === 'home') {
    icon = focused ? <HomeSolid size="30" color={themeColors.bgLight} /> : <HomeOutline size="30" strokeWidth={2} color="white" />
  } else if (route.name === 'producto') {
    icon = focused ? <TagSolid size="30" color={themeColors.bgLight} /> : <TagOutline size="30" strokeWidth={2} color="white" />
  } else if (route.name === 'pedidoMio') {
    icon = focused ? <TruckIconSolid size="30" color={themeColors.bgLight} /> : <TruckIconOutline size="30" strokeWidth={2} color="white" />
  } else if (route.name === 'pedido') {
    icon = focused ? <CartSolid size="30" color={themeColors.bgLight} /> : <CartOutline size="30" strokeWidth={2} color="white" />
  }


  let buttonClass = focused ? "bg-white" : "";
  return (
    <View className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
      {icon}
    </View>
  )
}