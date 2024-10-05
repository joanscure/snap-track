import { Tabs } from "expo-router";
import React, {useEffect, useRef, useState} from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  IconSpeakerphone,
  IconTruck,
  IconTruckDelivery,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import {Platform} from "react-native";
import axiosService from "@/core/services/axios";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}


async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      axiosService.post('/customer-logistics/update-token', {
        token: pushTokenString
      }).then(()=>{});
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
const [expoPushToken, setExpoPushToken] = useState("");
  
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log({ response });
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <>
              {focused ? (
                <IconUserFilled
                  color={color}
                  size={28}
                  style={[{ marginBottom: -3 }]}
                />
              ) : (
                <IconUser
                  color={color}
                  size={28}
                  style={[{ marginBottom: -3 }]}
                />
              )}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Pre-alertas",
          tabBarIcon: ({ color }) => (
            <IconSpeakerphone
              color={color}
              size={28}
              style={[{ marginBottom: -3 }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-orders"
        options={{
          title: "Mis Pedidos",
          tabBarIcon: ({ color, focused }) => (
            <>
              {focused ? (
                <IconTruckDelivery
                  color={color}
                  size={28}
                  style={[{ marginBottom: -3 }]}
                />
              ) : (
                <IconTruck
                  color={color}
                  size={28}
                  style={[{ marginBottom: -3 }]}
                />
              )}
            </>
          ),
        }}
      />
    </Tabs>
  );
}
