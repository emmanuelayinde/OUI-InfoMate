
import { useState } from "react";
import { useSystemPrompt } from "@/hooks/admin/useSystemPrompt";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { Save, History, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const SystemPromptEditor = () => {
  const {
    systemPrompt,
    promptHistory,
    isLoading,
    isHistoryLoading,
    updateSystemPrompt,
    isUpdating,
  } = useSystemPrompt();

  const [content, setContent] = useState("");
  const [version, setVersion] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize content when systemPrompt loads
  useState(() => {
    if (systemPrompt && !hasChanges) {
      setContent(systemPrompt.content);
      setVersion(systemPrompt.version);
    }
  }, [systemPrompt]);

  const handleContentChange = (value: string) => {
    setContent(value);
    setHasChanges(value !== (systemPrompt?.content || ""));
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      await updateSystemPrompt({
        content,
        version: version || undefined,
      });
      setHasChanges(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleReset = () => {
    if (systemPrompt) {
      setContent(systemPrompt.content);
      setVersion(systemPrompt.version);
      setHasChanges(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current System Prompt Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>System Prompt Editor</span>
                {systemPrompt?.is_active && (
                  <Badge variant="secondary">Active</Badge>
                )}
              </CardTitle>
              <CardDescription>
                Manage the AI system's base knowledge and behavior
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>System Prompt History</DialogTitle>
                    <DialogDescription>
                      Previous versions of the system prompt
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {isHistoryLoading ? (
                      <Loader />
                    ) : (
                      promptHistory?.map((prompt) => (
                        <Card key={prompt.id}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">v{prompt.version}</Badge>
                                {prompt.is_active && (
                                  <Badge variant="secondary">Current</Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {formatDistanceToNow(new Date(prompt.updated_at), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="max-h-32 overflow-y-auto">
                              <p className="text-sm whitespace-pre-wrap">
                                {prompt.content.substring(0, 300)}
                                {prompt.content.length > 300 && "..."}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                setContent(prompt.content);
                                setVersion(prompt.version);
                                setHasChanges(true);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Load This Version
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="e.g., 1.2.0"
              />
            </div>
            <div className="flex items-end space-x-2">
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isUpdating}
                loading={isUpdating}
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={!hasChanges}
              >
                Reset
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="content">System Prompt Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Enter the system prompt content..."
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
              <span>{content.length} characters</span>
              {hasChanges && (
                <span className="text-orange-600">Unsaved changes</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemPromptEditor;
