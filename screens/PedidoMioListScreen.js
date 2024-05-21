import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPedidosMio } from '../api';
import PedidosMioCard from '../components/PedidosMioCard';
import { themeColors } from '../theme';
import { useUser } from '../context/UserContext';

const PedidoMioListScreen = () => {
  const [pedidos, setPedidos] = useState([]);

  const { userId } = useUser();
  const user = userId;

  const loadPedidosMio = async () => {
    console.log(user);
    const data = await getPedidosMio(user);
    setPedidos(data);
  };

  useEffect(() => {
    loadPedidosMio();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadPedidosMio();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../assets/images/Camion.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>PEDIDOS QUE TE REALIZARON</Text>
        <View style={styles.cardContainer}>
          <PedidosMioCard pedidos={pedidos} />
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

export default PedidoMioListScreen;
