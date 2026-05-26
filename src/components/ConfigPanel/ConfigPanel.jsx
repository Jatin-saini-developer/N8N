import { useDispatch, useSelector } from "react-redux";
import { setSelectedNode, updateNodeData } from "../../store/workflowSlice";

function ConfigPanel() {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.workflow.selectedNode);

  if (!selectedNode) return null;

  const handleClose = () => {
    dispatch(setSelectedNode(null));
  };

  const handleChange = (field, value) => {
    dispatch(
      updateNodeData({
        id: selectedNode.id,
        data: { [field]: value },
      }),
    );
  };

  const renderFields = () => {
    switch (selectedNode.type) {
      case "trigger":
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Trigger Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.label}
              onChange={(e) => handleChange("label", e.target.value)}
              placeholder="e.g. New Dev Joins"
            />
            <label style={styles.label}>Description</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="What triggers this workflow?"
            />
          </div>
        );

      case "github":
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Organization Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.orgName || ""}
              onChange={(e) => handleChange("orgName", e.target.value)}
              placeholder="e.g. my-company"
            />
            <label style={styles.label}>Repositories (comma separated)</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.repos || ""}
              onChange={(e) => handleChange("repos", e.target.value)}
              placeholder="e.g. frontend, backend, docs"
            />
            <label style={styles.label}>Role</label>
            <select
              style={styles.input}
              defaultValue={selectedNode.data.role || "member"}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
          </div>
        );

      case "slack":
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Workspace Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.workspace || ""}
              onChange={(e) => handleChange("workspace", e.target.value)}
              placeholder="e.g. my-company"
            />
            <label style={styles.label}>Channels (comma separated)</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.channels || ""}
              onChange={(e) => handleChange("channels", e.target.value)}
              placeholder="e.g. general, engineering, random"
            />
          </div>
        );

      case "jira":
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Project Key</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.projectKey || ""}
              onChange={(e) => handleChange("projectKey", e.target.value)}
              placeholder="e.g. ENG"
            />
            <label style={styles.label}>Team Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.team || ""}
              onChange={(e) => handleChange("team", e.target.value)}
              placeholder="e.g. Engineering"
            />
            <label style={styles.label}>Role</label>
            <select
              style={styles.input}
              defaultValue={selectedNode.data.role || "developer"}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="developer">Developer</option>
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        );

      case "notion":
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Workspace Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.workspace || ""}
              onChange={(e) => handleChange("workspace", e.target.value)}
              placeholder="e.g. my-company"
            />
            <label style={styles.label}>Pages to Share (comma separated)</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.pages || ""}
              onChange={(e) => handleChange("pages", e.target.value)}
              placeholder="e.g. Onboarding Guide, Dev Setup, Team Norms"
            />
          </div>
        );

      default:
        return (
          <p style={{ color: "#6b7280", fontSize: "13px" }}>
            No configuration available for this node.
          </p>
        );
    }
  };

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <p style={styles.nodeType}>{selectedNode.type.toUpperCase()}</p>
          <p style={styles.nodeLabel}>{selectedNode.data.label}</p>
        </div>
        <button onClick={handleClose} style={styles.closeBtn}>
          ✕
        </button>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Fields */}
      <div style={styles.body}>{renderFields()}</div>
    </div>
  );
}

const styles = {
  panel: {
    width: "280px",
    height: "100vh",
    background: "#111827",
    borderLeft: "1px solid #1f2937",
    fontFamily: "sans-serif",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
  },
  nodeType: {
    color: "#6b7280",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    margin: "0 0 4px",
  },
  nodeLabel: {
    color: "#e8e8f0",
    fontSize: "14px",
    fontWeight: "600",
    margin: 0,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#6b7280",
    fontSize: "16px",
    cursor: "pointer",
  },
  divider: {
    height: "1px",
    background: "#1f2937",
    margin: "0 16px",
  },
  body: {
    padding: "16px",
    overflowY: "auto",
    flex: 1,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "#9ca3af",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: "8px",
  },
  input: {
    background: "#1a1f2e",
    border: "1px solid #1f2937",
    borderRadius: "6px",
    color: "#e8e8f0",
    padding: "8px 10px",
    fontSize: "13px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
};

export default ConfigPanel;
