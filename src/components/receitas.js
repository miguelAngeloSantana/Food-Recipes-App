import { View, Text, Pressable } from "react-native";
import React from "react";
import Loading from "./loading";
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from 'react-native-reanimated';

import { CacheImagens } from "../cache/cacheImagens";

export default function Receitas({ receitas, categorias }) {
    const navigation = useNavigation();
    return (
        <View className="mx-4 space-y-3">
            <Text className="text-lg font-semibold text-zinc-700">Algumas receitas disponiveis</Text>
            <View>
                {
                   categorias.length == 0 || receitas.length==0? (<Loading size="large" className="mt-20" />): (
                        <MasonryList 
                            data={receitas} 
                            numColumns={2}
                            columnWrapperStyle={{gap: 10, paddingHorizontal: 12}}
                            contentContainerStyle={{gap: 10}}
                            keyExtractor={(item) => item.idMeal}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <CardReceita item={item} index={i} navigation={navigation}/>}
                        />
                    )                    
                }
            </View>
        </View>
    )
}

function CardReceita({item, index, navigation}) {
    const isLeft = index % 2 === 0;
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable
                style={{width: '100%', paddingLeft: isLeft? 0:8, paddingRight: isLeft?8:0}}
                className="flex justify-center mb-4 space-y-1"
                onPress={() => navigation.navigate('DetalhesDaReceita', {...item})}
            >
                {/* 
                    Agora todas as imagens serão armazenadas em cache, evitando a espera para que todas elas sejão bsucadas
                */}

                <CacheImagens 
                    uri={item.strMealThumb}
                    style={{width: '100%', height: index % 3 === 0? 220: 300, borderRadius: 35}}
                    className="bg-black"
                    sharedTransitionTag={item.strMeal}
                />

                <Text className="text-sm font-semibold text-zinc-700 ml-3">
                    {
                        item.strMeal.length>19? item.strMeal.slice(0, 20)+'...': item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}