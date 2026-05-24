import { Handle, Position } from '@xyflow/react'

function SlackNode({ data }) {
  return (
    <div style={{
      background: '#1a1f2e',
      border: '1px solid #4a154b',
      borderRadius: '10px',
      padding: '12px 20px',
      minWidth: '180px',
      textAlign: 'center',
      color: '#e8e8f0',
      fontFamily: 'sans-serif',
    }}>
      <Handle type="target" position={Position.Top} />

      <div style={{ fontSize: '20px', marginBottom: '6px' }}>💬</div>
      <div style={{ fontSize: '13px', fontWeight: '700' }}>Slack</div>
      <div style={{ fontSize: '11px', opacity: 0.75, marginTop: '4px' }}>
        {data.label}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default SlackNode