<template>
  <div class="username">
    <label for="username">昵称: </label>
    <input type="text" id="username" :value="value" @input="handleInput">
  </div>
</template>

<script>
  export default {
    name: 'vInput',
    props: {
      value: {
        type: [String,Number],
        default: ''
      }
    },
    methods: {
      handleInput($event){
        this.$emit('input',$event.target.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  .username {
    display: flex;
    margin:4vh 0;
    label {
      flex:1.5;
      text-align: right;
      margin-right: 2vh;
    }
    input {
      flex: 8.5;
      border: solid 1px #ccc;
      outline: none;
      border-radius: 4px;
      padding: 6px 6px;
      &:focus {
        box-shadow: 0  0  4px 0 rgba(62, 98, 204, .6);
      }
    }
  }
</style>
