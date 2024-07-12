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
import { MaskInput } from 'vue-3-mask';
export default{
  data() {
    return {
      email: '',
      number: '',
      errorMessage: '',
      mask: '######'
    };
  },
  components:{
    MaskInput
  },
  methods:{
    handleSubmit(){
      this.number = this.number.replace(/-/g,'')
      this.$emit('send', { email: this.email, number: this.number })
    },
  }
}
  
</script>

<style lang="scss" scoped>

</style>