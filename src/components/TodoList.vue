<template>
  <div>
    <ul id="todo">
      <li class="todo-list" v-bind:key="todo.id" v-for="todo in todoList">
        <span>{{todo.data.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
export default class TodoList extends Vue {
    @Prop() private todoList: string[] = []
}
</script>

<style scoped>

</style>
