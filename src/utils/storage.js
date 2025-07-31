export const storage = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.log(`Error getting key [${key}] from local stoarge.`, error);
    }
  },
  set(key, value) {
    try {
      return localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(`Error getting key [${key}] from local stoarge.`, error);
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
