import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY_STORAGE, USER_KEY_STORAGE } from "@/constants/App";
import { useUserContext } from "@/core/contexts/UserContext";
import { getStorageUserContext } from "@/services/storeUser";
import { registerlogouthandler } from "@/core/services/exeute-logout";

interface AuthContextType {
  userToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}
export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: any) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUser } = useUserContext();

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY_STORAGE);
      const user = await getStorageUserContext();
      if (token) {
        setUserToken(token);
      }
      if (user) {
        setUser(user);
      }
    } catch (e) {
      console.log("Error loading token", e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    setUserToken(token);
    await AsyncStorage.setItem(TOKEN_KEY_STORAGE, token);
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem(TOKEN_KEY_STORAGE);
    await AsyncStorage.removeItem(USER_KEY_STORAGE);
  };

  React.useEffect(() => {
    registerlogouthandler(logout);
  }, [logout]);

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
