export const objParamToStringQueryParam = (params = {}) => {
  return Object.keys(params).map((p) => {
    return `${encodeURIComponent(p)}=${params[encodeURIComponent(p)]}`;
  }).join('&');
};

export const backSlashToBreakLine = (text = '') => {
  return text.replace(/(\n)/g, '<br />');
};

export const normalizeTimeNumber = (time = 0) => {
  return +time > 9 ? `${time}` : `0${time}`;
};

export default {
  objParamToStringQueryParam,
  backSlashToBreakLine,
  normalizeTimeNumber,
};
