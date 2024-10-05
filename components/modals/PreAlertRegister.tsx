import ChipsComponent from "@/components/Chips";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useLoading } from "@/core/contexts/loading-context/loading-context";
import axiosService from "@/core/services/axios";
import { IconSquareRoundedX, IconX } from "@tabler/icons-react-native";
import React, { useEffect, useRef, useState } from "react";

import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import Modal from "react-native-modal";
import { RFValue } from "react-native-responsive-fontsize";
import { scale } from "react-native-size-matters";

export function PreAlertRegisterModal({
  isVisible,
  close,
  onSubmit,
}: {
  isVisible: boolean;
  close: () => void;
  onSubmit: () => void;
}) {
  const [trackings, setTrackings] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const { hideLoading, showLoading, toast } = useLoading();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = () => {
    setErrors({});
    if (trackings.length == 0) {
      setErrors({
        trackings: "Ingrese los números de tracking.",
      });
      return;
    }
    if (notes == "") {
      setErrors({ notes: "Ingrese las intrucciones de su pedido." });
      return;
    }

    showLoading("Registrando...");
    axiosService
      .post("/customer-logistics/save-alerts", {
        trackingArray: trackings,
        notes,
      })
      .then((either) => {
        either.fold(
          () => {
            toast({ text: "No se pudo registrar su pre-alerta" });
          },
          () => {
            cleanForm();
            onSubmit();
          }
        );
      })
      .finally(() => {
        hideLoading();
      });
  };
  const cleanForm = () => {
    setTrackings([]);
    setNotes("");
  };
  return (
    <Modal
      testID={"modal"}
      isVisible={isVisible}
      avoidKeyboard={true}
      style={styles.modal}
      onBackdropPress={() => {
        Keyboard.dismiss();
        close();
      }}
    >
      <View style={styles.modalContainerTotal}>
        <View style={styles.header}>
          <ThemedText type="medium">Registrar Pre Alerta</ThemedText>
          <Pressable style={styles.iconContainer} onPress={() => close()}>
            <IconX size={30} color={Colors.default.icons} />
          </Pressable>
        </View>
        <View>
          <ThemedText style={styles.label}>Tracking Numbers</ThemedText>
          <ChipsComponent
            onChange={(value: string[]) => {
              setTrackings(value);
            }}
          />
          {errors.trackings && (
            <Text style={styles.errorText}>{errors.trackings}</Text>
          )}
        </View>
        <View>
          <ThemedText style={styles.label}>Notas o Intrucciones</ThemedText>
          <View>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Escribe tu comentario..."
              multiline={true} // Permite varias líneas
              numberOfLines={4} // Define cuántas líneas quieres mostrar (opcional)
              style={styles.textArea}
            />
          </View>
          {errors.notes && <Text style={styles.errorText}>{errors.notes}</Text>}
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
            Registrar
          </ThemedText>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    flex: 1,
    margin: 0,
  },
  label: {
    fontSize: RFValue(12),
    color: Colors.default.text,
    marginBottom: 4,
    fontFamily: "Poppins_500Medium",
  },
  textArea: {
    borderColor: Colors.dark.stroke,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    width: "100%",
    textAlignVertical: "top",
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderStyle: "solid",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainerTotal: {
    height: "93%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    gap: 20,
  },
  iconContainer: {},
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
