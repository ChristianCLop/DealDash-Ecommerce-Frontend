import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { themeColors } from '../theme';
import { StarIcon, TrashIcon, PlusIcon } from 'react-native-heroicons/solid';
import { deleteProductos } from '../api';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

export default function ProductosCard({ productos, loadProductos }) {
  const navigation = useNavigation();

  const confirmDelete = (productId) => {
    Alert.alert(
      'Eliminar Producto',
      '¿Estás seguro de que quieres eliminar este producto? Ten en cuenta que no se eliminará si el producto está vinculado a un pedido',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            await deleteProductos(productId);
            loadProductos();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <Carousel
      data={productos}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductoInfo', { producto: item })}
          style={{
            borderRadius: 40,
            backgroundColor: themeColors.bgDark,
            height: height * 0.55,
            width: width * 0.8,
            margin: 10,
            padding: 15,
          }}
        >
          <View
            style={{
              shadowColor: 'black',
              shadowRadius: 30,
              shadowOffset: { width: 0, height: 40 },
              shadowOpacity: 0.8,
              marginTop: 15,
            }}
            className="flex-row justify-center">
            <Image
              source={{ uri: item.ima_pro }}
              className="h-40 w-40 rounded-xl"
            />
          </View>
          <View className={`px-5 flex-1 justify-between`}>
            <View className="space-y-3 mt-3">
              <Text className="text-3xl text-white font-semibold z-10">{item.nom_pro}</Text>

              <View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-16">
                <StarIcon size="15" color="white" />
                <Text className="text-base font-semibold text-white">{item.cal_pro}</Text>
              </View>
              <View className="flex-row space-x-1 z-10 mb-6">
                <Text className="text-base text-white font-semibold opacity-60">
                  Descripción:
                </Text>
                <Text className="text-base text-white font-semibold">{item.des_pro}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>
                  ${item.cos_fin_pro}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      containerCustomStyle={{ overflow: 'visible' }}
      firstItem={1}
      loop={true}
      inactiveSlideScale={0.75}
      inactiveSlideOpacity={0.75}
      sliderWidth={width}
      itemWidth={width * 0.63}
      slideStyle={{ display: 'flex', alignItems: 'center' }}
    />
  );
}