import { loadStorage, saveStorage } from '../local-storage';

export const getUserInfo = () => ({
  name: loadStorage('username'),
  level: loadStorage('level'),
  id: loadStorage('userId'),
});

export const setUserInfo = ({ name, level, id }) => {
  name && saveStorage('username', name);
  level && saveStorage('level', level);
  id && saveStorage('userId', id);
};
