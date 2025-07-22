import SystemPromptEditor from "@/components/admin/system-prompt-editor";

const AdminPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Management</h2>
        <p className="text-muted-foreground">
          Configure and manage the AI system's core settings and behavior.
        </p>
      </div>

      <SystemPromptEditor />
    </div>
  );
};

export default AdminPage;
