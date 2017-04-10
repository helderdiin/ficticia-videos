<template>
  <div class="home">
    <!-- Conteúdo vídeo em destaque -->
    <div class="destaque col-xs-7">
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
            :src="videos[0].url">
          </iframe>
        </div>
        <div class="conteudo-video__infos">
          <div class="infos__titulo">
            <div class="titulo__texto">
              <h4> {{videos[0].title}} </h4>
            </div>
            <div class="titulo__icones">
              <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
            </div>
          </div>
          <div class="infos__desc">
            {{videos[0].description}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      videos: [{
        title: 'Teste de vídeo em destaque por que é legal',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum blandit elit, nec efficitur risus suscipit eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec fringilla elit sem, nec vestibulum sapien ultrices nec. Phasellus id ex enim. Nulla at scelerisque augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec auctor laoreet tortor et venenatis. Donec volutpat sollicitudin sagittis.',
        url: 'https://www.youtube.com/embed/DsuTwV0jwaY',
        views: 123,
        creationDate: 1491844609961,
      }, {
        title: 'Teste2',
        url: 'https://www.youtube.com/watch?v=iGmVQlATHkk',
        views: 321,
        creationDate: 1491844608951,
      }],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
}

.infos__desc {
  text-align: justify;
}

.infos__titulo {
  overflow: hidden;
}

.titulo__texto {
  float: left;
}

.titulo__icones {
  float: right;
  padding: 11px;
  font-size: 18px;
  color: #5fbdd5;
  & span:first-child {
    margin-right: 5px;
  }
}

</style>
