<template>
  <div class="message">
    <label for="message">留言内容: </label>
    <textarea id="message" :value="value" @input="handleInput" placeholder="请输入留言内容" ref="message"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'vTextarea',
    props: {
      value: {
        type: [String,Number],
        default: ''
      }
    },
    methods: {
      handleInput($event){
        this.$emit('input',$event.target.value)
      },
      focus() {
        this.$refs.message.focus()
      }
    }
  }
</script>

<style scoped lang="scss">
  .message {
    display: flex;
    margin-bottom: 4vh;
    label {
      flex:1.5;
      text-align: right;
      margin-right: 2vh;
    }
    textarea {
      flex: 8.5;
      border: solid 1px #ccc;
      outline: none;
      height: 100px;
      border-radius: 4px;
      padding: 6px 6px;
      &:focus {
        box-shadow: 0  0  4px 0 rgba(62, 98, 204, .6);
      }
    }
  }
</style>
