export const getAuthToken = (): string | null => {
  const storageType = localStorage.getItem("AuthenticationStorage");
  return storageType === "local"
    ? localStorage.getItem("token")
    : sessionStorage.getItem("token");
};

export const setAuthToken = (token: string) => {
  const storageType = localStorage.getItem("AuthenticationStorage");
  const storage = storageType === "local" ? localStorage : sessionStorage;
  storage.setItem("token", token);
};