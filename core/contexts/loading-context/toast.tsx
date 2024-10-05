import { ThemedText } from "@/components/ThemedText";
import { useLoading } from "@/core/contexts/loading-context/loading-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { RFValue } from "react-native-responsive-fontsize";

const ToastOverlay = () => {
  const { setIsToast, isToast, toastConfig } = useLoading();

  useEffect(() => {
    if (isToast) {
      setTimeout(() => {
        setIsToast(false);
      }, toastConfig.timeout ?? 5000);
    }
  }, [isToast, toastConfig]);

  return (
    <Modal
      coverScreen={false}
      hasBackdrop={false}
      isVisible={isToast}
      style={styles.overlay}
    >
      <View style={styles.indicatorContainer}>
        <ThemedText type="medium" lightColor="#f5f5f5">
          {toastConfig.text}
        </ThemedText>
        {toastConfig.action && (
          <View style={styles.undoText}>
            {toastConfig.actionIcon && (
              <MaterialCommunityIcons
                name={toastConfig.actionIcon as any}
                color={"#85caff"}
                style={{
                  fontSize: RFValue(20),
                }}
              />
            )}
            <ThemedText lightColor="#85caff">
              {toastConfig.actionText}
            </ThemedText>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: "flex-end",
    margin: 10,
  },
  indicatorContainer: {
    padding: 16,
    width: "100%",
    backgroundColor: "rgba(34, 34, 34,.9)",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
  },
  undoText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default ToastOverlay;
