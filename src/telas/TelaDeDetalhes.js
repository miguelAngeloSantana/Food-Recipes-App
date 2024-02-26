import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react'

import { ChevronLeft } from "react-native-feather"
import { ClockIcon, UsersIcon, Square3Stack3DIcon, FireIcon, HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

import Loading from '../components/loading';
import AppContext from '../context/AppContext';
import { CacheImagens } from '../cache/cacheImagens';

export default function TelaDeDetalhes(props) {
  let item = props.route.params;

  const navigation = useNavigation();
  const [infoReceita, setInfoReceita] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setFavoritos, favoritos } = useContext(AppContext);

  useEffect(() => {
    getInfoReceitas(item.idMeal);
  }, [])

  const getInfoReceitas = async (id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      if (response && response.data) {
        setInfoReceita(response.data.meals[0]);
        setLoading(false);
      }
    } catch(error) {
      console.log("Houve um error: " + error.message);
    }
  }

  const getIngredientes = (infoReceita) => {
    if (!infoReceita) return [];
    let arrayIngredientes = [];
    
    for(let i = 1; i <= 20; i++) {
      if(infoReceita['strIngredient'+i]){
        arrayIngredientes.push(i)
      }
    }

    return arrayIngredientes;
  }

  const adicionarReceitaFavoritos = () => {
    if(!item) return;
    setFavoritos([...favoritos, item]);
  }

  const removerReceitaFavoritos = () => {
    if(!item) return;
    setFavoritos(favoritos.filter((receita) => receita.strMeal !== item.strMeal));
  } 

  const isFavorito = favoritos.some((receita) => receita.strMeal === item?.strMeal);

  return (
    <View className="flex-1 bg-white">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      >

        <StatusBar style={"light"}/>

        {/* Imagem da receita */}
        <View className="flex-row justify-center">

          <CacheImagens 
            uri={item.strMealThumb}
            style={{width: '98%', height: 400, borderRadius: 35, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}}
            sharedTransitionTag={item.strMeal}
          />
        </View>

        {/* Icones de salvar e voltar */}
        <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full flex-row justify-between absolute items-center pt-14">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
            <ChevronLeft height={30} width={30} fill="red"/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => isFavorito? removerReceitaFavoritos(): adicionarReceitaFavoritos()} className="p-2 rounded-full mr-5 bg-white">
            <HeartIcon size={35} strokeWidth={2.5} color={isFavorito? 'red': 'gray'}/>
          </TouchableOpacity>
        </Animated.View>


        {/* Informações da receita */}
        {
          loading? (
            <Loading size="large" className="mt-14"/>
          ): (
            <View className="px-4 flex justify-between space-y-4 pt-8">

              {/* nome e area */}

              <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                <Text className="text-3xl font-bold text-zinc-700 flex-1">
                  {infoReceita?.strMeal}
                </Text>
                <Text className="text-base font-medium text-zinc-500 flex-1">
                  {infoReceita?.strArea}
                </Text>
              </Animated.View>

              {/* informações de preparo */}
              <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around border-y border-gray-100">
                <View className="flex p-2">
                  <View
                    style={{width: 50, height: 50}}
                    className="flex items-center justify-center rounded-full"
                  >
                    <ClockIcon size={35} strokeWidth={2.5} color='black'/>
                  </View>
                  <View className="flex-1 items-center py-2 space-y-1">
                    <Text className="text-sm font-bold text-zinc-500">20-50</Text>
                    <Text className="text-xs font-bold text-zinc-500">min</Text>
                  </View>
                </View>

                <View className="flex p-2">
                  <View
                    style={{width: 50, height: 50}}
                    className="flex items-center justify-center"
                  >
                    <Square3Stack3DIcon size={35} strokeWidth={2.5} color='black'/>
                  </View>
                  <View className="flex-1 items-center py-2 space-y-1">
                    {/* <Text className="text-sm font-bold text-zinc-500"></Text> */}
                    <Text className="text-xs font-bold text-zinc-500">Facil</Text>
                  </View>
                </View>

                <View className="flex p-2">
                  <View
                    style={{width: 50, height: 50}}
                    className="flex items-center justify-center"
                  >
                    <UsersIcon size={35} strokeWidth={2.5} color='black'/>
                  </View>
                  <View className="flex-1 items-center py-2 space-y-1">
                    <Text className="text-sm font-bold text-zinc-500">2-4</Text>
                    <Text className="text-xs font-bold text-zinc-500">pessoas</Text>
                  </View>
                </View>

                <View className="flex p-2">
                  <View
                    style={{width: 50, height: 50}}
                    className="flex items-center justify-center"
                  >
                    <FireIcon size={35} strokeWidth={2.5} color='black'/>
                  </View>
                  <View className="flex-1 items-center py-2 space-y-1">
                    <Text className="text-sm font-bold text-zinc-500">110</Text>
                    <Text className="text-xs font-bold text-zinc-500">Cal</Text>
                  </View>
                </View>
              </Animated.View>


              {/* Ingredientes */}
              <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4 border-b border-gray-100 py-2">
                <Text className="text-2xl font-bold flex-1 text-zinc-700">Ingredientes necessarios</Text>
                <View className="ml-3">
                  {
                    getIngredientes(infoReceita).map(i => {
                      return (
                        <View key={i} className="flex-row space-x-4">
                          <View
                            style={{width: 16, height: 16}}
                            className="bg-yellow-500 rounded-full"
                          />
                          <View className="flex-row space-x-2">
                            <Text className="text-sm font-semibold text-zinc-700">{infoReceita['strMeasure'+i]}</Text>
                            <Text className="text-sm font-medium text-zinc-600">{infoReceita['strIngredient'+i]}</Text>
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              </Animated.View>

              {/* Instruções de prepado */}
              <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4 border-b border-gray-100 pb-2">
                <Text className="text-2xl font-bold flex-1 text-zinc-700">Instruções</Text>
                  <Text className="text-sm text-zinc-700">
                    {
                      infoReceita?.strInstructions
                    }
                  </Text>
              </Animated.View>
            </View>
          )
        }
      </ScrollView>
    </View>
  )
}