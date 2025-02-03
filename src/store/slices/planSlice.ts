import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plan } from '../../schemas/plan.schema';

interface PlansState {
    plans : Plan[]
}

// Initial State
const initialState : PlansState = {
    plans : []
}

// create the plans slice
const planSlice = createSlice({
    name : 'plans',
    initialState,
    reducers : {
        setPlans : (state , action : PayloadAction<Plan[]>) => {
            state.plans = action.payload;
        },
        updatePlan : (state , action : PayloadAction<Plan>) => {
            const allPlans = state.plans.filter(plan => plan.id !== action.payload.id);
            const updatePlan = {...action.payload};
            state.plans = [...allPlans , updatePlan];
        },
        deletePlan : (state , action : PayloadAction<Plan>) => {
            state.plans = state.plans.filter((plan) => plan.id !== action.payload.id)
        }
    }
})

export const {setPlans , updatePlan , deletePlan} = planSlice.actions;
export default planSlice.reducer;
