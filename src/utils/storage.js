export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("access-token");
};

export const setAccessTokenToLocalStorage = (token) => {
  return localStorage.setItem("access-token", token);
};

export const getAuthAssetsFromLocalStorage = () => {
  const data = localStorage.getItem("auth-assets")
  return JSON.parse(data);
};

export const setAuthAssetsToLocalStorage = (payload) => {
  return localStorage.setItem("auth-assets", JSON.stringify(payload));
};
