import { routes } from '../../resources/routing/routes';

export const getCurrentModule = () => {
  const path = window.location.pathname.slice(1).split('/');

  return {
    currentModule: path[0],
    currentPage: path[1],
  }
};

export const getCurrentPath = () => {
  return window.location.pathname;
};

export const getRoute = (module, page = null) => {
  if (page) {
    return routes.modulePage.replace(/:module/, module).replace(/:page/, page);
  }

  return routes.module.replace(/:module/, module);
};
