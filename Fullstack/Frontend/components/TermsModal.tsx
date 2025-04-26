// This file displays the terms and conditions of the app in a modal
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import userAgreementSections from "../assets/UserAgreement";

const TermsModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            {userAgreementSections.map((section, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                {!!section.title && (
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                )}
                {!!section.subtitle && (
                  <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
                )}
                <Text style={styles.sectionBody}>{section.body}</Text>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#E97451",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});


export default TermsModal;

//#codebase