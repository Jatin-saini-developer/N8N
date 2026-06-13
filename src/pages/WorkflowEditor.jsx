import Canvas from '../components/Canvas/Canvas'
import Sidebar from '../components/SideBar/SideBar'
import Topbar from '../components/TopBar/Topbar'
import ConfigPanel from '../components/ConfigPanel/ConfigPanel'

function WorkflowEditor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Canvas />
        </div>
        <ConfigPanel />
      </div>
    </div>
  )
}

export default WorkflowEditor