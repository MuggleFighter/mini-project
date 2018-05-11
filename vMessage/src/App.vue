<template>
  <div id="app">
    <div class="input-area">
      <v-input v-model="username"></v-input>
      <v-textarea v-model="message" ref="message"></v-textarea>
      <v-button :disabled="!username || !message" @click="handleSubmit" >提交</v-button>
    </div>
    <list class="list" :list="list" @onReply="handleReply" @onDelete="handleDelete"></list>
  </div>
</template>

<script>
  import vInput from './components/vInput'
  import vTextarea from './components/vTextarea'
  import vButton from './components/vButton'
  import list from './components/list'

  export default {
    name: 'App',
    components: {
      vInput,
      vTextarea,
      vButton,
      list
    },
    data() {
      return {
        username: '',
        message: '',
        list: [
          {
            username: '小张',
            message: '请问学习前端开发有什么好方法吗'
          },
          {
            username: '小明',
            message: '看书'
          },
          {
            username: '小刚',
            message: '看视频'
          }
        ],
      }
    },
    methods: {
      handleSubmit() {
        if(!this.username || !this.message) return
        let username = this.username
        let message = this.message
        let isNew = true
        this.isNew = true
        this.list.push({username,message,isNew})
        this.message = ''
      },
      handleReply(username){
        this.message = `回复@${username}: `
        this.$refs.message.focus()
      },
      handleDelete(index) {
        this.list.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>

  #app {
    width: 600px;
    margin: 0 auto;
    .input-area{
      display: flex;
      flex-direction: column;

    }
    .list {
      margin-top: 12vh;
    }
  }
</style>
