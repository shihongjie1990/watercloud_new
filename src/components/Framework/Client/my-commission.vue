<template>
  <div class="my-commission">
    <table class="commission-table">
      <thead>
        <tr>
          <td>
            <div>序号</div>
          </td>
          <td>
            <div>待办事项</div>
          </td>
          <td>
            <div>提交时间</div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 5"
            :key="item">
          <td>1</td>
          <td>
            <div>李四的应用申请</div>
          </td>
          <td>2019-07-25 16:44:21</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.my-commission {
  background: #fff;
  table.commission-table {
    text-align: center;
    thead {
      line-height: 35px;
      td:first-child > div {
        width: 0.3rem;
      }
      td:nth-child(2) > div {
        width: 1.5rem;
      }
      td:last-child > div {
        width: 1.2rem;
      }
    }
    tbody {
      line-height: 28px;
    }
  }
}
</style>
