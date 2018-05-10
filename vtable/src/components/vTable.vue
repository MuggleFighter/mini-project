<template>
  <table>
    <thead>
    <tr>
      <template v-for="col in currentColumns">
        <th v-if="col.sortable">{{col.title}}
          <div class="sort-icons">
            <a href="#" :class="{on:col._sortType === 'asc'}" @click.prevent="handleSortByAsc(col)">↑</a>
            <a href="#" :class="{on:col._sortType === 'desc'}" @click.prevent="handleSortByDesc(col)">↓</a>
          </div>
        </th>
        <th v-else>{{col.title}}</th>
      </template>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in currentData">
      <td v-for="cell in currentColumns">{{row[cell.key]}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'vTable',
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentColumns: [],
        currentData: []
      }
    },
    methods: {
      makeColumns() {
        this.currentColumns = this.columns.map((col, index) => {
          col._sortType = 'normal'
          col._index = index
          return col
        })
      },
      makeRows() {
        this.currentData = this.data.map((row, index) => {
          row._index = index
          return row
        })
      },
      handleSortByAsc(col) {
        this.currentColumns.forEach((col) => {
          col._sortType = 'normal'
        })
        col._sortType = 'asc'
        this.currentData.sort((row1, row2) => {
          return row1[col.key] > row2[col.key] ? 1 : -1
        })
      },
      handleSortByDesc(col) {
        this.currentColumns.forEach((col) => {
          col._sortType = 'normal'
        })
        col._sortType = 'desc'
        this.currentData.sort((row1, row2) => {
          return row1[col.key] < row2[col.key] ? 1 : -1
        })
      }
    },
    mounted() {
      this.makeColumns()
      this.makeRows()
    },
    watch: {
      data() {
        this.makeRows()
        let sortedColumn = this.currentColumns.filter((col) => {
          return col._sortType !== 'normal'
        })
        if (sortedColumn.length > 0) {
          if (sortedColumn[0]._sortType === 'asc') {
            this.handleSortByAsc(sortedColumn[0])
          } else {
            this.handleSortByDesc(sortedColumn[0])
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  table {
    width: 100%;
    border-collapse: collapse;
    empty-cells: show;

    thead {
      background: #dfdfdf;
      color: #5c6b77;
      white-space: nowrap;
    }

    th, td {
      position: relative;
      padding: 8px 16px;
      border: 1px solid #e9e9e9;
      text-align: left;

      .sort-icons {
        position: absolute;
        right: 14%;
        top: 50%;
        transform: translateY(-50%);

        a {
          text-decoration: none;
          font-weight: bold;
          margin: 0 4px;
          &.on {
            color: #3399ff;
          }
          &:hover {
            color: #3399ff;
          }
          &:first-child {
            margin-left: 16px;
          }
        }
      }
    }

    tbody {
      tr:nth-child(2n) {
        background: #f7f7f7;
      }

      tr:nth-child(2n + 1) {
        background: #fff;
      }
    }

  }
</style>
