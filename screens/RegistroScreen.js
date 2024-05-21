import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import { EyeIcon, EyeSlashIcon, AtSymbolIcon, FingerPrintIcon, UserIcon, PhoneIcon, CameraIcon, PhotoIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { saveUsuario } from '../api';
import * as ImagePicker from 'expo-image-picker';

const RegistroScreen = () => {

    const navigation = useNavigation();
    const [cedula, setCedula] = useState('');
    const [celular, setCelular] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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


    const [usuario, setUsuario] = useState({
        ced_usu: '',
        nom_usu: '',
        ape_usu: '',
        cor_usu: '',
        cel_usu: '',
        ima_usu: '',
        con_usu: '',
        conf_con_usu: ''
    });

    const handleRegistrar = (name, value) => setUsuario({ ...usuario, [name]: value });

    const handleSubmit = () => {
        // Validaciones
        if (cedula.length !== 10) {
            Alert.alert('Error', 'La cédula debe tener exactamente 10 caracteres.');
            return;
        }

        if (usuario.nom_usu.length < 4 || usuario.nom_usu.length > 25) {
            Alert.alert('Error', 'El nombre debe tener entre 4 y 25 caracteres.');
            return;
        }

        if (usuario.ape_usu.length < 4 || usuario.ape_usu.length > 25) {
            Alert.alert('Error', 'El apellido debe tener entre 4 y 25 caracteres.');
            return;
        }

        if (!usuario.cor_usu.includes('@')) {
            Alert.alert('Error', 'El correo debe tener formato válido.');
            return;
        }

        if (celular.length !== 10) {
            Alert.alert('Error', 'El número de celular debe tener exactamente 10 caracteres.');
            return;
        }

        if (usuario.con_usu.length < 4 || usuario.con_usu.length > 25 || usuario.con_usu !== usuario.conf_con_usu) {
            Alert.alert('Error', 'Las contraseñas deben coincidir y tener entre 4 y 25 caracteres.');
            return;
        }

        // Modifica el objeto usuario para incluir la URL de la imagen
        const usuarioConImagen = {
            ...usuario,
            ima_usu: selectedImage ? selectedImage.uri : '', // Agrega la URL de la imagen
        };

        saveUsuario(usuarioConImagen);
        navigation.navigate('Login');
    }

    return (
        <View className="flex-1" style={{ backgroundColor: 'white', padding: 16, paddingTop: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                    <ArrowLeftCircleIcon size={30} color={themeColors.text} />
                </TouchableOpacity>
                <Text style={{ color: themeColors.text, fontSize: 20, fontWeight: 'bold' }}>Registro</Text>
            </View>

            <ScrollView>
                <View style={{ backgroundColor: themeColors.bgDark, padding: 16, borderRadius: 8, shadowColor: themeColors.bgDark, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5 }}>

                    {/* Cedula */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: "bold" }}>CEDULA</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Cedula'
                            keyboardType='numeric'
                            maxLength={10}
                            value={cedula}
                            onChangeText={(text) => {
                                setCedula(text.replace(/[^0-9]/g, ''));
                                handleRegistrar('ced_usu', text);
                            }}
                            placeholderTextColor='white'
                        />
                        <FingerPrintIcon size={20} color={'white'} />
                    </View>

                    {/* Nombre */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: "bold" }}>NOMBRE</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Nombre'
                            placeholderTextColor='white'
                            maxLength={25}
                            onChangeText={(text) => handleRegistrar('nom_usu', text)}
                        />
                        <UserIcon size={20} color={'white'} />
                    </View>

                    {/* Apellido */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: "bold" }}>APELLIDO</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Apellido'
                            placeholderTextColor='white'
                            maxLength={25}
                            onChangeText={(text) => handleRegistrar('ape_usu', text)}
                        />
                        <UserIcon size={20} color={'white'} />
                    </View>

                    {/* Correo */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: "bold" }}>CORREO</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Correo'
                            placeholderTextColor='white'
                            maxLength={25}
                            onChangeText={(text) => handleRegistrar('cor_usu', text)}
                        />
                        <AtSymbolIcon size={20} color="white" />
                    </View>

                    {/* Celular */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: "bold" }}>CELULAR</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Celular'
                            keyboardType='numeric'
                            maxLength={10}
                            value={celular}
                            onChangeText={(text) => {
                                setCelular(text.replace(/[^0-9.]/g, ''));
                                handleRegistrar('cel_usu', text)
                            }}
                            placeholderTextColor='white'
                        />
                        <PhoneIcon size={20} color={'white'} />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        {/* Tomar foto */}
                        <TouchableOpacity onPress={handleImageTake}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: themeColors.bgLight, fontWeight: 'bold' }}>TOMAR FOTO PARA PERFIL </Text>
                                <CameraIcon size={20} style={{ color: themeColors.bgLight }} />
                            </View>
                        </TouchableOpacity>

                        <Text style={{ color: themeColors.bgLight, fontWeight: 'bold', }}>O</Text>

                        {/* Sección de la imagen */}
                        <TouchableOpacity onPress={handleImagePicker}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -10, marginLeft: 8 }}>
                                <Text style={{ color: themeColors.bgLight, fontWeight: 'bold' }}>SELECCIONAR IMAGEN PARA PERFIL </Text>
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

                    {/* Contraseña */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: "bold" }}>CONTRASEÑA</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Contraseña'
                            placeholderTextColor='white'
                            maxLength={25}
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => handleRegistrar('con_usu', text)}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <EyeIcon size={20} color="white" />
                            ) : (
                                <EyeSlashIcon size={20} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Confirmar Contraseña */}
                    <Text style={{ color: 'white', marginBottom: 5, fontWeight: "bold" }}>CONFIRMAR CONTRASEÑA</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10, color: 'white' }}
                            placeholder='Confirmar Contraseña'
                            placeholderTextColor='white'
                            maxLength={25}
                            secureTextEntry={!showConfirmPassword}
                            onChangeText={(text) => handleRegistrar('conf_con_usu', text)}
                        />

                        {/* Botón de guardar */}
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? (
                                <EyeIcon size={20} color="white" />
                            ) : (
                                <EyeSlashIcon size={20} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Botón de guardar */}
                    <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: themeColors.bgLight, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 }} >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default RegistroScreen;
