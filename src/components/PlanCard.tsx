import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Plan } from '../schemas/plan.schema'

export default function PlanCard({
    id,
    name,
    description,
    priority,
    status
}: Plan) {
  // Determine the priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return '#ff4d4d'; // Red
      case 'MEDIUM':
        return '#ff9f00'; // Orange
      case 'LOW':
        return '#4caf50'; // Green
      default:
        return '#888'; // Gray
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.statusContainer}>
        <Text style={[styles.status, { color: getPriorityColor(priority) }]}>
          Priority: {priority}
        </Text>
        <Text style={styles.status}>Status: {status}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '100%', // Full width
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
})
