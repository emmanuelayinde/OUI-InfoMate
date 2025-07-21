
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSystemPromptApi, updateSystemPromptApi, getSystemPromptHistoryApi } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { IUpdateSystemPromptRequest } from "@/types";

export const useSystemPrompt = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: systemPrompt,
    isLoading,
    error
  } = useQuery({
    queryKey: ["systemPrompt"],
    queryFn: getSystemPromptApi,
  });

  const {
    data: promptHistory,
    isLoading: isHistoryLoading
  } = useQuery({
    queryKey: ["systemPromptHistory"],
    queryFn: getSystemPromptHistoryApi,
  });

  const updateMutation = useMutation({
    mutationFn: (data: IUpdateSystemPromptRequest) => updateSystemPromptApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemPrompt"] });
      queryClient.invalidateQueries({ queryKey: ["systemPromptHistory"] });
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
    promptHistory,
    isLoading,
    isHistoryLoading,
    error,
    updateSystemPrompt: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};
