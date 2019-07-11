<template>
  <div id="app">
    <div v-if="_userStatus">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <button @click="doLogout" type="button">LogOut</button>
      <router-view/>
      <input type="text" v-model="title"/>
      <button @click="addTodo(title)">追加</button>
      <TodoList v-bind:todoList="this.todoList"></TodoList>
    </div>
    <div v-else>
      <div id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import Firebase from '@/config/firebase';
import TodoList from '@/components/TodoList.vue';

  import DocumentData = firebase.firestore.DocumentData;

  @Component({
    components: { TodoList },
    computed: {
      _user() {
        return this.$store.getters.user;
      },
      _userStatus(): boolean {
        return this.$store.getters.isSignedIn;
      },
    },
  })
export default class App extends Vue {
    title: string = '';

    todoList: { id: string, data: DocumentData }[] = [];

    created(): void {
      Firebase.onAuth();
    }

    updated(): void {
      Firebase.uiStart();
    }

    beforeMount(): void {
      this.todoList = Firebase.fetchTodo();
    }

    public addTodo() {
      Firebase.addTodo(this.title);
      this.title = '';
    }

    public doLogout() {
      Firebase.logout();
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
