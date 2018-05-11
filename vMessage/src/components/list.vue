<template>
  <div>
    <template v-if="list.length">
      <div class="list-item" v-for="(item, index) in list">
        <div>
          <div class="list-username">{{item.username}}</div>
          <div class="list-message">{{item.message}}</div>
        </div>
        <div>
        <div class="list-reply"><a href="#" @click.prevent="handleReply(item)">回复</a></div>
        <div class="list-delete"><a href="#" @click.prevent="handleDelete(index)">删除</a></div>
        </div>
      </div>
    </template>
    <div class="empty-list" v-else>暂无留言</div>
  </div>
</template>

<script>
  export default {
    name: 'list',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      handleReply(item) {
        this.$emit('onReply', item.username)
      },
      handleDelete(index) {
        this.$emit('onDelete', index)
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-item {
    display: flex;
    flex-direction: column;
    border-bottom: solid 1px #ddd;
    padding: 2vh;
    opacity: .7;
    transition: opacity .4s;

    &:hover {
      opacity: 1;
    }

    & > div:first-child {
      display: flex;
      .list-username {
        flex: 1.5;
      }
      .list-message {
        flex: 8.5;
      }
    }

    & > div:last-child {
      align-self: flex-end;
      font-size: 12px;

      div {
        display: inline-block;
      }
    }

  }
  .empty-list {
    color: #ccc;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

</style>
