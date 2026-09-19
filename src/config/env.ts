const getEnvVar = (key: keyof ImportMetaEnv): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  apiUrl: getEnvVar("VITE_BASE_URL"),
  mapKey: getEnvVar("VITE_MAP_API_KEY"),
} as const;
