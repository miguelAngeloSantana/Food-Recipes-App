import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { CacheImagens } from '../cache/cacheImagens';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Categorias({categorias, clickCategoria, changeCategoria}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
          categorias.map((cat, index) => {
            let isClick = cat.strCategory == clickCategoria;
            let bgCategoria = isClick? "bg-amber-400": "bg-slate-50"

            return (
              <TouchableOpacity
                key={index}
                onPress={() => changeCategoria(cat.strCategory)}
                className="flex items-center space-y-1"
              >
                <View className={"items-center rounded-full p-4 "+bgCategoria}>
                  <CacheImagens 
                    uri={cat.strCategoryThumb}
                    style={{width: 40, height: 40}}
                    className="rounded-full"
                  />
                </View>
                <Text className="text-sm text-zinc-700">
                    {cat.strCategory}
                  </Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  )
}