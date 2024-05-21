import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { savePedido, updateProducto } from '../api'
import { useUser } from '../context/UserContext';
import { useProduc } from '../context/ProductoContext';
import { Alert } from 'react-native';
import { useCant } from '../context/CantContext';

const PayPalWebView = ({ route }) => {
    console.log(route.params);
    const { url } = route.params || {};  // Agregar comprobación de nulidad
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const { userId } = useUser();
    const user = userId;

    const { prodId } = useProduc();
    const prod = prodId;

    const { cant } = useCant();
    const canti = cant;

    const handleError = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.error('WebView error: ', nativeEvent);
        setError(nativeEvent);
    };

    const handleNavigationStateChange = (newState) => {
        // Verificar si la URL contiene un indicador de cancelación
        if (newState.url.includes('cancel-payment')) {
            // Manejar la cancelación, por ejemplo, navegando de vuelta a la pantalla principal
            navigation.navigate('Home');
        }
        if (newState.url.includes('capture-order')) {
            // Realizar acciones necesarias, por ejemplo, mostrar un mensaje de confirmación
            Alert.alert('¡Compra exitosa!');
            // Navegar de vuelta a la pantalla principal u otra pantalla relevante
            handlePaymentCompletion();
        }
    };

    const handlePaymentCompletion = async () => {
        if (paymentCompleted) {
            return;
        }

        setPaymentCompleted(true);

        const pedido = {
            id_pro: prod,
            id_usu: user
        };

        console.log('Cantidad a actualizar:', canti); // Imprime el valor de canti
        try {
            await savePedido(pedido);
            await updateProducto(prod, canti);
            console.log('Cantidad actualizada correctamente');
        } catch (error) {
            console.log('Ocurrió un error', error);
        };

        navigation.navigate('Home');
    };

    return (
        <WebView
            source={url ? { uri: url } : null}  // Verificar que 'url' no sea nulo antes de usarlo
            onError={handleError}
            onNavigationStateChange={handleNavigationStateChange}
        />
    );
};

export default PayPalWebView;
