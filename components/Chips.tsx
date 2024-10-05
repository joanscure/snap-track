import { Colors } from "@/constants/Colors";
import { IconPlus, IconX } from "@tabler/icons-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const ChipsComponent = ({
  onChange,
}: {
  onChange: (value: string[]) => void;
}) => {
  const [chips, setChips] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");

  // Agregar un nuevo chip
  const addChip = () => {
    if (inputText.trim() !== "") {
      setChips([...chips, inputText.trim()]);
      setInputText(""); // Limpiar el campo después de agregar
    }
  };
  useEffect(() => {
    onChange(chips);
  }, [chips]);

  // Eliminar un chip
  const removeChip = (index: number) => {
    const newChips = chips.filter((_, chipIndex) => chipIndex !== index);
    setChips(newChips);
  };

  return (
    <View style={styles.container}>
      {/* Input para agregar chips */}
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Agregar números de tracking"
          style={styles.input}
        />
        <TouchableHighlight
          style={{
            backgroundColor: Colors.dark.primary,
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            borderRadius: 10,
          }}
          onPress={addChip}
        >
          <View style={{ flexDirection: "row", gap: 5 }}>
            <IconPlus color={"#fff"} />
          </View>
        </TouchableHighlight>
      </View>

      {/* Mostrar los chips */}
      <FlatList
        data={chips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
            <TouchableHighlight
              style={{
                backgroundColor: "#FF4136",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                borderRadius: 10,
              }}
              onPress={() => removeChip(index)}
            >
              <View style={{ flexDirection: "row", gap: 5 }}>
                <IconX color={"#fff"} size={16} />
              </View>
            </TouchableHighlight>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 50,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  chipList: {
    marginTop: 16,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: "#FF4136",
    padding: 4,
    borderRadius: 50,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChipsComponent;
