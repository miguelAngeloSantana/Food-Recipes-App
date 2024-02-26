import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useContext } from 'react';
import ItemsCarrinho from '../components/ItemsCarrinho';
import AppContext from '../context/AppContext';
import { ChevronLeft, ShoppingCart } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

export default function TelaCarrinho() {
  const { favoritos } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
        className="space-y-6 pt-14"
        >

          <View className="px-4 flex-row items-center justify-between relative">
            <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white border border-red-600">
              <ChevronLeft height={30} width={30} fill="red"/>
            </TouchableOpacity>
            <ShoppingCart 
                height="35" 
                width="35" 
                stroke="gray"
                className="mr-2"
            />
            {
              favoritos.length > 0 && 
                  <Text 
                      className="bg-red-600 w-5 h-5 rounded-2xl absolute top-0 right-0 text-white flex items-center justify-center text-center mr-1"
                  >
                    {favoritos.length}
                  </Text>
            }
          </View>
          
          <View className="flex-grow overflow-auto">
            {
              favoritos.map((cartItem) => <ItemsCarrinho key={cartItem.idMeal} data={cartItem}/>)
            }
          </View>
        </ScrollView>
    </View>
  )
}