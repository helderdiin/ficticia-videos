<template>
  <div id="dropdown-menu">
    <div class="content">
      <div class="content__arrow--wrapper">
        <div class="arrow--wrapper__arrow"></div>
      </div>
      <div class="content__menu">
        <div class="menu__item" v-for="item in items" @click="itemSelected(item)">
          <div class="item__icon">
            <span class="glyphicon" :class="item.icon" aria-hidden="true"></span>
          </div>
          <div class="item__text">
            <span> {{item.title}} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown-menu',
  props: ['items'],
  methods: {
    itemSelected: function itemSelected(item = {}) {
      this.$emit('itemSelected', item);
    },
  },
};
</script>

<style lang="scss">

.content {
  position: absolute;
  top: 42px;
  right: 0;
  width: 250px;
  margin: 0 auto;
  z-index: 1;
}

.content__menu {
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 10px 0;
}

.content__arrow--wrapper {
  position: relative;
  height: 8px;
}

.arrow--wrapper__arrow {
  position: absolute;
  right: 15px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 9px solid #fff;
}

.menu__item {
  margin: 0 10px;
  padding: 0 10px;
  border-radius: 5px;
  width: 230px;
  height: 40px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}

.item__text {
  float: left;
  font-weight: 700;
  display: block;
  padding: 0 10px;
  line-height: 38px;
  & span {
    text-decoration: none;
    color: rgba( 0, 0, 0, 0.4);
  }
}

.item__icon {
  color: #a8395c;
  padding: 0 5px;
  float: left;
  line-height: 40px;
}

</style>
