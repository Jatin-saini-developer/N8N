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
    updateNodeData: (state, action) => {
      const { id, data } = action.payload
      const node = state.nodes.find((n) => n.id === id)
      if (node) {
        node.data = { ...node.data, ...data }
      }
    },
  },
})

export const {
  setNodes,
  setEdges,
  setSelectedNode,
  updateNodeData,
} = workflowSlice.actions

export default workflowSlice.reducer