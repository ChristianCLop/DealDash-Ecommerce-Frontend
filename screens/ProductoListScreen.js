import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
import { getProductoByUsuario } from '../api';
import ProductoCardUsu from '../components/ProductoCardUsu';
import { useNavigation } from '@react-navigation/native';
import { PlusIcon } from 'react-native-heroicons/outline';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { themeColors } from '../theme';

const ProductoListScreen = () => {
  const [productos, setProductos] = useState([]);
  const navigation = useNavigation();

  const { userId } = useUser();
  const user = userId;

  const loadProductos = async () => {
    const data = await getProductoByUsuario(user);
    setProductos(data);
  };

  useEffect(() => {
    loadProductos();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadProductos();
    }, [])
  );

  const navigateToOtraPagina = () => {
    navigation.navigate('ProductoForm', { reloadProductos: loadProductos });
  };

  return (
    <ImageBackground
      source={require('../assets/images/Productos.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>TUS PRODUCTOS</Text>
        <View style={styles.cardContainer}>
          <ProductoCardUsu productos={productos} loadProductos={loadProductos} />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={navigateToOtraPagina}>
          <PlusIcon size={30} color="white" />
        </TouchableOpacity>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi transparente
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

export default ProductoListScreen;
