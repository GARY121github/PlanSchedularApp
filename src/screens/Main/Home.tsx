import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import planService from '../../services/plan.service';
import PlanCard from '../../components/PlanCard';
import { Plan } from '../../schemas/plan.schema';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [plans, setPlans] = useState<Plan[]>([]);

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const response = await planService.getPlans();
      if (!response.data) {
        throw new Error('No plans found');
      }
      setPlans(response.data);
    } catch (error) {
      console.error('Error while fetching plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPlans();
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.planSection}>
          {plans.length > 0 ? (
            <FlatList
              data={plans}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PlanCard {...item} />}
            />
          ) : (
            <Text>No plans found</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planSection: {
    width: '100%',
    padding: 16,
  },
});
