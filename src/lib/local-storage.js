export const loadStorage = (key, defaultValue = undefined) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultValue;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return defaultValue;
  }
};

export const saveStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    console.error('Could not save store to local storage');
  }
};
