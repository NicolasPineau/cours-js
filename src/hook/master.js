import { useEffect, useState } from 'react';

import { loadStorage } from '../lib/local-storage';
import { api } from '../lib/helper/api';

export const useMaster = () => {
  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
    const userKey = loadStorage('key');
    api('master', { key: userKey }).then(res => res.json()).then(setIsMaster);
  }, []);

  return isMaster;
};
