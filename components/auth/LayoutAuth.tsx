import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useThemeColor } from "@/hooks/useThemeColor";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LayoutAuth({ children }: { children: ReactNode }) {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <SafeAreaView style={[styles.main, { backgroundColor }]}>
      <View style={styles.ellipse1}>
        <Image source={require("@/assets/images/ellipse-1.png")} />
      </View>

      <View style={styles.ellipse2}>
        <Image source={require("@/assets/images/ellipse-2-yellow.png")} />
      </View>

      <KeyboardAwareScrollView>
        <View style={styles.logoContent}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={[styles.logo]}
          />

          <Image
            source={require("@/assets/images/logo-title.png")}
            style={styles.logoTitle}
          />
        </View>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "relative",
  },
  logoContent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: scale(30),
  },
  logo: {
    width: scale(50),
    height: moderateScale(50),
    objectFit: "contain",
  },
  logoTitle: {
    width: scale(120),
    height: moderateScale(50),
    objectFit: "contain",
  },
  ellipse1: {
    position: "absolute",
    top: 0,
    width: scale(350),
    height: moderateScale(500),
    left: 0,
  },

  ellipse2: {
    position: "absolute",
    top: 0,
    right: 0,
    width: scale(250),
    height: moderateScale(673),
  },
});
