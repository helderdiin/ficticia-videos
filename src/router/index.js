import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import TodosVideos from '@/components/TodosVideos';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/todosVideos',
      name: 'TodosVideos',
      component: TodosVideos,
    },
  ],
});
