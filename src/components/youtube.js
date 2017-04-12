import axios from 'axios';
import { APP } from '../constants';
import { objParamToStringQueryParam } from '../utils';

const request = (config) => {
  return axios(config);
};

class Youtube {
  constructor() {
    this.url = `${APP.YOUTUBE.URL}/playlistItems?key=${APP.YOUTUBE.KEY}&playlistId=${APP.YOUTUBE.PLAYLIST_ID}`;
    this.defaultParams = {
      part: 'snippet,contentDetails',
      maxResults: 50,
    };
  }

  getVideos(params = {}) {
    const defaultParams = Object.assign({}, this.defaultParams, params);
    const url = `${this.url}&${objParamToStringQueryParam(defaultParams)}`;

    return request({ url });
  }
}

export default new Youtube();
