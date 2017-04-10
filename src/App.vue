<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="/home">
            <img alt="Brand" src="./assets/images/logo.png">
          </a>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

#app {
  font-family: 'Ubuntu', sans-serif;
}

.navbar {
  background-color: #a8395c;
  border-radius: 0px;
  border: 0px;
}

.navbar-brand {
  width: 200px;
  padding: 7px;
  & img {
    width: 100%;
  }
}

</style>
