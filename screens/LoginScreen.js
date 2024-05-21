import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { EyeIcon, EyeSlashIcon, UserPlusIcon, UserIcon, AtSymbolIcon } from 'react-native-heroicons/solid'
import { loginUsuario } from '../api'
import { useUser } from '../context/UserContext'

const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { updateUser } = useUser();
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState({
        cor_usu: '',
        con_usu: ''
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setUsuario({
                cor_usu: '',
                con_usu: ''
            });
        });

        return unsubscribe;
    }, [navigation]);

    const handleLogin = async () => {
        try {
            const resultado = await loginUsuario(usuario);
            console.log('Inicio de sesión exitoso:');

            if (resultado.usuario && resultado.usuario.id_usu) {
                const userId = resultado.usuario.id_usu;
                console.log('Usuario ID obtenido:', userId);
    
                updateUser(userId);
                console.log('Usuario actualizado en el contexto:', userId);
    
                navigateToHome(userId);
    
                setUsuario({
                    cor_usu: '',
                    con_usu: '',
                });
            } else {
                Alert.alert('Error La respuesta del servidor no incluye la información del usuario.');
            }
        } catch (error) {
            Alert.alert('Error: ', error.message);
        }
    };

    const navigateToHome = (userId) => {
        navigation.navigate('Home', {userId});
    };


    const navigateToRegistro = () => {
        navigation.navigate('Registro');
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Image
                className="rounded-full"
                source={require('../assets/images/logo.png')}
                style={{ width: 100, height: 100, marginBottom: -30, alignSelf: 'center', zIndex: 1 }}
                resizeMode="contain"
            />

            <View className="w-4/5 p-8 rounded-2xl border-8 border-black" style={{ backgroundColor: themeColors.bgDark }}>
                <Text className="text-2xl font-bold mb-4 text-white">Iniciar Sesión</Text>

                {/* Correo */}
                <Text style={{ color: 'white', marginBottom: 5, fontWeight: "bold" }}>CORREO</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={{ flex: 1, height: 40, marginBottom: 10, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: '#ccc', borderLeftWidth: 1, borderLeftColor: '#ccc', borderBottomWidth: 1, borderBottomColor: '#ccc', borderRadius: 5, color: 'white' }}
                        placeholder='Correo'
                        placeholderTextColor='white'
                        maxLength={30}
                        value={usuario.cor_usu}
                        onChangeText={(text) => setUsuario(prevUsuario => ({ ...prevUsuario, cor_usu: text }))}
                    />
                    <Text style={{ height: 40, marginBottom: 10, padding: 10, borderTopWidth: 1, borderTopColor: '#ccc', borderRightWidth: 1, borderRightColor: '#ccc', borderBottomWidth: 1, borderBottomColor: '#ccc', borderRadius: 5 }}>
                        <AtSymbolIcon size={20} color="white" />
                    </Text>
                </View>

                {/* Contraseña */}
                <Text style={{ color: 'white', marginBottom: 5, fontWeight: "bold" }}>CONTRASEÑA</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={{ flex: 1, height: 40, marginBottom: 10, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: '#ccc', borderLeftWidth: 1, borderLeftColor: '#ccc', borderBottomWidth: 1, borderBottomColor: '#ccc', borderRadius: 5, color: 'white' }}
                        placeholder='Contraseña'
                        placeholderTextColor='white'
                        maxLength={30}
                        value={usuario.con_usu}
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setUsuario(prevUsuario => ({ ...prevUsuario, con_usu: text }))}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ height: 40, marginBottom: 10, padding: 10, borderTopWidth: 1, borderTopColor: '#ccc', borderRightWidth: 1, borderRightColor: '#ccc', borderBottomWidth: 1, borderBottomColor: '#ccc', borderRadius: 5 }}>
                        {showPassword ? (
                            <EyeIcon size={20} color="white" />
                        ) : (
                            <EyeSlashIcon size={20} color="white" />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            backgroundColor: themeColors.bgLight,
                            padding: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                            marginTop: 16,
                            flexDirection: 'row',
                        }}
                        onPress={handleLogin}>
                        <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10 }}>Iniciar Sesión</Text>
                        <UserIcon size={20} color={'white'} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'white', marginTop: 10 }}>No tienes cuenta? </Text>
                    <TouchableOpacity onPress={navigateToRegistro} style={{ backgroundColor: 'transparent', padding: 0, margin: 0 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: themeColors.bgLight, fontWeight: 'bold', marginTop: 10 }}>Regístrate</Text>
                            <UserPlusIcon size={20} style={{ color: themeColors.bgLight, fontWeight: 'bold', marginTop: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;
