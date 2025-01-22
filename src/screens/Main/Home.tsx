import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import planService from '../../services/plan.service'
import PlanCard from '../../components/PlanCard';
import { Plan } from '../../schemas/plan.schema';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [plans, setPlans] = useState<Plan[]>([]);

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const response = await planService.getPlans();
      if(!response.data){
        throw new Error("No plans found");
      }
      setPlans(response.data);
    } catch (error) {
      console.log("Error while fetching plans", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlans();
  }, [])

  return (
    <View style={styles.container}>
      {
        isLoading ? <Text>Loading...</Text> : (
          <View>
            {
              plans.length > 0 ? (
                <View>
                 {
                  plans.map((plan : Plan) => (
                    <PlanCard key={plan.id} {...plan} />
                  ))
                 }
                </View>
              ) : (
                <Text>No plans found</Text> 
              )
            }
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})