import { View, Image, Text } from 'react-native';
import React, { useEffect } from 'react' ;
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function TelaInicio() {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => navigation.navigate('Principal'), 2000);
    }, [])
  return (
    <View className="flex-1 justify-center items-center bg-white relative">
        <StatusBar style='light'/>

        <Image 
            source={require("../../assets/background.jpg")}
            style={{position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover'}}
        />

            <View className="flex items-center space-y-2">
                <Text className="font-bold text-white tracking-widest text-4xl">
                    Food Recipes
                </Text>

                <Text className="font-medium text-white text-center tracking-widest text-lg">
                    Varios tipos de receitas para preparar em casa
                </Text>
            </View>

        {/* Imagem de fundo */}
    </View>
  )
}