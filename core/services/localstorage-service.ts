export const LocalStorage = {
  get<T>(key: string) {
    const data = localStorage.getItem(btoa(key));
    return data == null || data === undefined
      ? undefined
      : (JSON.parse(atob(data)) as T);
  },
  set<T>(key: string, item: T) {
    const data = btoa(JSON.stringify(item));
    localStorage.setItem(btoa(key), data);
  },
  remove(key: string) {
    localStorage.removeItem(btoa(key));
  },
  clear() {
    localStorage.clear();
  },
};
