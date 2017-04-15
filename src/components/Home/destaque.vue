<template>
  <div class="destaque">
    <div class="destaque__titulo">
      <h2>Vídeo em destaque</h2>
    </div>
    <div class="destaque__conteudo-video">
      <div class="conteudo-video__video">
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
          :src="video.url">
        </iframe>
      </div>
      <div class="conteudo-video__infos" @click="toggleInfosVideo" :class="{ 'conteudo-video__infos--closed': infosVideoClosed }">
        <div class="infos__titulo">
          <div class="titulo__texto">
            <h4 :title="video.title"> {{video.title}} </h4>
          </div>
          <div class="titulo__icones">
            <span class="glyphicon glyphicon-time" :title="video.publishedAt" aria-hidden="true"></span>
            <span class="glyphicon glyphicon-eye-open" :title="video.viewsFull + ' views'" aria-hidden="true"></span>
          </div>
        </div>
        <div v-html="video.description" class="infos__desc"></div>
        <div class="infos__gradient" :class="{ 'infos__gradient--visible': infosVideoClosed }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'destaque',
  props: {
    video: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    toggleInfosVideo: function toggleInfosVideo() {
      this.infosVideoClosed = !this.infosVideoClosed;
    },
  },
  data() {
    return {
      infosVideoClosed: true,
    };
  },
};
</script>

<style lang="scss" scoped>

.destaque__titulo {
  height: auto;
  margin-top: 30px;
}

.conteudo-video__video {
  height: 350px;
}

.destaque__conteudo-video {
  margin-top: 30px;
}

.conteudo-video__infos {
  padding: 15px 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-top: 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
  position: relative;
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
  }
}

.conteudo-video__infos--closed {
  height: 224px;
  overflow: hidden;
}

.infos__gradient--visible {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(transparent, white);
  height: 160px;
}

.infos__desc {
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
}

.infos__titulo {
  overflow: hidden;
}

.titulo__texto {
  float: left;
  width: 85%;
  & h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.titulo__icones {
  float: right;
  width: 15%;
  padding: 11px;
  font-size: 18px;
  color: #5fbdd5;
  padding-right: 0;
  & span {
    float: right;
  }
  & span:last-child {
    margin-right: 5px;
  }
}

</style>
