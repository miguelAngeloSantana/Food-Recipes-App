import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Trash } from "react-native-feather";
import AppContext from '../context/AppContext';
import { CacheImagens } from '../cache/cacheImagens';

export default function ItemsCarrinho({ data }) {
    const {idMeal, strMealThumb, strMeal} = data;
    const { favoritos, setFavoritos } = useContext(AppContext);

    const handleClick = () => {
      const carrinhoAtualizado = favoritos.filter((item) => item.idMeal != idMeal);
      setFavoritos(carrinhoAtualizado);
    }
    
  return (
    <View className="flex-row justify-between border border-black p-2 mb-4 relative">
        <CacheImagens 
          // source={{uri: strMealThumb}}
          uri={strMealThumb}
          style={{width: "40%", height: 140, borderRadius: 35}}
        />

      <View className="w-52 flex-row items-center justify-end">
        <Text className="font-semibold text-sm text-zinc-700 ml-2 mr-3">
            {strMeal}
        </Text>
        <Trash height="30" width="30" stroke="red" onPress={() => handleClick()}/>
      </View>
    </View>
  )
}