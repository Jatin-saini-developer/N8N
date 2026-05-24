import { useCallback, useRef } from 'react'
import { ReactFlow, Background, Controls, MiniMap, applyNodeChanges, applyEdgeChanges, addEdge, useReactFlow, ReactFlowProvider } from '@xyflow/react'
import { useDispatch, useSelector } from 'react-redux'
import { setNodes, setEdges } from '../../store/workflowSlice'
import TriggerNode from '../Nodes/TriggerNode'
import GithubNode from '../Nodes/GithubNode'
import SlackNode from '../Nodes/SlackNode'
import '@xyflow/react/dist/style.css'

const nodeTypes = {
  trigger: TriggerNode,
  github: GithubNode,
  slack: SlackNode,
}

const initialNodes = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 100 },
    data: { label: 'New Dev Joins' },
  },
]

const initialEdges = []

const nodeLabels = {
  trigger: 'New Dev Joins',
  github: 'Add to GitHub Org',
  slack: 'Add to Slack Channels',
}

function CanvasInner() {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.workflow.nodes)
  const edges = useSelector((state) => state.workflow.edges)
  const { screenToFlowPosition } = useReactFlow()
  const idRef = useRef(10)

  const onNodesChange = useCallback((changes) => {
    dispatch(setNodes(applyNodeChanges(changes, nodes)))
  }, [dispatch, nodes])

  const onEdgesChange = useCallback((changes) => {
    dispatch(setEdges(applyEdgeChanges(changes, edges)))
  }, [dispatch, edges])

  const onConnect = useCallback((connection) => {
    dispatch(setEdges(addEdge(connection, edges)))
  }, [dispatch, edges])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback((event) => {
    event.preventDefault()

    const type = event.dataTransfer.getData('application/reactflow')
    if (!type) return

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    })

    const newNode = {
      id: `${idRef.current++}`,
      type,
      position,
      data: { label: nodeLabels[type] },
    }

    const currentNodes = nodes.length > 0 ? nodes : initialNodes
    dispatch(setNodes([...currentNodes, newNode]))
  }, [nodes, dispatch, screenToFlowPosition])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes.length > 0 ? nodes : initialNodes}
        edges={edges.length > 0 ? edges : initialEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  )
}

export default Canvas