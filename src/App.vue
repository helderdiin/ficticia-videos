<template>
  <div id="app">
    <nav class="app__navbar navbar-default">
      <div class="container-fluid navbar__container-fluid">
        <div class="row">
          <div class="container-fluid__conteudo col-xs-offset-1 col-xs-10">
            <div class="container-fluid__logo-wrapper col-xs-2">
              <a class="container-fluid__logo" href="/#/">
                <img alt="Brand" src="./assets/images/logo.png">
              </a>
            </div>
            <div class="container-fluid__topbar col-xs-offset-6 col-xs-4">
              <div class="pull-right">
                <div class="topbar__menu" @click="toggleMenu">
                  <div class="menu__text">
                    <span> Menu </span>
                  </div>
                  <div class="menu__icon">
                    <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                  </div>
                </div>
                <div class="topbar__pesquisa">
                  <div class="pesquisa__conteudo-wrapper" v-if="searchOpen">
                    <div class="pesquisa__input">
                      <input @keyup="searchVideo">
                    </div>
                    <div class="pesquisa__icon">
                      <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </div>
                  </div>
                  <div class="pesquisa__search-icon" v-if="!searchOpen" @click="toggleSearch">
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </div>
                </div>
                <dropdown-menu :items="menuItems" v-if="menuOpen" @itemSelected="itemSelected"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="app__conteudo col-xs-offset-1 col-xs-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import DropdownMenu from './components/dropdownMenu';

const menuItems = [{
  title: 'Destaque',
  id: 'destaque',
  icon: 'glyphicon-star',
  path: '/',
}, {
  title: 'Vídeos',
  id: 'videos',
  icon: 'glyphicon-play',
  path: 'todosVideos',
}];

export default {
  name: 'app',
  components: { DropdownMenu },
  methods: {
    itemSelected: function itemSelected(item = {}) {
      this.toggleMenu();

      if (item.path) {
        this.$router.push(item.path);
      }
    },
    toggleMenu: function toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    toggleSearch: function toggleSearch() {
      this.searchOpen = !this.searchOpen;
    },
    searchVideo: function searchVideo(e = {}) {
      const q = e.target.value;

      if (q.length > 3) {
        this.$router.push({
          name: 'TodosVideos',
          params: { q },
        });

        this.eventHub.$emit('searchVideos', q);
      }
    },
  },
  data() {
    return {
      menuOpen: false,
      searchOpen: false,
      menuItems,
    };
  },
};
</script>

<style lang="scss">
@import './styles/style.scss';

.app__navbar {
  background-color: #a8395c;
  border-radius: 0px;
  border: 0px;
}

.app__conteudo,
.container-fluid__conteudo {
  padding: 0;
}

.container-fluid__topbar {
  font-size: 16px;
  color: #fff;
  text-decoration: none;
}

.container-fluid__logo-wrapper {
  padding: 8px;
}

.container-fluid__logo {
  padding: 0px;
  height: auto;
  & img {
    width: 100%;
  }
}

.topbar__pesquisa {
  float: right;
  width: 225px;
  padding: 10px 0;
  margin-right: 15px;
  line-height: 26px;
  box-sizing: border-box;
}

.pesquisa__conteudo-wrapper {
  border: 1px solid #fff;
  height: 28px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.25);
}

.pesquisa__input {
  float: left;
  padding: 0 5px;
  & input {
    background-color: transparent;
    border: none;
    &:focus {
      outline: none;
    }
  }
}

.pesquisa__icon {
  float: left;
}

.pesquisa__search-icon {
  padding-top: 2px;
  padding-right: 6px;
  float: right;
}

.topbar__menu {
  float: right;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}

.menu__icon {
  float: right;
  line-height: 50px;
}

.menu__text {
  height: 50px;
  margin-right: 10px;
  float: left;
  line-height: 47px;
}

</style>
