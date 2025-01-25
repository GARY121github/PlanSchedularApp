import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Plan, Status } from '../schemas/plan.schema';
import EditPlanForm from './forms/EditPlanForm';

export default function PlanCard({
  id,
  name,
  description,
  priority,
  status,
}: Plan) {
  const [isVisible, setIsVisible] = useState(false);

  const onSave = () => {
    Alert.alert('Plan updated successfully');
    setIsVisible(false);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return '#ff4d4d';
      case 'MEDIUM':
        return '#ff9f00';
      case 'LOW':
        return '#4caf50';
      default:
        return '#888';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'TODO':
        return '#ff4d4d';
      case 'IN_PROGRESS':
        return '#ff9f00';
      case 'DONE':
        return '#4caf50';
      default:
        return '#888';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardDetail}>
        <Text style={styles.title}>{name}</Text>
        <Button title="Edit Plan" onPress={() => setIsVisible(true)} />
        {isVisible && (
          <EditPlanForm
            onClose={onClose}
            onSave={onSave}
            visible={isVisible}
            plan={{ id, name, description, priority, status }}
          />
        )}
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.statusContainer}>
        <Text style={[styles.status, { color: getPriorityColor(priority) }]}>
          Priority: {priority}
        </Text>
        <Text style={[styles.status, { color: getStatusColor(status || 'TODO') }]}>
          Status: {status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
  },
  cardDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: 12,
    color: '#888',
  },
});
