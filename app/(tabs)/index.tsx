import {
  Image,
  StyleSheet,
  Platform,
  View,
  TouchableHighlight,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "@/core/contexts/UserContext";
import { useInfoUser } from "@/hooks/useInfoUser";
import { Colors } from "@/constants/Colors";
import {
  IconAddressBook,
  IconMapPins,
  IconPhone,
  IconPhoneCall,
} from "@tabler/icons-react-native";
import { scale } from "react-native-size-matters";
import { useContext } from "react";
import { AuthContext } from "@/core/contexts/AuthContext";

export default function HomeScreen() {
  const { info } = useInfoUser();
  const { logout } = useContext(AuthContext);
  if (!info) {
    return <View />;
  }
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Hola {info.customer.name} {info.customer.lastName}!
        </ThemedText>
      </ThemedView>
      <View style={{ gap: 12 }}>
        <View style={styles.border}>
          <ThemedText style={{ color: Colors.default.headline }}>
            Dirección del cliente
          </ThemedText>
          <View style={styles.description}>
            <IconMapPins color={Colors.default.icons} />

            <ThemedText type="defaultSemiBold">
              {info.customer.address}
            </ThemedText>
          </View>
        </View>

        <View style={styles.border}>
          <ThemedText style={{ color: Colors.default.headline }}>
            Teléfono del cliente
          </ThemedText>
          <View style={styles.description}>
            <IconPhone color={Colors.default.icons} />
            <ThemedText type="defaultSemiBold">
              {info.customer.phone ?? "--"}
            </ThemedText>
          </View>
        </View>
        <View style={styles.border}>
          <ThemedText style={{ color: Colors.default.headline }}>
            Número de casillero
          </ThemedText>
          <View style={styles.description}>
            <IconAddressBook color={Colors.default.icons} />
            <ThemedText type="defaultSemiBold">
              {info.customer.codeCustomer ?? "--"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.border}>
          <ThemedText style={{ color: Colors.default.headline }}>
            Dirección de consolidación
          </ThemedText>
          <View style={styles.description}>
            <IconPhone color={Colors.default.icons} />
            <ThemedText type="defaultSemiBold">
              {info.company?.address ?? "--"} {info.company?.zipCode}{" "}
              {info.company?.province} {info.company?.city}
            </ThemedText>
          </View>
        </View>

        <View style={styles.border}>
          <ThemedText style={{ color: Colors.default.headline }}>
            Contacto
          </ThemedText>
          <View style={styles.description}>
            <IconPhoneCall color={Colors.default.icons} />
            <ThemedText type="defaultSemiBold">
              {info.company?.phoneNumber ?? "--"}
            </ThemedText>
          </View>
        </View>
        <TouchableHighlight
          style={{
            backgroundColor: Colors.default.danger,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: scale(14),
            borderRadius: 10,
          }}
          onPress={() => {
            logout();
          }}
        >
          <ThemedText
            type="defaultSemiBold"
            style={{
              color: Colors.default.white,
            }}
          >
            Cerrar Sesión
          </ThemedText>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  border: {
    padding: 16,
    borderColor: Colors.default.border,
    borderWidth: 1,
    borderRadius: 8,
    gap: 4,
  },
  description: {
    flexDirection: "row",
    gap: 8,
  },
});
