import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';

// Importa el logo
const logo = require('../../assets/images/logo.png'); 

type Product = {
    ID_Prenda: string;
    Nombre: string;
    CodBarras: string;
    Descripcion: string;
    ID_Marca: string;
    ID_Color: string;
    ID_Categoria: string;
    ID_TallaPantalon: string;
    ID_TallaPlayera: string;
    ID_Estilo: string;
    ID_Tipo: string;
    Precio: string;
    Imagen: string;
};

export default function Hombres() {
    const isLoggedIn = false; // Variable para simular si el usuario está logueado o no
    const [productos, setProductos] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // Estado para controlar la recarga

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            setLoading(true); // Activa el indicador de carga inicial
            const response = await fetch("https://alev-backend-vercel.vercel.app/hombres");
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        } finally {
            setLoading(false); // Desactiva el indicador de carga inicial
        }
    };

    const onRefresh = async () => {
        setRefreshing(true); // Activa el indicador de recarga
        await obtenerProductos(); // Recarga los datos
        setRefreshing(false); // Desactiva el indicador de recarga
    };

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Image
                source={logo} // Usa el logo
                style={styles.logo} // Aplica el estilo que desees
            />

            <Text style={styles.description}>HOMBRES</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <View style={styles.cardsContainer}>
                    {productos.map(product => (
                        <View key={product.ID_Prenda} style={styles.card}>
                            <Image
                                source={{ uri: `https://alevosia.host8b.me/image/${product.Imagen}` }}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.cardTitle}>{product.Nombre}</Text>
                            <Text style={styles.cardDescription}>{product.Descripcion}</Text>
                            <Text style={styles.cardPrice}>${product.Precio}</Text>
                            <TouchableOpacity style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>Comprar</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8', // Fondo claro
    },
    logo: {
        position: 'absolute', // Hace que el logo sea estático
        top: 50,              // Ajusta la posición desde la parte superior
        width: 380,           // Ajusta el ancho del logo
        height: 100,          // Ajusta el alto del logo
    },
    description: {
        fontSize: 25,         // Tamaño de la fuente
        fontWeight: 'bold',   // Peso de la fuente
        color: '#333',        // Color del texto
        marginTop: 150,       // Espacio desde la parte superior hasta el texto
        textAlign: 'center',  // Centra el texto
    },
    cardsContainer: {
        flexDirection: 'row',       
        flexWrap: 'wrap',          
        justifyContent: 'space-around', // Espacia las tarjetas de manera más equilibrada
        marginTop: 20,             
        paddingHorizontal: 5,     
    },
    card: {
        width: '48%',          // Ajusta el ancho de cada tarjeta (48% para que quepan dos con margen)
        borderRadius: 10,      // Bordes redondeados
        marginBottom: 20,      // Espacio inferior entre las tarjetas
        backgroundColor: '#fff', // Fondo blanco para las tarjetas
        shadowColor: '#000',   // Sombra para dar profundidad
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,          // Efecto de elevación para Android
        alignItems: 'center',  // Centra el contenido de la tarjeta
        padding: 10,           // Espaciado interno
    },
    cardImage: {
        width: '100%',         // Ajusta el ancho de la imagen de la tarjeta
        height: 150,           // Altura de la imagen de la tarjeta
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitle: {
        fontSize: 16,          // Tamaño de la fuente en las tarjetas
        fontWeight: 'bold',    // Peso de la fuente
        marginVertical: 5,     // Espacio vertical
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 5,
    },
    loginButton: {
        backgroundColor: 'blue', // Cambié el color de fondo a azul
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
