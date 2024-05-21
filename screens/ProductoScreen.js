import { View, Text, TouchableOpacity, Image, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftCircleIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { ShoppingBag } from 'react-native-feather';
import { pay, updateProductoCal } from '../api';
import { useProduc } from '../context/ProductoContext';
import { useCant } from '../context/CantContext';

export default function FavouriteScreen({ route }) {
    const { producto } = route.params;
    const navigation = useNavigation();
    const [cantAct, setCantidad] = useState(1);
    const [newCal, setNewCal] = useState(producto.cal_pro);
    const { updateProd } = useProduc();
    const { updateCant } = useCant();

    useEffect(() => {
        updateProd(producto.id_pro);
        console.log('El id del producto es: ', producto.id_pro);
    }, [producto.id_pro]);

    // Función para seleccionar la imagen según la categoría
    const getImageSource = () => {
        switch (producto.cat_pro) {
            case 'Alimentación y bebidas':
                return require('../assets/images/Comida.jpg');
            case 'Electrónicos':
                return require('../assets/images/Electronicos.jpg');
            case 'Consolas':
                return require('../assets/images/Consolas.jpg');
            case 'Ropa y accesorios':
                return require('../assets/images/Ropa.jpg');
            case 'Salud y belleza':
                return require('../assets/images/Salud.jpg');
        }
    };

    const sumCant = () => {
        setCantidad((prevCant) => prevCant + 1);
        if (cantAct == producto.sto_pro) {
            setCantidad((prevCant) => prevCant = producto.sto_pro);
        }
    };

    const resCant = () => {
        setCantidad((prevCant) => prevCant - 1);
        if (cantAct == 1) {
            setCantidad((prevCant) => prevCant = 1);
        }
    };

    const handlePayment = async () => {
        try {
            const response = await pay(producto.id_pro, cantAct);
            console.log(cantAct);
            updateCant(cantAct);
            const approvalUrl = response.links.find(link => link.rel === 'approve').href;
            navigation.navigate('PayPalWebView', { url: approvalUrl });
        } catch (error) {
            console.error(error);
        }
    };

    const handleVote = async () => {
        try {
            const productId = producto.id_pro;
            await updateProductoCal(productId, newCal);
            navigation.goBack();
            console.log('Calificación votada:', newCal);
        } catch (error) {
            console.error('Error al votar por la calificación:', error);
        }
    };

    const imageSource = getImageSource();

    return (
        <View className="flex-1">
            <StatusBar style="light" />
            <Image
                source={imageSource}
                style={{ height: 300, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
                className="w-full absolute" />
            <SafeAreaView className="space-y-4 flex-1">
                <View className="mx-4 flex-row justify-between items-center">
                    <TouchableOpacity className=" rounded-full " onPress={() => navigation.goBack()}>
                        <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color={themeColors.bgLight} />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        shadowColor: themeColors.bgDark,
                        shadowRadius: 30,
                        shadowOffset: { width: 0, height: 30 },
                        shadowOpacity: 0.9,
                    }}
                    className="flex-row justify-center">
                    <View className="border-8 rounded-full" style={{ marginTop: 40, borderColor: themeColors.bgLight }}>
                        <Image source={{ uri: producto.ima_pro }} className="h-60 w-60 rounded-full" />
                    </View>
                </View>

                <View className="flex-row justify-center items-center mx-4 space-x-4">
                    {/* Calificación actual */}
                    <View
                        style={{ backgroundColor: themeColors.bgLight }}
                        className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 opacity-90">
                        <StarIcon size="15" color="white" />
                        <Text className="text-base font-semibold text-white">{producto.cal_pro}</Text>
                    </View>

                    {/* Calificación editable */}
                    <View
                        style={{ backgroundColor: themeColors.bgLight }}
                        className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 opacity-90">
                        <StarIcon
                            size="15"
                            color={themeColors.text}
                            onPress={() => setNewCal(1)}
                            style={{ opacity: newCal >= 1 ? 1 : 0.5 }}
                        />
                        <StarIcon
                            size="15"
                            color={themeColors.text}
                            onPress={() => setNewCal(2)}
                            style={{ opacity: newCal >= 2 ? 1 : 0.5 }}
                        />
                        <StarIcon
                            size="15"
                            color={themeColors.text}
                            onPress={() => setNewCal(3)}
                            style={{ opacity: newCal >= 3 ? 1 : 0.5 }}
                        />
                        <StarIcon
                            size="15"
                            color={themeColors.text}
                            onPress={() => setNewCal(4)}
                            style={{ opacity: newCal >= 4 ? 1 : 0.5 }}
                        />
                        <StarIcon
                            size="15"
                            color={themeColors.text}
                            onPress={() => setNewCal(5)}
                            style={{ opacity: newCal === 5 ? 1 : 0.5 }}
                        />

                        {/* Boton de Calificacion */}
                        <TouchableOpacity
                            onPress={handleVote}
                            style={{ backgroundColor: themeColors.bgLight }}
                            className="p-1 px-2 rounded-full ml-4">
                            <Text className="text-center text-white text-base font-semibold">CALIFICAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-4 flex-row justify-between items-center">
                    <Text style={{ color: themeColors.text }} className="text-3xl font-semibold">
                        {producto.nom_pro}
                    </Text>
                    <Text style={{ color: themeColors.text }} className="text-lg font-semibold">
                        $ {producto.cos_fin_pro}
                    </Text>

                </View>

                <View className="px-4 space-y-2">
                    <Text style={{ color: themeColors.text }} className="text-lg font-bold">Descripción</Text>
                    <Text className="text-gray-600">
                        {producto.des_pro}
                    </Text>
                </View>

                <View className="px-4 space-y-2">
                    <Text style={{ color: themeColors.text }} className="text-lg font-bold">Stock</Text>
                    <Text className="text-gray-600">
                        {producto.sto_pro}
                    </Text>
                </View>

            </SafeAreaView>
            <View className={`space-y-3 mb-3`}>
                <View className="flex-row justify-between items-center px-4 mb-2">
                    <View className="flex-row items-center space-x-1">
                        <Text className="text-base text-gray-700 font-semibold opacity-60">
                            Categoria
                        </Text>
                        <Text className="text-base text-black font-semibold"> {producto.cat_pro}</Text>
                    </View>
                    <View
                        className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
                        <TouchableOpacity>
                            <MinusIcon onPress={resCant} size="20" strokeWidth={3} color={themeColors.text} />
                        </TouchableOpacity>
                        <Text style={{ color: themeColors.text }} className="font-extrabold text-lg">{cantAct}</Text>
                        <TouchableOpacity>
                            <PlusIcon onPress={sumCant} size="20" strokeWidth={3} color={themeColors.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Boton de compra */}
                <View className="flex-row justify-between px-4">
                    <TouchableOpacity className="p-4 rounded-full border border-gray-400">
                        <ShoppingBag size="30" color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handlePayment}
                        style={{ backgroundColor: themeColors.bgLight }}
                        className="p-4 rounded-full flex-1 ml-4">
                        <Text className="text-center text-white text-base font-semibold">Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}