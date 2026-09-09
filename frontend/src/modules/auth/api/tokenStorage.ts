let accessToken :string|null

export const storeAccessToken =(token: string | null) => {
  accessToken = token;
};


export const getStoredAccessToken  = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};