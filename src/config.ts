export const getEnvVar = (key: string): string | undefined => {
  return (
    (typeof window !== "undefined" && (window as any).env?.[key]) ||
    (import.meta.env as Record<string, string | undefined>)[key]
  );
};
