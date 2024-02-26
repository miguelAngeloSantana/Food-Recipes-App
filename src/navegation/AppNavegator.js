import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TelaInicio from '../telas/TelaInicio';
import TelaPrincipal from '../telas/TelaPrincipal';
import TelaDeDetalhes from '../telas/TelaDeDetalhes'; 
import TelaCarrinho from '../telas/TelaCarrinho';

const Stack = createNativeStackNavigator();

export default function AppNavegator() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Inicio' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Inicio' component={TelaInicio} />
            <Stack.Screen name="Principal" component={TelaPrincipal}/>
            <Stack.Screen name="DetalhesDaReceita" component={TelaDeDetalhes} />
            <Stack.Screen name="Carrinho" component={TelaCarrinho} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}