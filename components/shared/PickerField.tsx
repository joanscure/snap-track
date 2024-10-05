import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { RFValue } from "react-native-responsive-fontsize";

interface PickerFieldProps {
  label: string;
  value: string;
  items: { label: string; value: string }[];
  onChange: (value: string) => void;
  error?: string;
}

const PickerField: React.FC<PickerFieldProps> = ({
  label,
  value,
  items,
  onChange,
  error,
}) => {
  return (
    <View style={styles.inputContent}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <RNPickerSelect
        value={value}
        onValueChange={onChange}
        items={items}
        style={{ viewContainer: styles.select }}
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
  select: {
    borderColor: Colors.dark.stroke,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    borderStyle: "solid",
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default PickerField;
