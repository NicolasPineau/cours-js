import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from './components/routing/ScrollToTop';
import { RouteWrapper } from './components/routing/RouteWrapper';
import { User } from './components/user/User';
import { routes } from './resources/routing/routes';
import { Home } from './components/home/Home';
import { Team } from './components/lesson/Team';
import { Quiz } from './components/quiz/Quiz';
import { End } from './components/end/End';
import { Lesson } from './components/lesson/Lesson';

export const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Switch>
      <RouteWrapper exact path={routes.home} component={Home} />
      <Route exact path={routes.team} component={Team} />
      <Route exact path={routes.quiz} component={Quiz} />
      <RouteWrapper exact path={routes.user} component={User} />
      <RouteWrapper exact path={routes.end} component={End} />
      <RouteWrapper exact path={[routes.module, routes.modulePage]} component={Lesson} />
    </Switch>
  </BrowserRouter>
);
