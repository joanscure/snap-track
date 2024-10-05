import { USER_KEY_STORAGE } from "@/constants/App";
import { UserContext } from "@/interfaces/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveStorageUserContext = async (user: UserContext) => {
  await AsyncStorage.setItem(USER_KEY_STORAGE, JSON.stringify(user));
};

export const getStorageUserContext = async () => {
  const userString = await AsyncStorage.getItem(USER_KEY_STORAGE);
  if (!userString) return null;
  try {
    const user = JSON.parse(userString) as UserContext;
    return user;
  } catch {}
  return null;
};
