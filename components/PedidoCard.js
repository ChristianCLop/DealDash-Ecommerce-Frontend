import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

const PedidosList = ({ pedidos }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={pedidos}
      keyExtractor={(item) => item.id_ped + ''}
      renderItem={({ item }) => (
        <TouchableOpacity
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
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Producto:</Text>
              <Text style={{ color: 'white', opacity: 0.9 }}>{item.nom_pro}</Text>
            </View>

            <View>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Estado:</Text>
              <Text style={{ color: 'white', opacity: 0.9 }}>{item.est_ped}</Text>
            </View>
          </View>


        </TouchableOpacity>
      )}
    />
  );
};

export default PedidosList;
