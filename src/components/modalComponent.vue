<template>
  <div id="modal-component">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="container__close-button">
              <button class="modal-default-button" @click="closeModal">
                X
              </button>
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
              <div class="conteudo-video__infos style-scroll" @click="toggleInfosVideo">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'modal-component',
  props: {
    video: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    closeModal: function closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">

.container__close-button {
  height: 30px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 40%;
  height: 520px;
  margin: 5% auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.destaque__titulo {
  height: auto;
  margin-top: 30px;
}

.conteudo-video__video {
  height: 270px;
}

.conteudo-video__infos {
  padding: 5px 10px;
  position: relative;
  margin-top: 20px;
  height: 160px;
  overflow-x: hidden;
  &:hover {
    cursor: pointer;
  }
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
