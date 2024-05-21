import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { themeColors } from '../theme';
import { StarIcon, TrashIcon } from 'react-native-heroicons/solid';
import { deleteProductos } from '../api';
import { useNavigation } from '@react-navigation/native';

const ProductosCardUsu = ({ productos, loadProductos }) => {
  const navigation = useNavigation();

  const confirmDelete = (productId) => {
    Alert.alert(
      'Eliminar Producto',
      '¿Estás seguro de que quieres eliminar este producto?                                           Tome encuenta que no se eliminara si el producto esta vinculado a un pedido',
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
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id_pro + ''}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductoInfo', { producto: item })}
          style={{
            borderRadius: 20,
            backgroundColor: themeColors.bgDark,
            margin: 10,
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: item.ima_pro }}
            style={{ width: 80, height: 80, borderRadius: 10, marginRight: 10 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{item.nom_pro}</Text>
            <Text style={{ color: 'white', opacity: 0.7 }}>{item.des_pro}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <StarIcon size={15} color="white" />
              <Text style={{ color: 'white', marginLeft: 5, fontWeight: 'bold' }}>{item.cal_pro}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => confirmDelete(item.id_pro)}>
              <TrashIcon size={30} color="white" />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>
              ${item.cos_fin_pro}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ProductosCardUsu;