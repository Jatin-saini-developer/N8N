import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialWorkflows = [
  {
    id: '1',
    name: 'Developer Onboarding',
    description: 'Automates GitHub, Slack, Jira and Notion access',
    nodes: 5,
    createdAt: '2026-05-20',
    status: 'active',
  },
  {
    id: '2',
    name: 'Frontend Dev Onboarding',
    description: 'Specific workflow for frontend developers',
    nodes: 3,
    createdAt: '2026-05-22',
    status: 'draft',
  },
]

function Dashboard() {
  const navigate = useNavigate()
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleNewWorkflow = () => {
    const newWorkflow = {
      id: `${Date.now()}`,
      name: 'Untitled Workflow',
      description: 'No description yet',
      nodes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft',
    }
    setWorkflows([...workflows, newWorkflow])
    navigate(`/workflow/${newWorkflow.id}`)
  }

  const handleOpenWorkflow = (id) => {
    navigate(`/workflow/${id}`)
  }

  const handleDeleteClick = (e, workflow) => {
    e.stopPropagation()
    setSelectedWorkflow(workflow)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    setWorkflows(workflows.filter((w) => w.id !== selectedWorkflow.id))
    setShowDeleteModal(false)
    setSelectedWorkflow(null)
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setSelectedWorkflow(null)
  }

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Topbar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-blue-400 text-xl font-bold tracking-tight">
          ZeroDay
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm">My Workspace</span>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white text-sm border border-gray-700 hover:border-gray-500 rounded-lg px-4 py-1.5 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white text-2xl font-semibold">
              My Workflows
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {workflows.length} workflow{workflows.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleNewWorkflow}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            New Workflow
          </button>
        </div>

        {/* Workflow grid */}
        {workflows.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">⚡</div>
            <p className="text-gray-400 text-lg font-medium">
              No workflows yet
            </p>
            <p className="text-gray-600 text-sm mt-2 mb-6">
              Create your first workflow to get started
            </p>
            <button
              onClick={handleNewWorkflow}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors"
            >
              Create Workflow
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                onClick={() => handleOpenWorkflow(workflow.id)}
                className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-6 cursor-pointer transition-all group"
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-blue-500/10 rounded-lg p-2">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Status badge */}
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      workflow.status === 'active'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {workflow.status}
                    </span>
                    {/* Delete button */}
                    <button
                      onClick={(e) => handleDeleteClick(e, workflow)}
                      className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-lg leading-none"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Card body */}
                <h3 className="text-white text-base font-semibold mb-1">
                  {workflow.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {workflow.description}
                </p>

                {/* Card footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <span className="text-gray-600 text-xs">
                    {workflow.nodes} node{workflow.nodes !== 1 ? 's' : ''}
                  </span>
                  <span className="text-gray-600 text-xs">
                    {workflow.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-white text-lg font-semibold mb-2">
              Delete Workflow
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to delete{' '}
              <span className="text-white font-medium">
                "{selectedWorkflow?.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-lg px-4 py-2.5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg px-4 py-2.5 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard