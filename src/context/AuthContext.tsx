import React, { createContext, useContext, useState, useEffect } from "react";
import { View, Text } from 'react-native';
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; 
  login: (userData: any) => void; 
  logout: () => void; 
}

// Valores predeterminados del contexto
const AuthContextDefaultValues: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(AuthContextDefaultValues);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);


  const login = (userData: any) => {
    setIsAuthenticated(true);
    console.log("aaaa " + userData)
    setUser({
      IdUser: userData.IdUser,
      Nombre: userData.Nombre,
      Correo: userData.Correo,
      Telefono: userData.Telefono,
      ImagenUrl: userData.ImagenUrl,
    });

    if (userData.Token) {
      SecureStore.setItemAsync("userToken", JSON.stringify(userData.Token)); // Guardar el token
    }
  };

  const logout = () => {
    SecureStore.deleteItemAsync("userToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
