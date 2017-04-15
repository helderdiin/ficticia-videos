<template>
  <div class="home">
    <destaque :video="videoDestaque" class="col-xs-7"></destaque>
    <mais-videos class="col-xs-5" @updateSelectedVideo="setVideoDestaque"></mais-videos>
  </div>
</template>

<script>
import Destaque from './destaque';
import MaisVideos from './maisVideos';

export default {
  name: 'home',
  components: { Destaque, MaisVideos },
  methods: {
    setVideoDestaque: function setVideoDestaque(video = {}) {
      this.videoDestaque = video;
    },
  },
  data() {
    return {
      videoDestaque: {},
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
