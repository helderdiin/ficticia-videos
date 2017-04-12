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

export default {
  name: 'home',
  components: { Destaque },
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
