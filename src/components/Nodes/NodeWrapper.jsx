import { useDispatch, useSelector } from 'react-redux'
import { setNodes, setEdges, setSelectedNode } from '../../store/workflowSlice'

function NodeWrapper({ id, children }) {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.workflow.nodes)
  const edges = useSelector((state) => state.workflow.edges)

  const handleDelete = (e) => {
    e.stopPropagation()
    const updatedNodes = nodes.filter((n) => n.id !== id)
    const updatedEdges = edges.filter(
      (edge) => edge.source !== id && edge.target !== id
    )
    dispatch(setNodes(updatedNodes))
    dispatch(setEdges(updatedEdges))
    dispatch(setSelectedNode(null))
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Delete button */}
      <div
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          width: '18px',
          height: '18px',
          background: '#ef4444',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '10px',
          color: '#fff',
          fontWeight: '700',
          zIndex: 10,
          lineHeight: 1,
        }}
      >
        ✕
      </div>
      {children}
    </div>
  )
}

export default NodeWrapper