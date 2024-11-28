import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';

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

export default function Mujeres() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar la recarga

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      setLoading(true); // Muestra el indicador de carga
      const response = await fetch("https://alev-backend-vercel.vercel.app/mujeres");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoading(false); // Oculta el indicador de carga
    }
  };

  const onRefresh = async () => {
    setRefreshing(true); // Activa el indicador de recarga
    await obtenerProductos(); // Llama a la función para obtener los productos
    setRefreshing(false); // Desactiva el indicador de recarga
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Image source={logo} style={styles.logo} />

      <Text style={styles.description}>MUJERES</Text>

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
    backgroundColor: '#f8f8f8',
  },
  logo: {
    position: 'absolute',
    top: 50,
    width: 380,
    height: 100,
  },
  description: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 150,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  card: {
    width: '48%',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
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
    backgroundColor: 'blue',
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
