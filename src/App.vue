<template>
  <div id="app">
    <div key="login" v-if="userStatus">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <LogOut></LogOut>
      <router-view/>
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
import store from '@/store';

  @Component({
    components: { LogOut },
  })
export default class App extends Vue {
  created(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', true);
      } else {
        store.commit('onAuthStateChanged', {});
        store.commit('onUserStatusChanged', false);
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    });
  }

  updated(): void {
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  get user(): string {
    return this.$store.getters.user;
  }

  get userStatus(): boolean {
    return this.$store.getters.isSignedIn;
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
