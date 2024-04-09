<template>
  <el-container>

    <el-container>
      <el-aside width="300px" style="height: 100%;">
        <el-row class="tac">
          <el-menu :default-active="active" router="" mode="vertical" class="el-menu-vertical-demo" background-color="#d3dce6"
            text-color="#282c34" active-text-color="#409eff" style="padding: 0%;">

            <el-menu-item v-for="item in letterList" :key="item.id" :index="item.id" :route="`/letter/chat/${item.id}`"
              style="padding: 0%;">
              <i class="el-icon-pie-chart"></i>
              <span v-if="item.userA_name === headers.user_name">{{ item.userB_name }}</span>
              <span v-else>{{ item.userA_name }}</span>
            </el-menu-item>



          </el-menu>
        </el-row>
      </el-aside>
      <el-main>
        <router-view :key="$route.path" :chat_id="active" ></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
export default {
  props:["chatId"],
  data() {
    return {
      // letterList
      letterList: [],
      //用户信息
      headers: {},
      active: window.sessionStorage.getItem("active"),
    };
  },
  created() {
    this.headers.user_id = window.sessionStorage.getItem("user_id");
    this.headers.user_name = window.sessionStorage.getItem("user_name");
    this.active = parseInt(this.chatId);
    this.getLetterList();
  },
  methods: {
    // 获取信件列表
    async getLetterList() {
      const { data: res } = await this.$http.get(`letter/QueryLetterByUserId/${this.headers.user_id}`)
      console.log("letterList res", res)
      if (res.state !== 200) {
        this.$message.error(res.message);
        return;
      }
      this.letterList = res.data;
    },
  },
}
</script>

<style scope></style>
