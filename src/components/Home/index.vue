<template>
  <div class="home">
    <destaque :video="videoDestaque" class="col-xs-7"></destaque>
    <div class="lista-videos col-xs-5">
      <div class="lista-videos__titulo">
        <h2>+ Vídeos</h2>
      </div>
      <div class="lista-videos__conteudo">
        <div class="conteudo__items-wrapper style-scroll">
          <div class="conteudo__item" v-for="video in videos" @click="setVideoDestaque(video)">
            <div class="item__img col-xs-7">
              <img :src="video.thumbnail" />
            </div>
            <div class="item__infos col-xs-5">
              <div class="infos__titulo">
                <h4> {{video.title}} </h4>
              </div>
              <div class="infos__views">
                <div class="views__icon">
                  <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                </div>
                <div class="infos__text">
                  <span> {{video.views}} views </span>
                </div>
              </div>
            </div>
          </div>
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
  </div>
</template>

<script>
import Destaque from './destaque';
import youtube from '../youtube';
import { backSlashToBreakLine } from '../../utils';
import { APP } from '../../constants';

const getBestThumbnail = (thumbnails = {}) => {
  if (thumbnails.maxres) {
    return thumbnails.maxres.url;
  } else if (thumbnails.high) {
    return thumbnails.high.url;
  }
  return thumbnails.default.url;
};

const getVideosObject = (items = []) => {
  return items.map((i) => {
    return {
      url: `${APP.YOUTUBE.EMBED_URL}/${i.id}`,
      title: i.snippet.title,
      description: backSlashToBreakLine(i.snippet.description),
      thumbnail: getBestThumbnail(i.snippet.thumbnails),
      views: i.statistics.viewCount,
    };
  });
};

export default {
  name: 'home',
  components: { Destaque },
  methods: {
    getVideos: function getVideos() {
      youtube.getVideos({
        maxResults: 4,
      }).then((items = []) => {
        this.videos = [...this.videos, ...getVideosObject(items)];
        this.setVideoDestaque(this.videos[0]);
      });
    },
    carregarMaisVideos: function carregarMaisVideos() {
      this.toggleCarregandoMaisVideos();

      youtube.getMoreVideos({
        maxResults: 4,
      }).then((items = []) => {
        this.toggleCarregandoMaisVideos();
        this.videos = [...this.videos, ...getVideosObject(items)];
      });
    },
    toggleCarregandoMaisVideos: function toggleCarregandoMaisVideos() {
      this.carregandoMaisVideos = !this.carregandoMaisVideos;
    },
    setVideoDestaque: function setVideoDestaque(video) {
      this.videoDestaque = video;
    },
  },
  created() {
    this.getVideos();
  },
  data() {
    return {
      videos: [],
      carregandoMaisVideos: false,
      videoDestaque: {},
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.lista-videos__conteudo {
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-top: 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
}

.lista-videos__titulo {
  height: auto;
  margin-top: 30px;
}

.conteudo__item {
  height: 120px;
  margin-bottom: 15px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
}

.item__infos {
  padding: 0 5px;
  height: 100%;
}

.item__img {
  padding: 0;
  & img {
    width: 100%;
    max-height: 120px;
  }
}

.infos__views {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: rgba(0, 0, 0, 0.3);
}

.views__icon {
  float: left;
  font-size: 20px;
}

.infos__text {
  float: left;
  margin-left: 5px;
}

.infos__titulo {
  & h4 {
    margin: 0;
  }
}

.conteudo__carregar-mais {
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 15px;
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

.conteudo__items-wrapper {
  height: 525px;
  overflow-x: hidden;
}

</style>
