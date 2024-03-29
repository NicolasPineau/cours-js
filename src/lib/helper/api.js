export const api = (action, queryArgs = {}, options = {}) => {
  const args = Object.entries(queryArgs).reduce((acc, [k, v]) => (
    acc.concat(`${k}=${v}`)
  ), []).join('&');



  return fetch(`/api/${action}.php?${args}`, options);
};
