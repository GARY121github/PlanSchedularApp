import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Router from './routes/Router'
import { Provider } from 'react-redux'
import { store } from './store/store'

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>

  )
}
