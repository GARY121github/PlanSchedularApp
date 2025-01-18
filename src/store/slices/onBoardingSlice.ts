import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type for onboarding
interface OnboardingState {
  hasLaunched: boolean;
}

// Initial state
const initialState: OnboardingState = {
  hasLaunched: false,  // Initially onboarding is not completed
};

// Create onboarding slice
const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setHasLaunched: (state, action: PayloadAction<boolean>) => {
      state.hasLaunched = action.payload;
    },
  },
});

// Export actions and reducer
export const { setHasLaunched } = onboardingSlice.actions;
export default onboardingSlice.reducer;
