import { StyleSheet, TouchableHighlight, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconPlus, IconRefresh } from "@tabler/icons-react-native";
import { Colors } from "@/constants/Colors";
import { useInfoUser } from "@/hooks/useInfoUser";
import AlertsList from "@/components/AlertList";
import { PreAlertRegisterModal } from "@/components/modals/PreAlertRegister";
import { useState } from "react";
import { useLoading } from "@/core/contexts/loading-context/loading-context";

export default function TabTwoScreen() {
  const { info, refetch } = useInfoUser();
  const [isVisible, setVisible] = useState(false);
  const { toast } = useLoading();
  return (
    <>
      <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
        <ThemedView style={styles.titleContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <ThemedText type="title">Pre Alertas</ThemedText>
            <IconRefresh
              color={Colors.default.icons}
              onPress={() => refetch()}
            />
          </View>
          <TouchableHighlight
            style={{
              backgroundColor: Colors.dark.primary,
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              borderRadius: 10,
            }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <IconPlus color={"#fff"} />
              <ThemedText style={{ color: "#fff" }}>Agregar</ThemedText>
            </View>
          </TouchableHighlight>
        </ThemedView>
        {info?.alerts?.length == 0 && (
          <ThemedText>No Tiene Pre-alertas registradas</ThemedText>
        )}
        {info?.alerts && <AlertsList data={info} />}
      </SafeAreaView>
      <PreAlertRegisterModal
        isVisible={isVisible}
        close={() => setVisible(false)}
        onSubmit={() => {
          setVisible(false);
          toast({ text: "Registro Exitoso." });
          refetch();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },
});
