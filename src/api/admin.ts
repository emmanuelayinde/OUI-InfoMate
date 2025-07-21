
import { ISystemPrompt, IUpdateSystemPromptRequest } from "@/types";
import { api } from "./axios";

export const getSystemPromptApi = async (): Promise<ISystemPrompt> => {
  const response = await api.get<ISystemPrompt>("/admin/system-prompt");
  return response.data;
};

export const updateSystemPromptApi = async (
  data: IUpdateSystemPromptRequest
): Promise<ISystemPrompt> => {
  const response = await api.put<ISystemPrompt>("/admin/system-prompt", data);
  return response.data;
};

export const getSystemPromptHistoryApi = async (): Promise<ISystemPrompt[]> => {
  const response = await api.get<ISystemPrompt[]>("/admin/system-prompt/history");
  return response.data;
};
