<template>
  <div class="todos-videos col-xs-12">
    <div class="todos-videos__titulo">
      <h2>Todos os vídeos do Canal</h2>
    </div>
    <div class="todos-videos__conteudo">
      <div class="conteudo__video-preview">
        <video-preview :videos="videos" :itemSize="4" @updateSelectedVideo="setSelectedVideo"></video-preview>
      </div>
      <div class="conteudo__carregar-mais">
        <div class="carregar-mais__botao" :class="{ 'carregar-mais__botao--invisible': carregandoMaisVideos }" @click="carregarMaisVideos">
          <span> carregar mais vídeos... </span>
        </div>
        <div class="carregar-mais__loading" :class="{ 'carregar-mais__loading--visible': carregandoMaisVideos }">
          <span class="glyphicon glyphicon-refresh gly-spin"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import VideoPreview from '../videoPreview';

import youtube from '../youtube';
import { backSlashToBreakLine, normalizeTimeNumber } from '../../utils';
import { APP } from '../../constants';


const getBestThumbnail = (thumbnails = {}) => {
  if (thumbnails.maxres) {
    return thumbnails.maxres.url;
  } else if (thumbnails.high) {
    return thumbnails.high.url;
  }
  return thumbnails.default.url;
};

const getGroups = (duration = '') => {
  const regexpMS = /PT(\d+)M(\d+)S/;
  const regexpM = /PT(\d+)M/;
  const regexpS = /PT(\d+)S/;

  if (duration.match(/[M][S]/g)) {
    return regexpMS.exec(duration);
  } else if (duration.match(/[M]/g)) {
    return regexpM.exec(duration);
  }

  return regexpS.exec(duration);
};

const getVideoDuration = (duration = '') => {
  const groups = getGroups(duration);

  return `${normalizeTimeNumber(groups[1])}:${normalizeTimeNumber(groups[2])}`;
};

const getShortViews = (views = 0) => {
  return views > 1000 ? `${parseInt((+views / 1000), 10)}k` : views;
};

const getFormatedDate = (publishedAt = '') => {
  const date = moment(publishedAt);

  if (date.isValid()) {
    return `${date.format('DD')} de ${date.format('MMMM')} de ${date.format('YYYY')}`;
  }

  return '';
};

const getVideosObject = (items = []) => {
  return items.map((i) => {
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
  });
};

export default {
  name: 'todos-videos',
  components: { VideoPreview },
  methods: {
    getVideos: function getVideos() {
      youtube.getVideos({
        maxResults: 12,
      }).then((items = []) => {
        this.videos = [...this.videos, ...getVideosObject(items)];
        this.setSelectedVideo(this.videos[0]);
      });
    },
    carregarMaisVideos: function carregarMaisVideos() {
      this.toggleCarregandoMaisVideos();

      youtube.getMoreVideos({
        maxResults: 12,
      }).then((items = []) => {
        this.toggleCarregandoMaisVideos();
        this.videos = [...this.videos, ...getVideosObject(items)];
      });
    },
    toggleCarregandoMaisVideos: function toggleCarregandoMaisVideos() {
      this.carregandoMaisVideos = !this.carregandoMaisVideos;
    },
    setSelectedVideo: function setSelectedVideo(video = {}) {
      this.$emit('updateSelectedVideo', video);
    },
  },
  created() {
    this.getVideos();
  },
  data() {
    return {
      videos: [],
      carregandoMaisVideos: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.todos-videos__conteudo {
  margin-top: 30px;
  margin-bottom: 30px;
}

.todos-videos__titulo {
  height: auto;
  margin-top: 30px;
}

.conteudo__video-preview {
  overflow: hidden;
}

.conteudo__carregar-mais {
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 15px;
  width: 40%;
  margin: 0 auto;
}

.carregar-mais__botao {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px 0;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
  & span {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
  }
}

.carregar-mais__loading {
  display: none;
  padding: 5px 0;
  border: 1px solid rgba(0, 0, 0, 0);
}

.carregar-mais__loading--visible {
  display: block;
}

.carregar-mais__botao--invisible {
  display: none;
}

</style>
