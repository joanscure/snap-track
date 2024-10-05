import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React from "react";
import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native";

interface Alert {
  id: string;
  trackingNumber: string;
  instruction: string;
  date: string;
  logisticsItemId?: number | null;
}

const AlertsList = ({ data }: { data: { alerts: Alert[] } }) => {
  return (
    <FlatList
      data={data.alerts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ThemedView style={styles.card}>
          <ThemedText type="title">
            Nro Tracking: {item.trackingNumber}
          </ThemedText>
          <ThemedText>Instructivo: {item.instruction}</ThemedText>
          <ThemedView style={styles.info}>
            <View>
              {item.logisticsItemId == null ? (
                <View
                  style={{
                    backgroundColor: Colors.default.primary,
                    padding: 4,
                    borderRadius: 8,
                  }}
                >
                  <ThemedText style={{ color: "#fff" }}>Pendiente</ThemedText>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "#3ade58",
                    padding: 4,
                    borderRadius: 8,
                  }}
                >
                  <ThemedText style={{ color: "#fff" }}>
                    Pedido tomado
                  </ThemedText>
                </View>
              )}
            </View>

            <ThemedText style={styles.dateText}>
              Fecha: {new Date(item.date).toLocaleString()}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff", // Cambia esto según el tema que uses
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    color: "#888", // Ajusta el color de la fecha si lo necesitas
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AlertsList;
