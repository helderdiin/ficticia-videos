export const objParamToStringQueryParam = (params = {}) => {
  return Object.keys(params).map((p) => {
    return `${encodeURIComponent(p)}=${params[encodeURIComponent(p)]}`;
  }).join('&');
};

export default {
  objParamToStringQueryParam,
};
