export interface Configuration {
  objectStorage: {
    connectionString: string;
    containerName: string;
  };
}

export const config: Configuration = {
  objectStorage: {
    connectionString: "https://scrapazurefunction.blob.core.windows.net",
    containerName: "lessons",
  },
};
