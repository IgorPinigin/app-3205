<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div class="form-group">
      <label for="number">Number:</label>
      <MaskInput id="number" v-model="number" mask="##-##-##"/>
    </div>
    <button type="submit">Search user</button>  
  </form>
  
</template>

<script>
import { ref } from 'vue';
import { MaskInput } from 'vue-3-mask';
export default {
  name: "UserForm",
  components: {
    MaskInput
  },
  setup(props, { emit }) {
    const email = ref('');
    const number = ref('');
    const errorMessage = ref('');
    const mask = ref('######');

    const handleSubmit = () => {
      number.value = number.value.replace(/-/g, '');
      emit('send', { email: email.value, number: number.value });
    };

    return {
      email,
      number,
      errorMessage,
      mask,
      handleSubmit
    };
  }
};
</script>