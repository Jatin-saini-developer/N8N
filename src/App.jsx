import { Routes, Route, Navigate } from 'react-router-dom'
import Canvas from './components/Canvas/Canvas'
import Sidebar from './components/Sidebar/Sidebar'
import Topbar from './components/Topbar/Topbar'
import ConfigPanel from './components/ConfigPanel/ConfigPanel'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import WorkflowEditor from './pages/WorkflowEditor'
import LandingPage from './pages/LandingPage'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/landingpage' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/workflow/:id' element={<WorkflowEditor />} />
      <Route path='/landingpage' element={<LandingPage />} />
    </Routes>
  )
}

export default App