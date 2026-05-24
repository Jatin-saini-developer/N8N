import { useSelector } from 'react-redux'

function Topbar() {
  const nodes = useSelector((state) => state.workflow.nodes)
  const edges = useSelector((state) => state.workflow.edges)

  const handleSave = () => {
    const workflow = { nodes, edges }
    console.log('Workflow saved:', JSON.stringify(workflow, null, 2))
    alert('Workflow saved to console! Check DevTools.')
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
        <span style={{ color: '#1f2937' }}>|</span>
        <span style={{ color: '#9ca3af', fontSize: '13px' }}>
          Developer Onboarding Workflow
        </span>
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