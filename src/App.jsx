import Canvas from './components/Canvas/Canvas'
import Sidebar from './components/Sidebar/Sidebar'
import Topbar from './components/Topbar/Topbar'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Canvas />
        </div>
      </div>
    </div>
  )
}

export default App