import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPedidosUsu } from '../api';
import PedidoCard from '../components/PedidoCard';
import { themeColors } from '../theme';
import { useUser } from '../context/UserContext';

const PedidoListScreen = () => {
  const [pedidos, setPedidos] = useState([]);

  const { userId } = useUser();
  const user = userId;

  const loadPedidos = async () => {
    const data = await getPedidosUsu(user);
    setPedidos(data);
  };

  useEffect(() => {
    loadPedidos();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadPedidos();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../assets/images/Entrega.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>TUS PEDIDOS</Text>
        <View style={styles.cardContainer}>
          <PedidoCard pedidos={pedidos} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Use rgba for background color with opacity
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColors.bgLight,
    marginTop: 30,
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#64908a',
    borderRadius: 50,
    padding: 15,
  },
});

export default PedidoListScreen;
