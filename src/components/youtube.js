import axios from 'axios';
import moment from 'moment';
import { APP } from '../constants';
import { objParamToStringQueryParam, backSlashToBreakLine, normalizeTimeNumber } from '../utils';

const defaultParams = {
  playlistItems: {
    part: 'snippet,contentDetails',
    maxResults: 50,
  },
  searchedItems: {
    part: 'snippet,id',
    type: 'video',
    maxResults: 50,
  },
  videos: {
    part: 'statistics,contentDetails,snippet',
  },
};

export const getBestThumbnail = (thumbnails = {}) => {
  if (thumbnails.maxres) {
    return thumbnails.maxres.url;
  } else if (thumbnails.high) {
    return thumbnails.high.url;
  }
  return thumbnails.default.url;
};

export const getDurationGroups = (duration = '') => {
  const regexpMS = /PT(\d+)M(\d+)S/;
  const regexpM = /PT(\d+)M/;
  const regexpS = /PT(\d+)S/;

  if (duration.match(/[M]/g) && duration.match(/[S]/g)) {
    const result = regexpMS.exec(duration);
    return [result[1], result[2]];
  } else if (duration.match(/[M]/g)) {
    const result = regexpM.exec(duration);
    return [result[1], undefined];
  }

  const result = regexpS.exec(duration);
  return [undefined, result[1]];
};

export const getVideoDuration = (duration = '') => {
  const groups = getDurationGroups(duration);

  return `${normalizeTimeNumber(groups[0])}:${normalizeTimeNumber(groups[1])}`;
};

export const getShortViews = (views = 0) => {
  return views > 1000 ? `${parseInt((+views / 1000), 10)}k` : `${views}`;
};

export const getFormatedDate = (publishedAt = '') => {
  const date = moment(publishedAt);

  if (date.isValid()) {
    return `${date.format('DD')} de ${date.format('MMMM')} de ${date.format('YYYY')}`;
  }

  return '';
};

const getVideosObject = (i = {}) => {
  if (!i.snippet || !i.id || !i.statistics || !i.contentDetails) {
    return {};
  }

  return {
    url: `${APP.YOUTUBE.EMBED_URL}/${i.id}`,
    title: i.snippet.title,
    description: backSlashToBreakLine(i.snippet.description),
    thumbnail: getBestThumbnail(i.snippet.thumbnails),
    viewsFull: i.statistics.viewCount,
    viewsShort: getShortViews(i.statistics.viewCount),
    duration: getVideoDuration(i.contentDetails.duration),
    publishedAt: getFormatedDate(i.snippet.publishedAt),
  };
};

const getUrl = (routeName = 'playlistItems') => {
  if (routeName === 'playlistItems') {
    return `${APP.YOUTUBE.URL}/${routeName}?key=${APP.YOUTUBE.KEY}&playlistId=${APP.YOUTUBE.PLAYLIST_ID}`;
  } else if (routeName === 'search') {
    return `${APP.YOUTUBE.URL}/${routeName}?key=${APP.YOUTUBE.KEY}&channelId=${APP.YOUTUBE.CHANNEL_ID}`;
  }

  return `${APP.YOUTUBE.URL}/${routeName}?key=${APP.YOUTUBE.KEY}`;
};

const request = (config) => {
  return axios(config);
};

const getPlaylistItems = (params = {}) => {
  const playlistItemsParams = Object.assign({}, defaultParams.playlistItems, params);
  const url = `${getUrl('playlistItems')}&${objParamToStringQueryParam(playlistItemsParams)}`;

  return request({ url });
};

const getSearchedItems = (params = {}) => {
  const searchedItemsParams = Object.assign({}, defaultParams.searchedItems, params);
  const url = `${getUrl('search')}&${objParamToStringQueryParam(searchedItemsParams)}`;

  return request({ url });
};

const getVideos = (params = {}) => {
  const videosParams = Object.assign({}, defaultParams.videos, params);
  const url = `${getUrl('videos')}&${objParamToStringQueryParam(videosParams)}`;

  return request({ url });
};

class Youtube {
  constructor() {
    this.pageToken = {};
  }

  getVideos(params = {}) {
    return getPlaylistItems(params).then((res = {}) => {
      const items = res.data.items;
      const reqs = items.map((i) => {
        return getVideos({ id: i.contentDetails.videoId });
      });

      this.pageToken.nextPageToken = res.data.nextPageToken;

      return Promise.all(reqs).then((resolveds = {}) => {
        return resolveds.map((r, i) => {
          return getVideosObject(Object.assign({}, items[i], r.data.items[0]));
        });
      });
    });
  }

  getMoreVideos(params = {}) {
    if (this.pageToken.nextPageToken) {
      const newParams = Object.assign({}, params, {
        pageToken: this.pageToken.nextPageToken,
      });

      return newParams.q ? this.searchVideos(newParams) : this.getVideos(newParams);
    }

    return Promise.resolve([]);
  }

  searchVideos(params = {}) {
    return getSearchedItems(params).then((res = {}) => {
      const items = res.data.items;
      const reqs = items.map((i) => {
        return getVideos({ id: i.id.videoId });
      });

      this.pageToken.nextPageToken = res.data.nextPageToken;

      return Promise.all(reqs).then((resolveds = {}) => {
        return resolveds.map((r, i) => {
          return getVideosObject(Object.assign({}, items[i], r.data.items[0]));
        });
      });
    });
  }
}

export default new Youtube();
