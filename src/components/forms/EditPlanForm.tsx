import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    StyleSheet
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import planSchema, {Plan} from "../../schemas/plan.schema";
import planService from "../../services/plan.service";
import { useAppDispatch } from "../../hooks/useRedux";
import { updatePlan } from "../../store/slices/planSlice";

interface EditPlanModalProps {
    visible: boolean;
    onClose: () => void;
    plan: Plan;
    onSave: () => void; // Callback to notify parent about updates
}

const EditPlanForm: React.FC<EditPlanModalProps> = ({ visible, onClose, plan, onSave }) => {

    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Omit<Plan, 'id'>>({
        resolver: zodResolver(planSchema.omit({ id: true })),
        defaultValues: {
            name: plan.name,
            description: plan.description || "",
            priority: plan.priority,
            status: plan.status,
        },
    });

    const [loading, setLoading] = useState(false);
    const [priorityOpen, setPriorityOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);

    const priorities = ["LOW", "MEDIUM", "HIGH"];
    const statuses = ["TODO", "IN_PROGRESS", "COMPLETED"];

    const formatDropdownItems = (items: string[]) =>
        items.map((item) => ({
            label: item.charAt(0) + item.slice(1).toLowerCase(),
            value: item,
        }));

    const onSubmit = async (data: Omit<Plan, 'id'>) => {
        const updatedPlan = { ...data, id: plan.id }; // Merge the edited fields with the original id
        setLoading(true);
        try {
            await planService.updatePlan(updatedPlan);
            dispatch(updatePlan(updatedPlan));
            onSave(); // Notify parent component to refresh the plan list
            onClose(); // Close the modal
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <KeyboardAvoidingView
                style={styles.modalContainer}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.modalContent}>
                    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                        <Text style={styles.title}>Edit Plan</Text>

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
                        {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

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
                        {errors.priority && <Text style={styles.error}>{errors.priority.message}</Text>}

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
                        {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}

                        {/* Action Buttons */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => {
                                    reset();
                                    onClose();
                                }}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.saveButton]}
                                onPress={handleSubmit(onSubmit)}
                                disabled={loading}
                            >
                                <Text style={styles.buttonText}>
                                    {loading ? "Saving..." : "Save"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: "top",
    },
    dropdownWrapper: {
        position: "relative",
    },
    dropdownContainer: {
        marginBottom: 16,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ddd",
    },
    dropdownMenu: {
        backgroundColor: "#fff",
    },
    error: {
        color: "#ff6b6b",
        fontSize: 14,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#000000",
    },
    saveButton: {
        backgroundColor: "#007bff",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});


export default EditPlanForm;
