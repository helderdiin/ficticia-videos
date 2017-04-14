<template>
  <div class="mais-videos">
    <div class="mais-videos__lista-videos">
      <div class="lista-videos__titulo">
        <h2>+ Vídeos</h2>
      </div>
      <div class="lista-videos__conteudo">
        <div class="conteudo__items-wrapper style-scroll">
          <video-preview :videos="videos" @updateSelectedVideo="setSelectedVideo"></video-preview>
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
import VideoPreview from '../videoPreview';

import youtube from '../youtube';

export default {
  name: 'mais-videos',
  components: { VideoPreview },
  methods: {
    getVideos: function getVideos() {
      youtube.getVideos({
        maxResults: 4,
      }).then((items = []) => {
        this.videos = [...this.videos, ...items];
        this.setSelectedVideo(this.videos[0]);
      });
    },
    carregarMaisVideos: function carregarMaisVideos() {
      this.toggleCarregandoMaisVideos();

      youtube.getMoreVideos({
        maxResults: 4,
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

<style lang="scss" scoped>

.lista-videos__conteudo {
  margin-bottom: 30px;
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
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  & img {
    width: 100%;
    max-height: 120px;
  }
}

.infos__views {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 700;
}

.views__icon {
  float: left;
  font-size: 20px;
}

.infos__text {
  float: left;
  margin-left: 5px;
  line-height: 22px;
}

.infos__titulo {
  width: 100%;
  height: 80px;
  & h4 {
    display: -webkit-box;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
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

.img__duration {
  color: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 17%;
  font-weight: 700;
  font-size: 10px;
  padding: 1px 3px;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  margin: 0 4px 4px 0;
  border-radius: 5px;
}

</style>
