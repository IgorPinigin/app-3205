<template>
  <UserForm @send="searchUser"/>
  {{ message }}
  <div class="user-card" v-for="user in users">
    {{ user.email }} : {{ user.number }}
  </div>
</template>

<script>

import axios from "axios";
import UserForm from "../components/UserForm.vue"
export default {
  name: "HomeView",
  components: {
    UserForm
  },
  data(){
    return{
      message: '',
      users: []
    }
  },
  methods:{
    async searchUser(data){
      try {
        const response = await axios.post('http://localhost:3000/search', {
          email: data.email,
          number: data.number
        });
        this.users = []
        for (let i = 0; i < response.data.length; i++) {
          this.users.push({
            email: response.data[i].email,
            number: response.data[i].number
          })
        }
        if(this.users.length == 0){
          this.message = 'Нет пользователей с такими данными!'
        }
      } catch (error) {
        this.message = 'Ошибка запроса';
      }
    }
  }
};
</script>
