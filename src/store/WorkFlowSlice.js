import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  workflowName: 'Developer Onboarding Workflow',
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
    setWorkflowName: (state, action) => {
      state.workflowName = action.payload
    },
  },
})

export const {
  setNodes,
  setEdges,
  setSelectedNode,
  updateNodeData,
  setWorkflowName,
} = workflowSlice.actions

export default workflowSlice.reducer