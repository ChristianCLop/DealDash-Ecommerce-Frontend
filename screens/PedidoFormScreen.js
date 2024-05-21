import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import { updatePedidos } from '../api';

export default function PedidoFormScreen({ route }) {
  const { pedido } = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const [newPedido, setPedio] = useState({
    est_ped: ''
  });

  const handelNuevo = (name, value) => setPedio({ ...newPedido, [name]: value })

  useEffect(() => {
    console.log('El id del pedido es: ', pedido.id_ped);
  }, [pedido.id_ped]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleModal();
    handelNuevo('est_ped', option);
  };

  const handleGuardar = async () => {
    try {
      await updatePedidos(pedido.id_ped, newPedido);
      console.log('Pedido actualizado en la base de datos');
    } catch (error) {
      console.error('Error al actualizar el pedido en la base de datos:', error);
    }
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../assets/images/carrito.jpg')}
      style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color='white' />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 10,
            marginHorizontal: 16,
            padding: 16,
            marginTop: 16,
          }}
        >
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>ID: {pedido.id_ped}</Text>
          <Text style={{ color: 'white', fontSize: 18, marginTop: 8 }}>
            Comprador: {pedido.nom_usu}
          </Text>
          <Text style={{ color: 'white', fontSize: 18, marginTop: 8 }}>Producto: {pedido.nom_pro}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: themeColors.bgDark,
              marginTop: 8,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={toggleModal}
          >
            <Text onChangeText={(text) => handelNuevo('est_pro', text)} style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Estado: {selectedOption || pedido.est_ped}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: themeColors.bgDark, padding: 16, borderRadius: 8, width: '80%' }}>
              <FlatList
                data={['Procesando', 'Completado', 'Cancelado']}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleOptionSelect(item)} style={{ paddingVertical: 10 }}>
                    <Text style={{ color: 'white' }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <View className={`space-y-3 mb-3`}>
          {/* Boton de compra */}
          <View className="flex-row justify-between px-4">
            <TouchableOpacity
              style={{ backgroundColor: themeColors.bgLight }}
              className="p-4 rounded-full flex-1 ml-4"
              onPress={handleGuardar}>
              <Text className="text-center text-white text-base font-semibold">Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground >
  );
}
