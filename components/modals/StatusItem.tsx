import { StatusChip } from "@/components/StatusChip";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { IconX } from "@tabler/icons-react-native";
import React from "react";
import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import Modal from "react-native-modal";

const StatusList = ({
  data,
  isVisible,
  item,
  close,
}: {
  data: {
    id: string;
    status: string;
    observations: string;
    createdAt: string;
  }[];
  item: any;
  isVisible: boolean;
  close: () => void;
}) => {
  return (
    <Modal
      testID={"modal"}
      isVisible={isVisible}
      avoidKeyboard={true}
      style={styles.modal}
      onBackdropPress={() => {
        close();
      }}
    >
      <View style={styles.modalContainerTotal}>
        <View style={styles.header}>
          <ThemedText type="normal">Detalle de paquete</ThemedText>
          <Pressable onPress={() => close()}>
            <IconX size={30} color={Colors.default.icons} />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {item.logisticsItem?.dateTraslate && (
            <ThemedText style={styles.infoLabel}>
              Fecha de posible entrega:{" "}
              <ThemedText type="default">
                {new Date(item.logisticsItem.dateTraslate).toLocaleDateString()}
              </ThemedText>
            </ThemedText>
          )}

          <View style={styles.sectionContainer}>
            <ThemedText style={styles.infoLabel}>
              Nro Tracking:{" "}
              <ThemedText type="default">{item.trackingNumber}</ThemedText>
            </ThemedText>
            <ThemedText style={styles.infoLabel}>
              SH: <ThemedText type="link">{item.logisticsItem.code}</ThemedText>
            </ThemedText>
            <ThemedText style={styles.infoLabel}>
              Tipo de envío:{" "}
              <ThemedText type="default">
                {item.logisticsItem.FormSend}
              </ThemedText>
            </ThemedText>
          </View>

          <View style={styles.sectionContainer}>
            <ThemedText style={styles.infoLabel}>
              Precio de venta:{" "}
              <ThemedText type="default">
                L{item.logisticsItem.priceSale}
              </ThemedText>
            </ThemedText>
            <ThemedText style={styles.infoLabel}>
              FOB:{" "}
              <ThemedText type="default">L{item.logisticsItem.fob}</ThemedText>
            </ThemedText>
            <ThemedText style={styles.infoLabel}>
              Reempaquetado:{" "}
              <ThemedText type="default">
                {item.logisticsItem.repackage ? "SI" : "NO"}
              </ThemedText>
            </ThemedText>
          </View>
        </View>
        <ThemedText type="medium">Historial de estados</ThemedText>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <StatusChip status={item.status} />
              </View>
              <ThemedText style={styles.observations}>
                Observación: {item.observations}
              </ThemedText>
              <ThemedText style={styles.date}>
                Fecha: {new Date(item.createdAt).toLocaleString("es-ES")}
              </ThemedText>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    flex: 1,
    margin: 0,
  },
  modalContainerTotal: {
    height: "93%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    gap: 20,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  observations: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  date: {
    fontSize: 12,
    marginTop: 8,
    color: "#888",
    textAlign: "right",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionContainer: {
    marginVertical: 8,
  },
});

export default StatusList;
