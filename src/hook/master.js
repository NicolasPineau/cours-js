import { useState } from 'react';

import { loadStorage } from '../lib/local-storage';

export const useMaster = () => {
  const [isMaster, setIsMaster] = useState(false);
  const userKey = loadStorage('key');

  fetch(`/api/master.php?key=${userKey}`).then(res => res.json()).then(setIsMaster);

  return isMaster;
};
