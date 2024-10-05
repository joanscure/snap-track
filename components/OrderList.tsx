import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Order } from "@/interfaces/orders";
import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { StyleSheet } from "react-native";

const OrderList = ({
  data,
  onSelect,
}: {
  data: Order[];
  onSelect: (value: any[],item:any) => void;
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => {
            onSelect(item.logisticsItem.statuses,item);
          }}
        >
          <ThemedText type="title">
            Nro Tracking: {item.trackingNumber}
          </ThemedText>
          <ThemedText>SH: {item.logisticsItem.code}</ThemedText>
          <ThemedView style={styles.info}>
            <View>
              {item.logisticsItem != null && (
                <View
                  style={{
                    backgroundColor: "#3ade58",
                    padding: 4,
                    borderRadius: 8,
                  }}
                >
                  <ThemedText style={{ color: "#fff" }}>
                  {item.logisticsItem.statusNotes}
                  </ThemedText>
                </View>
              )}
            </View>

            <ThemedText style={styles.dateText}>
              Fecha: {new Date(item.logisticsItem.updatedAt).toLocaleDateString()}
            </ThemedText>
          </ThemedView>
        </Pressable>
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

export default OrderList;
