import { ISystemPrompt } from "@/types";
import { api } from "./axios";

export const getSystemPromptApi = async (): Promise<ISystemPrompt> => {
  const response = await api.get<ISystemPrompt>("/system-prompt");
  return response.data;
};

export const updateSystemPromptApi = async (
  data: ISystemPrompt
): Promise<ISystemPrompt> => {
  const response = await api.put<ISystemPrompt>("/system-prompt", data);
  return response.data;
};
