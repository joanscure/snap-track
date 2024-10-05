import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import { scale } from "react-native-size-matters";

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText?: (value: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
  editable?: boolean;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  editable,
  error,
}) => {
  return (
    <View style={styles.inputContent}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        style={styles.input}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContent: {
    marginBottom: 12,
  },
  label: {
    fontSize: RFValue(12),
    color: Colors.default.text,
    marginBottom: 4,
    fontFamily: "Poppins_500Medium",
  },
  input: {
    borderColor: Colors.dark.stroke,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    width: "100%",
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderStyle: "solid",
    borderRadius: 10,
  },
  errorText: {
    color: "#FF4136",
    fontSize: 12,
  },
});

export default FormField;
