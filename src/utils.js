export const objParamToStringQueryParam = (params = {}) => {
  return Object.keys(params).map((p) => {
    return `${encodeURIComponent(p)}=${params[encodeURIComponent(p)]}`;
  }).join('&');
};

export const backSlashToBreakLine = (text = '') => {
  return text.replace(/(\n)/g, '<br />');
};

export default {
  objParamToStringQueryParam,
  backSlashToBreakLine,
};
