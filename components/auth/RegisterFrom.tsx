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
import { useTerrorialService } from "@/hooks/useTerritorialService";
import { useLoading } from "@/core/contexts/loading-context/loading-context";
import { createCustomer } from "@/services/auth.services";
import { FormDataRegister } from "@/interfaces/auth-form";
import { IconEye, IconEyeOff } from "@tabler/icons-react-native";
import PickerField from "@/components/shared/PickerField";
import FormField from "@/components/shared/FormField";
import { validateFormRegister } from "@/services/validate.auth";
import { RFValue } from "react-native-responsive-fontsize";
import { FAKEDATA } from "@/constants/App";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormDataRegister>({
    documentNumber: "",
    customerType: "person",
    name: "",
    lastname: "",
    email: "",
    address: "",
    state: null,
    city: null,
    primaryPhone: "",
    additionalPhone: "",
    password: "",
  });
  const { states, cities } = useTerrorialService({ state: formData.state });

  const { showLoading, hideLoading, toast } = useLoading();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof FormDataRegister, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setErrors({});
    const validationErrors = validateFormRegister(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Detener la ejecución si hay errores
    }
    const data = {
      ...formData, // Aquí traemos todos los campos del estado centralizado
      lastName: formData.lastname,
      countryId: 97, // ID por defecto para Honduras
      stateId: formData.state ? parseInt(formData.state) : 0,
      cityId: formData.city ? parseInt(formData.city) : 0,
      documentTypeId:
        formData.customerType === "company"
          ? FAKEDATA
            ? 1
            : 476
          : FAKEDATA
          ? 1
          : 475, // Valor por defecto
      isInterested: false, // Valor por defecto
      isCompany: formData.customerType === "company",
      gender: "MEN",
      birthDate: null, // Valor por defecto
      addressReferences: "", // Valor por defecto
      amountCredit: 0, // Valor por defecto
      haveCredit: false, // Valor por defecto
      daysCredit: 0, // Valor por defecto
      representative: {
        id: 0, // Valor por defecto
        name: "",
        lastName: "",
        documentTypeId: 0, // Valor por defecto
        documentNumber: "",
        phone: "",
        email: "",
        address: "",
      },
      companyReferences: [], // Valor por defecto
    };

    showLoading("Creando usuario");
    try {
      await createCustomer(data);
      toast({ text: "Te has registrado con éxito" });
      router.back();
    } catch (error) {
      toast({ text: "El correo ya está siendo utilizado" });
      console.log(error);
    } finally {
      hideLoading();
    }
  };
  return (
    <ThemedView style={styles.content}>
      <View style={styles.signUpLabel}>
        <ThemedText type={"title"} style={styles.title}>
          Regístrate
        </ThemedText>
      </View>
      <View>
        <PickerField
          value={formData.customerType}
          label="Tipo de cliente :"
          onChange={(value) => handleInputChange("customerType", value)}
          items={[
            { label: "Persona", value: "person" },
            { label: "Empresa", value: "company" },
          ]}
        />
        <FormField
          label="Nro de Identificación:"
          keyboardType="default"
          value={formData.documentNumber}
          onChangeText={(value) => handleInputChange("documentNumber", value)}
          error={errors.documentNumber}
        />

        <FormField
          label="Nombre:"
          keyboardType="default"
          value={formData.name}
          error={errors.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        {formData.customerType == "person" && (
          <FormField
            label="Apellidos:"
            keyboardType="default"
            value={formData.lastname}
            error={errors.lastname}
            onChangeText={(value) => handleInputChange("lastname", value)}
          />
        )}

        <FormField
          label="Email:"
          keyboardType="email-address"
          value={formData.email}
          error={errors.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />

        <FormField
          label="Dirección:"
          keyboardType="email-address"
          value={formData.address}
          error={errors.address}
          onChangeText={(value) => handleInputChange("address", value)}
        />
        <FormField label="País:" value={"Honduras"} editable={false} />

        <PickerField
          label="Provincia:"
          value={formData.state ?? ""}
          onChange={(value: string) => handleInputChange("state", value)}
          items={states}
          error={errors.state}
        />

        <PickerField
          label="Ciudad:"
          value={formData.city ?? ""}
          onChange={(value) => handleInputChange("city", value)}
          items={cities}
          error={errors.city}
        />

        <FormField
          label="Teléfono:"
          keyboardType="phone-pad"
          error={errors.primaryPhone}
          value={formData.primaryPhone}
          onChangeText={(value) => handleInputChange("primaryPhone", value)}
        />

        <FormField
          label="Teléfono casa:"
          keyboardType="phone-pad"
          error={errors.additionalPhone}
          value={formData.additionalPhone}
          onChangeText={(value) => handleInputChange("additionalPhone", value)}
        />

        <View style={styles.inputPasswordContent}>
          <ThemedText type="default" style={styles.emailTitle}>
            Contraseña :
          </ThemedText>
          <TextInput
            style={styles.inputEmail}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
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
            Registrarse
          </ThemedText>
        </TouchableHighlight>

        <View style={styles.goLogin}>
          <ThemedText
            style={{
              lineHeight: 30,
            }}
          >
            ¿Ya tienes cuenta?
          </ThemedText>
          <ThemedText
            type="link"
            style={{
              fontFamily: "Poppins_600SemiBold",
            }}
            onPress={(_) => {
              router.back();
            }}
          >
            Inicia Sesión
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
