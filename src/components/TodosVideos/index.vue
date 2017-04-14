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
import VideoPreview from '../videoPreview';

import youtube from '../youtube';

export default {
  name: 'todos-videos',
  components: { VideoPreview },
  methods: {
    getVideos: function getVideos() {
      youtube.getVideos({
        maxResults: 12,
      }).then((items = []) => {
        this.videos = [...this.videos, ...items];
        this.setSelectedVideo(this.videos[0]);
      });
    },
    carregarMaisVideos: function carregarMaisVideos() {
      this.toggleCarregandoMaisVideos();

      youtube.getMoreVideos({
        maxResults: 12,
      }).then((items = []) => {
        this.toggleCarregandoMaisVideos();
        this.videos = [...this.videos, ...items];
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
