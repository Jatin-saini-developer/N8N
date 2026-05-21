import { useCallback } from 'react'
import { ReactFlow, Background, Controls, MiniMap, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'
import { useDispatch, useSelector } from 'react-redux'
import { setNodes, setEdges } from '../../store/workflowSlice'
import '@xyflow/react/dist/style.css'

function Canvas() {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.workflow.nodes)
  const edges = useSelector((state) => state.workflow.edges)

  const onNodesChange = useCallback((changes) => {
    dispatch(setNodes(applyNodeChanges(changes, nodes)))
  }, [dispatch, nodes])

  const onEdgesChange = useCallback((changes) => {
    dispatch(setEdges(applyEdgeChanges(changes, edges)))
  }, [dispatch, edges])

  const onConnect = useCallback((connection) => {
    dispatch(setEdges(addEdge(connection, edges)))
  }, [dispatch, edges])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

export default Canvas