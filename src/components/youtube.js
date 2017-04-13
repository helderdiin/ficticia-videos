import axios from 'axios';
import { APP } from '../constants';
import { objParamToStringQueryParam } from '../utils';

const defaultParams = {
  playlistItems: {
    part: 'snippet,contentDetails',
    maxResults: 50,
  },
  videos: {
    part: 'statistics,contentDetails',
  },
};

const getUrl = (routeName = 'playlistItems') => {
  return `${APP.YOUTUBE.URL}/${routeName}?key=${APP.YOUTUBE.KEY}&playlistId=${APP.YOUTUBE.PLAYLIST_ID}`;
};

const request = (config) => {
  return axios(config);
};

const getPlaylistItems = (params = {}) => {
  const playlistItemsParams = Object.assign({}, defaultParams.playlistItems, params);
  const url = `${getUrl('playlistItems')}&${objParamToStringQueryParam(playlistItemsParams)}`;

  return request({ url });
};

const getVideos = (params = {}) => {
  const videosParams = Object.assign({}, defaultParams.videos, params);
  const url = `${getUrl('videos')}&${objParamToStringQueryParam(videosParams)}`;

  return request({ url });
};

class Youtube {
  getVideosData(params = {}) {
    return getPlaylistItems(params).then((res = {}) => {
      const items = res.data.items;

      const reqs = items.map((i) => {
        return getVideos({ id: i.contentDetails.videoId });
      });

      return Promise.all(reqs).then((resolveds = {}) => {
        return resolveds.map((r, i) => {
          return Object.assign({}, items[i], r.data.items[0]);
        });
      });
    });
  }
}

export default new Youtube();
