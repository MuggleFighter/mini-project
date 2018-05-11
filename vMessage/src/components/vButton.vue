<template>
  <button :disabled="disabled" :style="style" @click="handleClick"><slot>按钮</slot></button>
</template>

<script>
  export default {
    name: 'vButton',
    props: {
      color: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      style(){
        return {backgroundColor: this.color}
      }
    },
    methods: {
        handleClick(){
          this.$emit('click')
        }
    }
  }
</script>

<style scoped lang="scss">
  button {
    position: relative;
    outline: none;
    border: none;
    background: #6cabff;
    color: #fff;
    border-radius: 4px;
    padding: 4px;
    font-size: 14px;
    align-self: flex-end;
    cursor: pointer;
    &[disabled]:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, .6);
      cursor: default;
    }
  }
</style>
