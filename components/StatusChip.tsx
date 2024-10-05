import { StyleSheet, Text, View } from "react-native";

const getStatusColor = (status: string) => {
  switch (status) {
    case "SALIO A RUTA":
      return "#4caf50"; // Verde
    case "RECIBIDA":
      return "#ff9800"; // Naranja
    case "PROCESADO":
      return "#9e9e9e";
    case "DISPONIBLE EN OFICINA":
      return "#4caf50"; // Verde
    case "EN TRANSITO A DESTINO":
      return "#2196f3";
    case "closed":
      return "#f44336"; // Rojo
    default:
      return "#9e9e9e"; // Gris para estados desconocidos
  }
};

export const StatusChip = ({ status }: { status: string }) => {
  return (
    <View style={[styles.chip, { backgroundColor: getStatusColor(status) }]}>
      <Text style={styles.chipText}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginVertical: 4,
  },
  chipText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
