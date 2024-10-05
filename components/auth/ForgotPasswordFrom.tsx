import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { scale, moderateScale } from "react-native-size-matters";
import { router } from "expo-router";
import { useLoading } from "@/core/contexts/loading-context/loading-context";
import { forgotPassswordCustomer } from "@/services/auth.services";

import FormField from "@/components/shared/FormField";
import { RFValue } from "react-native-responsive-fontsize";

export const ForgotPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");

  const { showLoading, hideLoading, toast } = useLoading();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    setErrors({});
    const _newErrors = { email: "" };
    if (!email) {
      _newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      _newErrors.email = "El formato del correo es incorrecto";
    }

    showLoading("Solicitando información");
    try {
      await forgotPassswordCustomer({
        email,
      });
      toast({ text: "Se ha enviado un enlace a tu correo" });
      router.back();
    } catch (error) {
      toast({ text: "No se pudo enviar el enlace" });
      console.log(error);
    } finally {
      hideLoading();
    }
  };
  return (
    <ThemedView style={styles.content}>
      <View style={styles.signUpLabel}>
        <ThemedText type={"title"} style={styles.title}>
          ¿Olvidaste tu contraseña?
        </ThemedText>

        <ThemedText type="default" style={styles.subtitle}>
          Ingresa tu correo electrónico para enviarte un enlace de recuperación.
        </ThemedText>
      </View>
      <View>
        <FormField
          label=""
          keyboardType="email-address"
          value={email}
          error={errors.email}
          onChangeText={(value) => setEmail(value)}
        />

        <TouchableHighlight
          style={{
            backgroundColor: Colors.dark.primary,
            marginTop: 16,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: scale(14),
            borderRadius: 10,
          }}
          onPress={handleSubmit}
        >
          <ThemedText
            type="default"
            style={{
              color: Colors.default.white,
            }}
          >
            Enviar
          </ThemedText>
        </TouchableHighlight>

        <View style={styles.goLogin}>
          <ThemedText
            type="link"
            style={{
              fontFamily: "Poppins_600SemiBold",
            }}
            onPress={(_) => {
              router.back();
            }}
          >
            Regresar al inicio
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  content: {
    margin: scale(24),
    padding: scale(24),
    borderRadius: 10,
    flexDirection: "column",
  },
  title: {
    color: Colors.dark.headline,
    marginBottom: moderateScale(10),
  },
  subtitle: {
    color: Colors.dark.gray,
    textAlign: "center",
  },
  signUpLabel: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputPasswordContent: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative",
  },
  inputEmail: {
    borderColor: Colors.dark.stroke,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    width: "100%",
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderStyle: "solid",
    borderRadius: 10,
  },
  emailTitle: {
    fontSize: RFValue(12),
    color: Colors.default.text,
    marginBottom: 4,
    fontFamily: "Poppins_500Medium",
  },
  forgotPassword: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  goLogin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
  },
  iconPasswordHide: {
    position: "absolute",
    top: moderateScale(30),
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    right: scale(0),
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
