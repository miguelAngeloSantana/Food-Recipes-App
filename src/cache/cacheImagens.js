import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import Animated from "react-native-reanimated";

export const CacheImagens = (props) => {
    //Fonte de armazenamento em cache das imagens, sendo null por padrão
    const [storageSource, setStorageSource] = useState(null);

    const { uri } = props;

    useEffect(() => {
        //Função para obter as imagens em cache
        const getCacheImages = async () => {
            try {
                //Ira verificar os dados das imagens em cache armazenamento assincrono 

                const cacheImageData = await AsyncStorage.getItem(uri);
                // Se as imagens ja estiverem sido buscadas

                if (cacheImageData) {
                    setStorageSource({ uri: cacheImageData }); //é definido a uri de origem da imagen
                } else {
                    const response = await fetch(uri); //usando a uri, sera buscada as respostas da uri
                    const imagensBlob = await response.blob(); 

                    //Os dados da imagem sera convertido em dados 64base
                    const base64 = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imagensBlob);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                    });

                    //Armazenaremos esses dados no armazenament , evitando que esses dados sejam buscados de novo de uma uri repetida
                    await AsyncStorage.setItem(uri, base64);
                    setStorageSource({ uri: base64 }); //Definimos a fonte do cache para os dados
                }
            } catch(error){
                console.log("Erro no cache das imagens: ", error);
                setStorageSource({ uri });
            }
        };
        getCacheImages();
    }, [])

    return <Animated.Image source={storageSource} {...props} />
};