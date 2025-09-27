export const ACCESS_TOKEN = "access_token";
export const setToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};
