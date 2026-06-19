import { configureStore } from '@reduxjs/toolkit'
import workflowReducer from './workflowSlice'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    workflow: workflowReducer,
    auth: authReducer,
  },
})

export default store