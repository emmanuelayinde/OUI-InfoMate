import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getSystemPromptApi, updateSystemPromptApi } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { ISystemPrompt } from "@/types";

export const useSystemPrompt = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: systemPrompt,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["systemPrompt"],
    queryFn: async () => await getSystemPromptApi(),
  });

  const updateMutation = useMutation({
    mutationFn: (data: ISystemPrompt) => updateSystemPromptApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemPrompt"] });
      toast({
        title: "System prompt updated",
        description: "The system prompt has been successfully updated.",
      });
    },
    onError: (error) => {
      console.error("Failed to update system prompt:", error);
      toast({
        title: "Update failed",
        description: "Failed to update the system prompt. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    systemPrompt,
    isLoading,
    error,
    updateSystemPrompt: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};
