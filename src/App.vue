<template>
  <div id="app">
    <nav class="app__navbar navbar-default">
      <div class="navbar__container-fluid row">
        <div class="col-xs-offset-1 col-xs-10">
          <div class="container-fluid__logo-wrapper col-xs-2">
            <a class="container-fluid__logo" href="/home">
              <img alt="Brand" src="./assets/images/logo.png">
            </a>
          </div>
          <div class="container-fluid__menu col-xs-offset-8 col-xs-2">
            <div class="pull-right">
              <a href="javascript:void(0);">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
              </a>
              <a href="javascript:void(0);">
                <span>Menu</span>
                <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="col-xs-offset-1 col-xs-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

html {
  font-family: 'Ubuntu', sans-serif;
}

.app__navbar {
  background-color: #a8395c;
  border-radius: 0px;
  border: 0px;
}

.container-fluid__menu {
  line-height: 50px;
  font-size: 17px;
  & a {
    color: #fff;
    text-decoration: none;
    &:first-child {
      margin-right: 20px;
    }
  }
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

</style>
