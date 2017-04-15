<template>
  <div class="video-preview">
    <div class="conteudo__item" :class="'col-xs-' + itemSize" v-for="video in videos" @click="setSelectedVideo(video)">
      <div class="item__img col-xs-7">
        <img :src="video.thumbnail" />
        <span class="img__duration"> {{video.duration}} </span>
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
            <span> {{video.viewsShort}} views </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'video-preview',
  props: {
    videos: {
      type: Array,
      default() {
        return [];
      },
    },
    itemSize: {
      type: Number,
      default() {
        return 12;
      },
    },
  },
  methods: {
    setSelectedVideo: function setSelectedVideo(video = {}) {
      this.$emit('updateSelectedVideo', video);
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

.conteudo__item {
  height: 120px;
  margin-bottom: 15px;
  position: relative;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
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

.item__infos {
  padding: 0 5px;
  height: 100%;
}

.infos__titulo {
  width: 100%;
  height: 80px;
  word-wrap: break-word;
  & h4 {
    display: -webkit-box;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
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

</style>
