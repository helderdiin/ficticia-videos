<template>
  <div class="home">
    <destaque :video="videos[0]" class="col-xs-7"></destaque>
    <div class="lista-videos col-xs-5">
      <div class="lista-videos__titulo">
        <h2>+ Vídeos</h2>
      </div>
      <div class="lista-videos__conteudo">
        <div class="conteudo__item">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Destaque from './destaque';
import youtube from '../youtube';
import { backSlashToBreakLine } from '../../utils';

export default {
  name: 'home',
  components: { Destaque },
  methods: {
    getVideos: function getVideos() {
      youtube.getVideos({
        maxResults: 20,
      }).then((res = {}) => {
        const response = res.data;
        const items = response.items;

        this.videos = items.map((i) => {
          return {
            url: `https://www.youtube.com/embed/${i.contentDetails.videoId}`,
            title: i.snippet.title,
            description: backSlashToBreakLine(i.snippet.description),
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
  padding: 15px 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-top: 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
}

.lista-videos__titulo {
  height: auto;
  margin-top: 30px;
}

</style>
