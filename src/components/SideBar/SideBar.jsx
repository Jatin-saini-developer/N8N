const nodeList = [
  {
    type: 'trigger',
    label: 'Trigger',
    icon: '⚡',
    description: 'Start the workflow',
  },
  {
    type: 'github',
    label: 'GitHub',
    icon: '🐙',
    description: 'Add to GitHub Org',
  },
  {
    type: 'slack',
    label: 'Slack',
    icon: '💬',
    description: 'Add to Slack Channels',
  },
  {
    type: 'jira',
    label: 'Jira',
    icon: '📋',
    description: 'Add to Jira Project',
  },
  {
    type: 'notion',
    label: 'Notion',
    icon: '📝',
    description: 'Send Notion Docs',
  },
]

function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div style={{
      width: '220px',
      height: '100vh',
      background: '#111827',
      borderRight: '1px solid #1f2937',
      padding: '16px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontFamily: 'sans-serif',
    }}>
      <p style={{
        color: '#6b7280',
        fontSize: '11px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: '0 0 8px 4px',
      }}>
        Nodes
      </p>

      {nodeList.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
          style={{
            background: '#1a1f2e',
            border: '1px solid #1f2937',
            borderRadius: '8px',
            padding: '10px 12px',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#e8e8f0',
          }}
        >
          <span style={{ fontSize: '20px' }}>{node.icon}</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>
              {node.label}
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>
              {node.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar