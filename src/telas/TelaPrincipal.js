import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import { AlignJustify, ShoppingCart, Search } from "react-native-feather";
import axios from'axios';
import { useNavigation } from '@react-navigation/native';

import Categorias from '../components/categorias';
import Receitas from '../components/receitas';
import AppContext from '../context/AppContext';

export default function TelaPrincipal() {
    const [clickCategoria, setClickCategoria] = useState('beef');
    const [categorias, setCategorias] = useState([]);
    const [receitas, setReceitas] = useState([]);
    const [searchReceita, setSearchReceita] = useState('');

    const navigation = useNavigation();
    const { favoritos } = useContext(AppContext);

    useEffect(() => {
        getCategorias();
        getReceitas();
    }, [])

    const changeCategoria = categoria => {
        getReceitas(categoria);
        setClickCategoria(categoria);
        setReceitas([]);
        setSearchReceita(null);
    }

    const getCategorias = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            
            if (response && response.data) {
                setCategorias(response.data.categories);
            }

        } catch(error){
            console.log('Error de consulta: ', error.message);
        }
    }

    const getReceitas = async (categoria='beef') => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
            
            if (response && response.data) {
                setReceitas(response.data.meals);
            }

        } catch(error) {
            console.log("Houve um error: " + error.message);
        }
    }

    const getSearch = async (searchReceita) => {
        setReceitas([]);

        if (!searchReceita) {
            getReceitas();
            return;
        }

        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchReceita}`);

            if(response && response.data.meals) {
                setReceitas(response.data.meals);
                setClickCategoria(null);
            } else {
                Alert.alert('Procura invalida!', 'Receita digitada não encontrada', [
                    {
                        text: "Tente de novo",
                        style: 'cancel'
                    }
                ])

                getReceitas();
            }
        } catch(error){
            console.log('Error de pesquisa: ' + error.message);
        }
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
                className="space-y-6 pt-14"
            >
                <View className="px-4 flex-row items-center justify-between relative">
                    <AlignJustify height="25" width="25" stroke="gray" />
                    <ShoppingCart 
                        height="35" 
                        width="35" 
                        stroke="gray" 
                        onPress={() => navigation.navigate('Carrinho')}
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

                {/* Boas Vindas */}
                <View className="mt-10 mx-5 space-y-2 mb-4">
                    {/* <Text className="text-xs text-zinc-700">Olá amigo!</Text> */}
                    <View>
                        <Text className="text-3xl font-semibold text-zinc-700">Prepare Otimas comidas</Text>
                    </View>
                    <Text className="text-3xl font-semibold text-zinc-700">
                        no seu <Text className="text-amber-400">tempo</Text>
                    </Text>
                </View>

                {/* Area de pesquisa */}
                <View className="mt-4 mx-5">
                    <View className="flex-row justify-between items-center p-1 rounded-full border border-gray-300">
                        <TextInput placeholder='Procure alguma receita' className="p-4 flex-1" onChangeText={setSearchReceita} value={searchReceita}/>
                        <Search height="40" width="40" stroke="gray" onPress={() => getSearch(searchReceita) }/>
                        {/* <MagnifyingGlassCircleIcon size={50} strokeWidth={3} color={'gray'}/> */}
                    </View>
                </View>

                 {/* Categorias */}
                <View className="mt-6">
                    {
                        categorias.length > 0 && <Categorias categorias={categorias} clickCategoria={clickCategoria} changeCategoria={changeCategoria}/>
                    }
                </View>

                 {/* Receitas */}
                <View className="mt-10">
                    <Receitas receitas={receitas} categorias={categorias} />
                </View>
            </ScrollView>
        </View>
    );
}