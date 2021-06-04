import React from 'react';
import { Breadcrumb } from 'react-bootstrap'

import { getCurrentPath } from '../../lib/helper/routing';

export const Breadcrumbs = () => {
  const crumbs = [];
  const paths = getCurrentPath().slice(1).split('/');
  while (paths.length > 0) {
    crumbs.push({
      url: '/' + paths.join('/'),
      title: paths[paths.length - 1],
    });
    paths.pop();
  }

  return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
        {crumbs.reverse().map(({ url, title }, i) => (
            <Breadcrumb.Item key={i} href={url} active={i === crumbs.length -1}>{title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
  );
};
