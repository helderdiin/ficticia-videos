<template>
  <div class="todos-videos col-xs-12">
    <!-- use the modal component, pass in the prop -->
    <modal-component :video="selectedVideo" v-if="showModal" @close="toggleShowModal"></modal-component>
    <div class="todos-videos__titulo">
      <h2>Todos os vídeos do Canal</h2>
    </div>
    <div class="todos-videos__conteudo">
      <div class="conteudo__video-preview">
        <video-preview :videos="videos" :itemSize="4" @updateSelectedVideo="updateSelectedVideo"></video-preview>
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
import ModalComponent from '../modalComponent';

import youtube from '../youtube';

export default {
  name: 'todos-videos',
  components: { VideoPreview, ModalComponent },
  methods: {
    getVideos: function getVideos() {
      youtube.getVideos({
        maxResults: 12,
      }).then((items = []) => {
        this.videos = items;
        this.setSelectedVideo(this.videos[0]);
      });
    },
    searchVideos: function searchVideos(q = '') {
      youtube.searchVideos({
        maxResults: 12,
        q,
      }).then((items = []) => {
        this.videos = items;
        this.setSelectedVideo(this.videos[0]);
      });
    },
    carregarMaisVideos: function carregarMaisVideos() {
      this.toggleCarregandoMaisVideos();

      youtube.getMoreVideos({
        maxResults: 12,
        q: this.q,
      }).then((items = []) => {
        this.toggleCarregandoMaisVideos();
        this.videos = [...this.videos, ...items];
      });
    },
    toggleCarregandoMaisVideos: function toggleCarregandoMaisVideos() {
      this.carregandoMaisVideos = !this.carregandoMaisVideos;
    },
    setSelectedVideo: function setSelectedVideo(video = {}) {
      this.selectedVideo = video;
    },
    toggleShowModal: function toggleShowModal() {
      this.showModal = !this.showModal;
    },
    updateSelectedVideo: function updateSelectedVideo(video = {}) {
      this.setSelectedVideo(video);
      this.toggleShowModal();
    },
  },
  created() {
    this.q = this.$route.params.q;

    if (this.$route.params.q) {
      this.searchVideos(this.$route.params.q);
    } else {
      this.getVideos();
    }

    this.eventHub.$on('searchVideos', (q = '') => {
      this.searchVideos(q);
    });
  },
  data() {
    return {
      videos: [],
      carregandoMaisVideos: false,
      q: '',
      showModal: false,
      selectedVideo: {},
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
