import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useContext, useState } from "react";
import { router } from "expo-router";
import { useLoading } from "@/core/contexts/loading-context/loading-context";
import { IconEye, IconEyeOff } from "@tabler/icons-react-native";
import FormField from "@/components/shared/FormField";
import { RFValue } from "react-native-responsive-fontsize";
import { validateFormLogin } from "@/services/validate.auth";
import { loginCustomer } from "@/services/auth.services";
import { AuthContext } from "@/core/contexts/AuthContext";
import { saveStorageUserContext } from "@/services/storeUser";

export const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showLoading, toast, hideLoading } = useLoading();

  const handleInputChange = (
    field: keyof { email: string; password: string },
    value: string
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setErrors({});
    const validationErrors = validateFormLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    showLoading("Iniciando sesión");
    try {
      const data = await loginCustomer(formData.email, formData.password);
      const user = data.info.user;
      saveStorageUserContext({
        id: user.id,
        username: user.username,
        tax: user.tax,
        name: user.name,
        currencyId: user.currencyId,
        currencyLocal: user.currencyLocal,
        currencyCode: user.currencyCode,
        currencySymbol: user.currencySymbol,
        isCompanyAdmin: user.isCompanyAdmin,
        email: user.email,
        companyId: user.companyId,
        image: user.image,
        roleId: user.roleId,
        isAdmin: user.isAdmin,
        branchId: user.branchId,
        isSearchReniec: user.isSearchReniec,
        branches: user.branches,
        dashboard: user.dashboard,
      });
      login(user.access_token);
      router.replace("/(tabs)/");
    } catch (error) {
      toast({ text: "La contraseña o usuario es incorrecto" });
      console.log(error);
    } finally {
      hideLoading();
    }
  };
  return (
    <ThemedView style={styles.content}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.signUpLabel}>
          <ThemedText type={"title"} style={styles.title}>
            Iniciar Sesión
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Introduce tu email y contraseña para iniciar sesión
          </ThemedText>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.contentForm}>
            <FormField
              label="Email:"
              keyboardType="email-address"
              value={formData.email}
              error={errors.email}
              onChangeText={(value) => handleInputChange("email", value)}
            />

            <View style={styles.inputPasswordContent}>
              <ThemedText type="default" style={styles.emailTitle}>
                Contraseña :
              </ThemedText>
              <TextInput
                style={styles.inputEmail}
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                autoCapitalize="none"
              />
              {!showPassword && (
                <Pressable
                  onPress={() => {
                    setShowPassword(true);
                  }}
                  style={styles.iconPasswordHide}
                >
                  <IconEyeOff size={24} color={Colors.default.icons} />
                </Pressable>
              )}

              {showPassword && (
                <Pressable
                  onPress={() => {
                    setShowPassword(false);
                  }}
                  style={styles.iconPasswordHide}
                >
                  <IconEye size={24} color={Colors.default.icons} />
                </Pressable>
              )}

              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.forgotPassword}>
              <ThemedText
                type="link"
                style={{
                  fontFamily: "Poppins_600SemiBold",
                }}
                onPress={() => {
                  router.navigate("/(auth)/forgotpassword");
                }}
              >
                ¿Olvidó su contraseña?
              </ThemedText>
            </View>
            <TouchableHighlight
              style={{
                backgroundColor: Colors.dark.primary,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: scale(14),
                borderRadius: 10,
              }}
              onPress={handleSubmit}
            >
              <ThemedText
                type="defaultSemiBold"
                style={{
                  color: Colors.default.white,
                }}
              >
                Ingresar
              </ThemedText>
            </TouchableHighlight>

            <View style={styles.goRegister}>
              <ThemedText>¿No tienes cuenta?</ThemedText>
              <ThemedText
                type="link"
                style={{
                  fontFamily: "Poppins_600SemiBold",
                }}
                onPress={(_) => {
                  router.navigate("/(auth)/register");
                }}
              >
                Regístrate aquí
              </ThemedText>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    color: Colors.default.title,
    marginBottom: moderateScale(10),
  },
  subtitle: {
    color: Colors.default.text,
    textAlign: "center",
  },
  signUpLabel: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputEmailContent: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
  contentForm: {
    marginTop: scale(30),
    flex: 1,
  },
  forgotPassword: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 12,
  },
  goRegister: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginVertical: 12,
  },
  iconPasswordHide: {
    position: "absolute",
    top: moderateScale(28),
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    right: scale(0),
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
