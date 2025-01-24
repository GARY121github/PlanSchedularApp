import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DropDownPicker from "react-native-dropdown-picker";
import planSchema, { Plan, priorityEnum, statusEnum } from "../../schemas/plan.schema";
import planService from "../../services/plan.service";
import { AddPlanScreenProps } from "../../screens/Main/AddPlan";

// Separate type for form props
interface PlanFormProps {
  navigation: AddPlanScreenProps["navigation"];
}

const priorities = priorityEnum.options;
const statuses = statusEnum.options;

const PlanForm: React.FC<PlanFormProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Plan, "id">>({
    resolver: zodResolver(planSchema.omit({ id: true })),
    defaultValues: {
      name: "",
      description: "",
      priority: "LOW",
      status: "TODO",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [priorityOpen, setPriorityOpen] = useState<boolean>(false);
  const [statusOpen, setStatusOpen] = useState<boolean>(false);

  const onSubmit = async (data: Omit<Plan, "id">) => {
    setLoading(true);
    try {
      await planService.createPlan(data);
      Alert.alert("Success", "Plan created successfully!");
      navigation.goBack(); // Navigate back after successful submission
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDropdownItems = (items: string[]) =>
    items.map((item) => ({
      label: item.charAt(0) + item.slice(1).toLowerCase(),
      value: item,
    }));

  return (
    <KeyboardAvoidingView
  style={styles.container}
  behavior={Platform.OS === "ios" ? "padding" : undefined}
>
  <ScrollView
    contentContainerStyle={styles.scrollContainer}
    keyboardShouldPersistTaps="handled"
  >
    {/* Name Field */}
    <Text style={styles.label}>Name</Text>
    <Controller
      control={control}
      name="name"
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="Enter Name"
          placeholderTextColor="#aaa"
        />
      )}
    />
    {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

    {/* Description Field */}
    <Text style={styles.label}>Description</Text>
    <Controller
      control={control}
      name="description"
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[styles.input, styles.textArea]}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="Enter Description"
          placeholderTextColor="#aaa"
          multiline
        />
      )}
    />
    {errors.description && (
      <Text style={styles.error}>{errors.description.message}</Text>
    )}

    {/* Priority Dropdown */}
    <Text style={styles.label}>Priority</Text>
    <View style={[styles.dropdownWrapper, { zIndex: 2000 }]}>
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <DropDownPicker
            open={priorityOpen}
            setOpen={setPriorityOpen}
            value={value || "LOW"}
            items={formatDropdownItems(priorities)}
            onChangeValue={onChange}
            setValue={onChange}
            placeholder="Select Priority"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownMenu}
          />
        )}
      />
    </View>
    {errors.priority && (
      <Text style={styles.error}>{errors.priority.message}</Text>
    )}

    {/* Status Dropdown */}
    <Text style={styles.label}>Status</Text>
    <View style={[styles.dropdownWrapper, { zIndex: 1000 }]}>
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <DropDownPicker
            open={statusOpen}
            setOpen={setStatusOpen}
            value={value || "TODO"}
            items={formatDropdownItems(statuses)}
            onChangeValue={onChange}
            setValue={onChange}
            placeholder="Select Status"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownMenu}
          />
        )}
      />
    </View>
    {errors.status && (
      <Text style={styles.error}>{errors.status.message}</Text>
    )}

    {/* Submit Button */}
    <View style={styles.buttonContainer}>
      <Button
        title={loading ? "Creating Plan..." : "Create Plan"}
        color="#007BFF"
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  </ScrollView>
</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  scrollContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingVertical: 8,
    zIndex: 100,
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  error: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  dropdownWrapper : {
    position : 'relative'
  }
});

export default PlanForm;
