import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormularioDiario from '../Components/Formulario/Formulario';
import Listagem from '../Components/Listagem/Listagem';

const Tab = createBottomTabNavigator();

export default function MainPage() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Formulário" component={FormularioDiario} />
        <Tab.Screen name="Listagem" component={Listagem} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
