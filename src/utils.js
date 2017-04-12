export const objToQueryParam = (params = {}) => {
  return Object.keys(params).map((p) => {
    return `${p}=${params[p]}`;
  }).join('&');
};

export default {
  objToQueryParam,
};
