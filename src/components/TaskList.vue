<template>
  <v-col class="blue lighten-5">
    <v-card
      class="ma-3 d-flex flex-no-wrap justify-space-between align-center"
      v-for="item in taskList"
      :key="item.id"
      link
      @click="$router.push(`task/detail/${item.ID}`)"
    >
      <!-- <v-avatar class="ma-3 hidden-sm-and-down" size="125" tile>
        <v-img :src="item.img"></v-img>
      </v-avatar> -->

      <v-col class="">
        <v-card-title>
          <!-- 表示类型的小粉框框 -->
          <!-- <v-chip color="pink" outlined label class="mr-3 white--text">
            {{
            item.tag
            }}
          </v-chip> -->

          <div>{{ item.title }}</div>
        </v-card-title>
        <v-card-subtitle class="mt-1" v-text="item.tag"></v-card-subtitle>
        <v-card-subtitle class="mt-1" v-text="item.briefing"></v-card-subtitle>
        <!-- 时间上的那条横线 -->
        <v-divider class="mx-4"></v-divider>

        <v-card-text class="d-flex align-center">
          <div class="d-flex align-center">
            <v-icon class="mr-1" small>{{ 'mdi-calendar-month' }}</v-icon>
            <span>{{ item.CreatedAt | dateformat('YYYY-MM-DD') }}</span>
          </div>
          <div class="mx-4 d-flex align-center">
            <v-icon class="mr-1" small>{{ 'mdi-account-question' }}</v-icon>
            <span>{{ item.demander_name }}</span>
          </div>
        </v-card-text>
      </v-col>
    </v-card>
    <div class="text-center">
      <v-pagination
        color="black"
        total-visible="7"
        v-model="queryParam.pagenum"
        :length="Math.ceil(total / queryParam.pagesize)"
        @input="getArtList()"
      ></v-pagination>
    </div>
  </v-col>
</template>
<script>
export default {
  data() {
    return {
      taskList: [],
      queryParam: {
        pagesize: 5,
        pagenum: 1,
        title: ' '
      },

      count: 0,
      total: 0
    }
  },
  created() {},
  mounted() {
    this.getTaskList()
  },
  filters: {},
  methods: {
    // 获取文章列表
    async getTaskList() {
      console.log(`queryParam:${this.queryParam.pagesize}`)
      const { data: res } = await this.$http.get(`task/GetAll/${this.queryParam.pagesize}/${this.queryParam.pagenum}`,{})
      this.taskList = res.data
      this.total = res.total
      console.log("this.taskList",this.taskList)
    }
  }
}
</script>
<style lang=""></style>
