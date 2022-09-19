import React, { useState } from 'react';
import { Badge } from 'react-bootstrap'

import { useInterval } from '../../hook/interval';
import { getUserInfo } from '../../lib/helper/user';
import logo from '../../resources/pictures/logo.png';

export const Header = () => {
  const [now, setNow] = useState(new Date());

  const { name: userName } = getUserInfo();

  useInterval(() => {
    setNow(new Date());
  }, 1000);

  const formattedNow = now.toLocaleString('fr-FR').slice(0, -3).replace(/à/,'-');

  return (
      <div className="header">
        <div className="flex flex--items-center">
          <div className="logo">
            <img src={logo} alt="Cours JS logo" />
          </div>
          <h1>
            Le javascript moderne
          </h1>
          <div className="flex flex--col flex--items-center">
            <div>{userName}</div>
            <Badge className="now" variant="primary">{formattedNow}</Badge>
          </div>
        </div>
      </div>
  );
};
