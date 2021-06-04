import React from 'react';
import { Route, Redirect } from 'react-router';

import { routes } from '../../resources/routing/routes';
import { Layout } from '../layout/Layout';
import { getUserInfo } from '../../lib/helper/user';

export const RouteWrapper = ({ component: Component, path, ...rest }) => {
  const { name, level } = getUserInfo();

  if (((name || '').length < 3 || !level) && path !== routes.user) {
    return <Redirect to={routes.user} />;
  }

  return (
      <Route {...rest} render={props => <Layout>
          <Component {...props} />
      </Layout>} />
  );
};
