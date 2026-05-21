import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
}

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload
    },
    setEdges: (state, action) => {
      state.edges = action.payload
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload
    },
  },
})

export const { setNodes, setEdges, setSelectedNode } = workflowSlice.actions
export default workflowSlice.reducer