import { useCallback, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react'
import { useDispatch, useSelector } from 'react-redux'
import { setNodes, setEdges, setSelectedNode } from '../../store/workflowSlice'
import TriggerNode from '../Nodes/TriggerNode'
import GithubNode from '../Nodes/GithubNode'
import SlackNode from '../Nodes/SlackNode'
import JiraNode from '../Nodes/JiraNode'
import NotionNode from '../Nodes/NotionNode'
import '@xyflow/react/dist/style.css'

const nodeTypes = {
  trigger: TriggerNode,
  github: GithubNode,
  slack: SlackNode,
  jira: JiraNode,
  notion: NotionNode,
}

const nodeLabels = {
  trigger: 'New Dev Joins',
  github: 'Add to GitHub Org',
  slack: 'Add to Slack Channels',
  jira: 'Add to Jira Project',
  notion: 'Send Notion Docs',
}

const defaultEdgeOptions = {
  animated: true,
  style: {
    stroke: '#3b82f6',
    strokeWidth: 2,
  },
}

// ─── Inner component (has access to useReactFlow hook) ───────────────────────
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

    dispatch(setNodes([...nodes, newNode]))
  }, [nodes, dispatch, screenToFlowPosition])

  const onNodeClick = useCallback((event, node) => {
    dispatch(setSelectedNode(node))
  }, [dispatch])

  const onPaneClick = useCallback(() => {
    dispatch(setSelectedNode(null))
  }, [dispatch])

  const isEmpty = nodes.length === 0

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>

      {/* Empty state — only shows when no nodes on canvas */}
      {isEmpty && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚡</div>
          <p style={{
            color: '#4b5563',
            fontSize: '15px',
            fontWeight: '600',
            margin: '0 0 6px',
            fontFamily: 'sans-serif',
          }}>
            Start building your workflow
          </p>
          <p style={{
            color: '#374151',
            fontSize: '13px',
            margin: 0,
            fontFamily: 'sans-serif',
          }}>
            Drag a node from the left sidebar to get started
          </p>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        deleteKeyCode='Delete'
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

    </div>
  )
}

// ─── Outer component (wraps with ReactFlowProvider) ──────────────────────────
function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  )
}

export default Canvas