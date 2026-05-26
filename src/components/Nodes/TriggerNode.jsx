import { Handle, Position } from '@xyflow/react'
import NodeWrapper from './NodeWrapper'

function TriggerNode({ id, data }) {
  return (
    <NodeWrapper id={id}>
      <div style={{
        background: '#4a4f62',
        border: '1px solid #6b7280',
        borderRadius: '10px',
        padding: '12px 20px',
        minWidth: '180px',
        textAlign: 'center',
        color: '#e8e8f0',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ fontSize: '20px', marginBottom: '6px' }}>⚡</div>
        <div style={{ fontSize: '13px', fontWeight: '700' }}>Trigger</div>
        <div style={{ fontSize: '11px', opacity: 0.75, marginTop: '4px' }}>
          {data.label}
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </NodeWrapper>
  )
}

export default TriggerNode