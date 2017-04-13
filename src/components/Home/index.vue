<template>
  <div class="home">
    <destaque :video="videos[0]" class="col-xs-7"></destaque>
    <div class="lista-videos col-xs-5">
      <div class="lista-videos__titulo">
        <h2>+ Vídeos</h2>
      </div>
      <div class="lista-videos__conteudo">
        <div class="conteudo__item" v-for="video in videos">
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

export default {
  name: 'home',
  components: { Destaque },
  methods: {
    getVideos: function getVideos() {
      youtube.getVideosData({
        maxResults: 20,
      }).then((items = []) => {
        this.videos = items.map((i) => {
          return {
            url: `${APP.YOUTUBE.EMBED_URL}/${i.id}`,
            title: i.snippet.title,
            description: backSlashToBreakLine(i.snippet.description),
            thumbnail: getBestThumbnail(i.snippet.thumbnails),
            views: i.statistics.viewCount,
          };
        });
      });
    },
  },
  created() {
    this.getVideos();
  },
  data() {
    return {
      videos: [],
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
}

.item__infos {
  padding: 0 5px;
  height: 100%;
}

.item__img {
  padding: 0;
  & img {
    width: 100%;
  }
}

.infos__views {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: rgba(0, 0, 0, 0.2);
}

.views__icon {
  float: left;
  font-size: 20px;
}

.infos__text {
  float: left;
  margin-left: 5px;
}

</style>
