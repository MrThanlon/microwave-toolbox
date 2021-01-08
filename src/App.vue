<template>
  <div id="app" class="m-0 m-md-3">
    <div class="d-flex justify-content-center">
      <button class="btn btn-outline-primary m-2" @click="$router.push('/match')">
        匹配工具箱
      </button>
      <button class="btn btn-outline-success m-2" @click="$router.push('/smith')">
        Smith圆图工具
      </button>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
