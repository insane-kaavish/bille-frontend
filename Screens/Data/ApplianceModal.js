// AddApplianceModal.js
import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddApplianceModal = ({
  visible,
  onClose,
  appliances,
  selectedAppliance,
  setSelectedAppliance,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  usage,
  setUsage,
  addAppliance
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Add Appliance</Text>
          <Picker
            selectedValue={selectedAppliance}
            onValueChange={(itemValue, itemIndex) => setSelectedAppliance(itemValue)}
          >
            <Picker.Item label="Select Appliance" value="" />
            {appliances.map((appliance, index) => (
              <Picker.Item key={index} label={appliance.category} value={appliance.category} />
            ))}
          </Picker>
          {selectedAppliance && (
            <View>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
              >
                <Picker.Item label="Select Category" value="" />
                {appliances
                  .find(item => item.category === selectedAppliance)
                  .subcategories.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                  ))}
              </Picker>
              <TextInput
                style={styles.input}
                placeholder="Enter Usage"
                onChangeText={text => setUsage(text)}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={addAppliance}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Styles for the modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%', // Adjust the width as per your requirement
    maxHeight: '80%', // Adjust the height as per your requirement
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddApplianceModal;
