<template>
  <UserForm @send="searchUser"/>
  {{ message }}
  <div class="user-card" v-for="user in users" :key="user.email">
    {{ user.email }} : {{ user.number }}
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from "axios";
import UserForm from "../components/UserForm.vue"
export default {
  name: "HomeView",
  components: {
    UserForm
  },
  setup() {
    const message = ref('');
    const users = ref([]);
    let cancelTokenSource = null;

    const searchUser = async (data) => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Operation canceled due to new request.');
      }
      cancelTokenSource = axios.CancelToken.source();
      try {

        message.value = 'Загрузка';
        const response = await axios.post('http://localhost:3000/search', {
          email: data.email,
          number: data.number
        },{
          cancelToken: cancelTokenSource.token
        });
        
        users.value = response.data;
        message.value = '';
        if (users.value.length === 0) {
          message.value = 'Нет пользователей с такими данными!';
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          
        }else{
          message.value = 'Ошибка запроса: ' + error;
        }
        
      }
    };

    return {
      message,
      users,
      searchUser
    };
  }
};
</script>
