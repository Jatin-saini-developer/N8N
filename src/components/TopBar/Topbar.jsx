import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWorkflowName } from '../../store/workflowSlice'

function Topbar() {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.workflow.nodes)
  const edges = useSelector((state) => state.workflow.edges)
  const workflowName = useSelector((state) => state.workflow.workflowName)

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    const workflow = { workflowName, nodes, edges }
    console.log('Workflow saved:', JSON.stringify(workflow, null, 2))
    alert('Workflow saved to console! Check DevTools.')
  }

  const handleNameClick = () => {
    setIsEditing(true)
  }

  const handleNameBlur = (e) => {
    const value = e.target.value.trim()
    if (value) {
      dispatch(setWorkflowName(value))
    }
    setIsEditing(false)
  }

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  return (
    <div style={{
      width: '100%',
      height: '52px',
      background: '#111827',
      borderBottom: '1px solid #1f2937',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
    }}>

      {/* Left — Logo + Workflow Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{
          color: '#60a5fa',
          fontWeight: '700',
          fontSize: '16px',
          letterSpacing: '-0.5px',
        }}>
          ZeroDay
        </span>
        <span style={{ color: '#374151' }}>|</span>

        {isEditing ? (
          <input
            autoFocus
            defaultValue={workflowName}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            style={{
              background: '#1a1f2e',
              border: '1px solid #3b82f6',
              borderRadius: '6px',
              color: '#e8e8f0',
              fontSize: '13px',
              padding: '4px 8px',
              outline: 'none',
              width: '240px',
            }}
          />
        ) : (
          <span
            onClick={handleNameClick}
            title='Click to edit'
            style={{
              color: '#9ca3af',
              fontSize: '13px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.target.style.border = '1px solid #374151'
              e.target.style.color = '#e8e8f0'
            }}
            onMouseLeave={(e) => {
              e.target.style.border = '1px solid transparent'
              e.target.style.color = '#9ca3af'
            }}
          >
            {workflowName}
          </span>
        )}
      </div>

      {/* Right — Buttons */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={handleSave}
          style={{
            background: 'transparent',
            border: '1px solid #374151',
            borderRadius: '6px',
            color: '#9ca3af',
            padding: '6px 14px',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          style={{
            background: '#2563eb',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            padding: '6px 14px',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          Run
        </button>
      </div>

    </div>
  )
}

export default Topbar