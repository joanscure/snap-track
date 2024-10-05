import { TOKEN_KEY_STORAGE } from "@/constants/App";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setTokenStorage = (token: string) => {
  return AsyncStorage.setItem(TOKEN_KEY_STORAGE, token);
};

export const getTokenStorage = () => {
  return AsyncStorage.getItem(TOKEN_KEY_STORAGE);
};

export const deleteTokenStorage = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY_STORAGE);
  await AsyncStorage.clear();
};
