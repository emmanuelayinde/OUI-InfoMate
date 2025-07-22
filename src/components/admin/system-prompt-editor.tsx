import { Save } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSystemPrompt } from "@/hooks/admin/useSystemPrompt";
import Loader from "../ui/loader";

const SystemPromptEditor = () => {
  const { systemPrompt, isLoading, updateSystemPrompt, isUpdating } =
    useSystemPrompt();

  const [prompt, setPrompt] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize prompt when systemPrompt loads
  useEffect(() => {
    if (systemPrompt && !hasChanges) {
      setPrompt(systemPrompt.prompt);
    }
  }, [systemPrompt, hasChanges]);

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    setHasChanges(value !== (systemPrompt?.prompt || ""));
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      await updateSystemPrompt({ prompt });
      setHasChanges(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleReset = () => {
    if (systemPrompt) {
      setPrompt(systemPrompt.prompt);
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
      {/* System Prompt Editor Card */}
      <Card>
        <CardHeader>
          <CardTitle>System Prompt Editor</CardTitle>
          <CardDescription>
            Manage the AI system's base knowledge and behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
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

          <div>
            <Label htmlFor="prompt">System Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              placeholder="Enter the system prompt content..."
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
              <span>{prompt.length} characters</span>
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
