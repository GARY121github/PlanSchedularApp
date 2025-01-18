import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './slices/onBoardingSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,  // Onboarding slice for Redux
  },
});

export type RootState = ReturnType<typeof store.getState>;  // Type for the root state
export type AppDispatch = typeof store.dispatch;  // Type for dispatch function
