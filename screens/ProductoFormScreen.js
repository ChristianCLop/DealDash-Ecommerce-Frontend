import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, ScrollView, Image, Alert } from 'react-native';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { ClipboardIcon, BookOpenIcon, ChatBubbleBottomCenterTextIcon, ClipboardDocumentListIcon, CurrencyDollarIcon, CreditCardIcon, FolderPlusIcon, CameraIcon, PhotoIcon } from 'react-native-heroicons/solid';
import * as ImagePicker from 'expo-image-picker';
import { saveProductos } from '../api';
import { useUser } from '../context/UserContext';

const ProductoFormScreen = () => {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [categoria, setCategoria] = useState('');
    const [stock, setStock] = useState('');
    const [costo, setCosto] = useState('');
    const [descuento, setDescuento] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const options = [
        'Alimentación y bebidas',
        'Electrónicos',
        'Consolas',
        'Ropa y accesorios',
        'Salud y belleza'
    ];

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const selectCategoria = (selectedCategoria) => {
        setCategoria(selectedCategoria);
        toggleModal();
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos insuficientes', 'Necesitas conceder permisos de acceso a la galería para seleccionar imágenes.');
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos necesarios', 'Necesitas conceder permisos para acceder a la cámara.');
            }
        })();
    }, []);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (result.canceled) {
            Alert.alert('Error', 'No se seleccionó ninguna imagen.');
        } else {
            setSelectedImage(result.assets[0]);
        }
    };

    const handleImageTake = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (result.canceled) {
            Alert.alert('Error', 'No se seleccionó ninguna imagen.');
        } else {
            setSelectedImage(result.assets[0]);
        }
    };

    const [producto, setProducto] = useState({
        id_usu: '',
        cat_pro: '',
        nom_pro: '',
        des_pro: '',
        ima_pro: '',
        sto_pro: '',
        cos_pro: '',
        desc_pro: ''
    });

    const { userId } = useUser();
    const user = userId;

    const handleGuardar = (name, value) => setProducto({ ...producto, [name]: value });

    const handleSubmit = async () => {
        // Validaciones
        if (producto.nom_pro.length < 4 || producto.nom_pro.length > 20) {
            Alert.alert('Error', 'El nombre debe tener entre 4 y 20 caracteres.');
            return;
        }

        if (producto.des_pro.length < 4 || producto.des_pro.length > 35) {
            Alert.alert('Error', 'La descripcion debe tener entre 4 y 35 caracteres.');
            return;
        }

        if (stock.length < 1) {
            Alert.alert('Error', 'Tiene que tener almenos un producto en stock.');
            return;
        }

        if (costo.length < 1) {
            Alert.alert('Error', 'Ingrese un valor correcto.');
            return;
        }

        if (descuento.length < 1) {
            Alert.alert('Error', 'Ingrese un valor correcto, 0 o mayor.');
            return;
        }

        // Modifica el objeto usuario para incluir la URL de la imagen
        const productoImagen = {
            ...producto,
            id_usu: user,
            cat_pro: categoria,
            ima_pro: selectedImage ? selectedImage.uri : '', // Agrega la URL de la imagen
        };

        try {
            await saveProductos(productoImagen);
            console.log(productoImagen.id_usu);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }

    };

    return (
        <View className="flex-1" style={{ backgroundColor: 'white', padding: 16, paddingTop: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                    <ArrowLeftCircleIcon size={30} color={themeColors.text} />
                </TouchableOpacity>
                <Text style={{ color: themeColors.text, fontSize: 20, fontWeight: 'bold' }}>Nuevo Producto</Text>
            </View>
            <ScrollView>
                <View style={{ backgroundColor: themeColors.bgDark, padding: 16, borderRadius: 8, shadowColor: themeColors.bgDark, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5 }}>

                    {/* Categoría del producto */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold' }}>Categoria del producto</Text>

                    <TouchableOpacity onPress={toggleModal} style={{ height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, color: 'white' }}
                                onChangeText={(text) => handleGuardar('cat_pro', text)}>{categoria || 'Seleccione una categoría'}</Text>
                            <BookOpenIcon size={20} color={'white'} />
                        </View>
                    </TouchableOpacity>

                    {/* Modal para la lista de opciones */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={toggleModal}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={{ backgroundColor: themeColors.bgDark, padding: 16, borderRadius: 8, width: '80%' }}>
                                <FlatList
                                    data={options}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => selectCategoria(item)} style={{ paddingVertical: 10 }}>
                                            <Text style={{ color: 'white' }}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </Modal>

                    {/* Nombre del producto */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold' }}>Nombre del producto</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Nombre del producto'
                            placeholderTextColor='white'
                            maxLength={20}
                            onChangeText={(text) => handleGuardar('nom_pro', text)}
                        />
                        <ClipboardIcon size={20} color={'white'} />
                    </View>

                    {/* Descripcion del producto */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold' }}>Descripción del producto</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Descripción del producto'
                            placeholderTextColor='white'
                            maxLength={35}
                            onChangeText={(text) => handleGuardar('des_pro', text)}
                        />
                        <ChatBubbleBottomCenterTextIcon size={20} color={'white'} />
                    </View>

                    {/* Imagen del producto */}
                    <View style={{ alignItems: 'center' }}>
                        {/* Tomar foto */}
                        <TouchableOpacity onPress={handleImageTake}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: themeColors.bgLight, fontWeight: 'bold' }}>TOMAR FOTO DEL PRODUCTO </Text>
                                <CameraIcon size={20} style={{ color: themeColors.bgLight }} />
                            </View>
                        </TouchableOpacity>

                        <Text style={{ color: themeColors.bgLight, fontWeight: 'bold', }}>O</Text>

                        {/* Sección de la imagen */}
                        <TouchableOpacity onPress={handleImagePicker}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -10, marginLeft: 8 }}>
                                <Text style={{ color: themeColors.bgLight, fontWeight: 'bold' }}>SELECCIONAR IMAGEN DEL PRODUCTO </Text>
                                <PhotoIcon size={20} style={{ color: themeColors.bgLight }} />
                                <Text>
                                    {'\n'} {/* Salto de línea */}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Mostrar la imagen seleccionada (si hay una) */}
                        {selectedImage && (
                            <Image source={{ uri: selectedImage.uri }} style={{ width: 100, height: 100, marginTop: 10 }} />
                        )}
                    </View>

                    {/* Stock del producto */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold' }}>Stock del producto</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Ingrese el stock'
                            keyboardType='numeric'
                            value={stock}
                            onChangeText={(text) => {
                                setStock(text.replace(/[^0-9]/g, ''));
                                handleGuardar('sto_pro', text)
                            }}
                            placeholderTextColor='white'
                        />
                        <ClipboardDocumentListIcon size={20} color={'white'} />
                    </View>

                    {/* Costo del producto */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold' }}>Costo del producto</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Ingrese el costo'
                            keyboardType='numeric'
                            value={costo}
                            onChangeText={(text) => {
                                setCosto(text.replace(/[^0-9.]/g, ''));
                                handleGuardar('cos_pro', text)
                            }}
                            placeholderTextColor='white'
                        />
                        <CurrencyDollarIcon size={20} color={'white'} />
                    </View>

                    {/* Descuento del producto */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold' }}>Descuento del producto</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Ingrese el descuento'
                            keyboardType='numeric'
                            value={descuento}
                            onChangeText={(text) => {
                                setDescuento(text.replace(/[^0-9%]/g, ''));
                                handleGuardar('desc_pro', text)
                            }}
                            placeholderTextColor='white'
                        />
                        <CreditCardIcon size={20} color={'white'} />
                    </View>

                    {/* Botón de guardar */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleSubmit} style={{
                            flex: 1,
                            justifyContent: 'center',
                            backgroundColor: themeColors.bgLight,
                            padding: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                            marginTop: 16,
                            flexDirection: 'row',
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10 }}>Guardar</Text>
                            <FolderPlusIcon size={20} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductoFormScreen;
