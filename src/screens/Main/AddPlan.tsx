import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AddPlanForm from '../../components/forms/AddPlanForm';
import { AppTabParamList } from '../../routes/AppRoutes';

export type AddPlanScreenProps = NativeStackScreenProps<AppTabParamList, 'Add'>;

export default function AddPlan({ navigation }: AddPlanScreenProps) {
  return (
    <View style={styles.container}>
      <AddPlanForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa', // Optional background color for better styling
  },
});
