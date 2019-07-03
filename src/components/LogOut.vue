<template>
  <div>
    <button @click="signOut">log out</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { firebase } from '@/config/firebase';

  @Component
export default class LogOut extends Vue {
  signOut(): void {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
    });
  }
}
</script>
