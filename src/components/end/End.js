import React from 'react';

import Bye from '../../resources/pictures/bye.gif';

export const End = () => {
  return (
      <div className="home">
        <h1>Mervi à vous d'avoir suivi ce cours !</h1>
        <p>La semaine prochaine nous verrons entre autres les mots-clés <code>async</code> / <code>await</code>, de nouvelles fonctions pratiques dans les prototype de `string` et de `Object`.</p>
        <img src={Bye} />
      </div>
  )
};
