import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { RFValue } from "react-native-responsive-fontsize";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "normal"
    | "medium";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "medium" ? styles.medium : undefined,
        type === "normal" ? styles.medium : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: RFValue(12),
    lineHeight: 24,
    fontFamily: "Poppins_400Regular",
  },
  medium: {
    fontSize: RFValue(14),
    lineHeight: 24,
    fontFamily: "Poppins_500Medium",
  },
  defaultSemiBold: {
    fontSize: RFValue(14),
    lineHeight: 24,
    fontFamily: "Poppins_600SemiBold",
  },
  title: {
    fontSize: RFValue(18),
    fontFamily: "Poppins_700Bold",
    lineHeight: 32,
  },
  normal: {
    fontSize: RFValue(16),
    fontFamily: "Poppins_700Bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: RFValue(12),
    fontFamily: "Poppins_500Medium",
  },
  link: {
    lineHeight: 30,
    fontSize: RFValue(12),
    fontFamily: "Poppins_400Regular",
    color: "#0a7ea4",
  },
});
