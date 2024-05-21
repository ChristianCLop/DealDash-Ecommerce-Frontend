import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { categories } from '../constants';
import { ClockIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { HomeIcon as Home, ArrowLeftOnRectangleIcon as IconCerrar } from 'react-native-heroicons/solid'
import ProductosCard from '../components/ProductosCard';
import { getProductosNoUsuario, getUsuario } from '../api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { logoutUsuario } from '../api';


const { width, height } = Dimensions.get('window');
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("");
  const [productos, setProductos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const { userId } = useUser();
  const [selectedImage, setSelectedImage] = useState(null);
  const user = userId;

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToPerfil = () => {
    navigation.navigate('Perfil');
  }

  const loadProductos = async () => {
    const data = await getProductosNoUsuario(user, searchValue, activeCategory.toString());
    setProductos(data);
  };

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const usuarios = await getUsuario(userId);

        if (usuarios.length === 0) {
          console.error('No se encontraron datos del usuario');
          return;
        }

        const usuarioActual = usuarios[0];

        if (usuarioActual.ima_usu) {
          setSelectedImage({ uri: usuarioActual.ima_usu });
        }

        console.log('Cargo esto', usuarioActual);
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error.message);
      }
    };

    cargarDatosUsuario();
  }, [userId]);

  useEffect(() => {
    loadProductos();
  }, [activeCategory, searchValue]);

  useFocusEffect(
    React.useCallback(() => {
      loadProductos();
    }, [activeCategory, searchValue])
  );

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    try {
      await logoutUsuario();
      navigateToLogin();
      setMenuVisible(false);
    } catch (error) {
      console.log('Error al cerrar sesión', error.message);
    }
  };

  const handlePerfil = () => {
    navigateToPerfil();
    setMenuVisible(false);
  };

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />

      <Image
        source={require('../assets/images/home.jpg')}
        style={{ height: height * 0.2 }}
        className="w-full absolute -top-5 opacity-40 rounded-b-2xl" />
      <SafeAreaView>
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={selectedImage ? { uri: selectedImage.uri } : require('../assets/images/avatar.png')} className="h-9 w-9 rounded-full" />
          </TouchableOpacity>
          <View className="flex-row items-center space-x-2">
            <Home size="25" color={themeColors.bgLight} />
            <Text className="font-semibold text-base">
              DEAL DASH
            </Text>
          </View>
          <ClockIcon size="27" color="black" />
        </View>

        {/* Menú desplegable */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isMenuVisible}
          onRequestClose={() => {
            setMenuVisible(!isMenuVisible);
          }}
        >
          <TouchableOpacity
            onPress={() => setMenuVisible(!isMenuVisible)}
            style={{ flex: 1 }}
          >
            <View style={{ position: 'absolute', top: 40, left: 15, width: 200 }}>
              <View style={{ backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'white' }}>
                <TouchableOpacity onPress={handlePerfil} style={{ borderTopWidth: 1, borderTopColor: 'lightgray', paddingVertical: 10 }}>
                  <Text style={{ color: 'black', textAlign: 'center' }}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={{ borderTopWidth: 1, borderTopColor: 'lightgray', paddingVertical: 10 }}>
                  <Text style={{ color: 'red', textAlign: 'center' }}>
                    Salir
                    <IconCerrar size={20} color="red" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* search bar */}
        <View className="mx-5 shadow" style={{ marginTop: height * 0.06 }}>
          <View className="flex-row items-center rounded-full p-1 bg-[#64908a]">
            <TextInput placeholder='Search' value={searchValue} onChangeText={(text) => setSearchValue(text)} className="p-4 flex-1 font-semibold text-gray-700" />
            <TouchableOpacity
              onPress={() => {
                loadProductos();
              }}
              className="rounded-full p-2"
              style={{ backgroundColor: themeColors.bgLight }}
            >
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* categories */}
        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isActive = item.title === activeCategory;
              const activeTextClass = isActive ? { color: 'white' } : { color: 'gray' };

              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(item.title)}
                  style={{
                    backgroundColor: isActive ? themeColors.bgLight : 'rgba(0, 0, 0, 0.07)',
                    padding: 10,
                    borderRadius: 20,
                    marginRight: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Text style={{ fontWeight: 'bold', ...activeTextClass }}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>

      {/* productos cards */}
      <View className={`overflow-visible flex justify-center flex-1`}>
        <ProductosCard productos={productos} loadProductos={loadProductos} />
      </View>

    </View>
  )
}