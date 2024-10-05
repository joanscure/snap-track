import {LOTTIE} from "@/assets/lottie";
import { ThemedText } from "@/components/ThemedText";
import { useLoading } from "@/core/contexts/loading-context/loading-context";
import LottieView from "lottie-react-native";
import React from "react";
import { View, StyleSheet, Modal } from "react-native";

const LoadingOverlay = () => {
  const { loading, textLoading } = useLoading();

  if (!loading) return null;

  return (
    <Modal transparent={true} animationType="none">
      <View style={styles.overlay}>
        <View style={styles.indicatorContainer}>
          <LottieView
            autoPlay
            loop
            style={{
              width: 100,
              height: 100,
            }}
            source={LOTTIE.loading}
          />
          <ThemedText>{textLoading}</ThemedText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  indicatorContainer: {
    padding: 10,
    backgroundColor: "white",

    //backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default LoadingOverlay;
