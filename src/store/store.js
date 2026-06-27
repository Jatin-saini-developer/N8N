import { configureStore } from '@reduxjs/toolkit'
import workflowReducer from './workflowSlice'
import authReducer from './authSlice'
import workflowListReducer from './workflowListSlice'

const store = configureStore({
  reducer: {
    workflow: workflowReducer,
    auth: authReducer,
    workflowList: workflowListReducer,
  },
})

export default store