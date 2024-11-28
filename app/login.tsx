import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons'; // Importa los iconos correctamente
import useAuth from '../src/context/UseAuth';
// Asegúrate de instalar @expo/vector-icons
const logo = require('../assets/images/logo.png'); 

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth(); // Usar la función login del contexto

  const handlePrivacyPolicyPress = () => {
    router.push({ pathname: '/Registro' });
  };

  const handlePasswordResetPress = () => {
    router.push({ pathname: '/PasswordReset' });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida un correo en formato estándar
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    console.log(email);
    console.log(password);
    try {
      const response = await fetch('https://alev-backend-vercel.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginUsuario: email,
          loginContrasena: password,
        }),
      });
  
      const data = await response.json();
      console.log(data);
      if (data.message) {
        Alert.alert('Error', data.message || 'Credenciales inválidas.');
      } else {
        Alert.alert('Éxito', 'Inicio de sesión exitoso.');
        login(data);
        router.replace('/(tabs)'); // Redirigir al área autenticada
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };


  return (
    <View style={styles.container}>
      {/* Logo fuera del card */}
      <Image source={logo} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.header}>Inicia Sesión</Text>
        <Text style={styles.subheader}>Hola de nuevo</Text>

        <Text style={styles.label}>Usuario:</Text>
        <View style={styles.inputWrapper}>
          <Entypo name="user" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Ingrese su correo electrónico"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <Text style={styles.label}>Contraseña:</Text>
        <View style={styles.inputWrapper}>
          <Entypo name="lock" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Ingrese su contraseña"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Iniciar Sesión →</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handlePrivacyPolicyPress}>
            <Text style={styles.footerLink}>¿No tienes una cuenta? <Text style={styles.link}>Regístrate</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePasswordResetPress}>
            <Text style={styles.footerLink}>¿Olvidaste tu contraseña? <Text style={styles.link}>Actualízala</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    position: 'absolute',
    top: 50,
    width: 380,
    height: 100,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#F3CCAA',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: 'rgb(0, 0, 255)', // Cambié el color a azul
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    color: '#007BFF',
  },
});

export default LoginForm;
