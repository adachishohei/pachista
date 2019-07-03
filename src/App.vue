<template>
  <div id="app">
    <div v-if="isLogin">
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <LogOut></LogOut>
        <router-view/>
      </div>
    </div>
    <div v-else>
      <div id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { firebase, ui, uiConfig } from '@/config/firebase';
import LogOut from '@/components/LogOut.vue';

  @Component({
    components: { LogOut },
  })
export default class App extends Vue {
    isLogin: boolean = false;

    created(): void {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
          ui.start('#firebaseui-auth-container', uiConfig);
        }
      });
    }

    static updated(): void {
      ui.start('#firebaseui-auth-container', uiConfig);
    }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
