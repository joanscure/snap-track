import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useInfoUser } from "@/hooks/useInfoUser";
import { IconRefresh } from "@tabler/icons-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Order } from "@/interfaces/orders";
import OrderList from "@/components/OrderList";
import StatusList from "@/components/modals/StatusItem";

export default function TabTwoScreen() {
  const { info, refetch } = useInfoUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [itemSelected, setItemSelected] = useState<any>(null);
  const [selected, setSelected] = useState<
    {
      id: string;
      status: string;
      observations: string;
      createdAt: string;
    }[]
  >([]);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (info?.alerts) {
      setOrders(info.alerts.filter((x: any) => x.logisticsItemId));
    }
  }, [info]);
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
            <ThemedText type="title">Mis Pedidos</ThemedText>
          </View>
          <IconRefresh color={Colors.default.icons} onPress={() => refetch()} />
        </ThemedView>
        {orders.length == 0 && (
          <ThemedText>Aún no se han tomado sus pedidos.</ThemedText>
        )}
        {orders && (
          <OrderList
            data={orders}
            onSelect={(value, item) => {
              setSelected(value);
              setItemSelected(item);
              setVisible(true);
            }}
          />
        )}
      </SafeAreaView>
      {selected?.length > 0 && (
        <StatusList
          data={selected}
          item={itemSelected}
          close={() => setVisible(false)}
          isVisible={isVisible}
        />
      )}
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
