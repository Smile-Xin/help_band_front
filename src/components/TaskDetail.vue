<template>
  <div>
    <v-divider class="pa-3 ma-3"></v-divider>
    <v-alert class="ma-4" elevation="1" color="indigo" dark border="left" outlined>{{ taskInfo.title }}</v-alert>
    <v-col><v-card-text class="d-flex align-center">
        <div class="d-flex align-center">
          <v-icon class="mr-1" small>{{ 'mdi-calendar-month' }}</v-icon>
          <span>{{ taskInfo.CreatedAt | dateformat('YYYY-MM-DD') }}</span>
        </div>
        <div class="mx-4 d-flex align-center">
          <v-icon class="mr-1" small>{{ 'mdi-account-question' }}</v-icon>
          <span>{{ taskInfo.demander_name }}</span>
        </div>
      </v-card-text>
    </v-col>

    <div v-html="taskInfo.content" class="content ma-5 pa-3 text-justify"></div>

    <v-divider class="ma-5"></v-divider>
  </div>
</template>
<script>
export default {
  // 由路由传递过来的文章id
  props: ['taskId'],
  data() {
    return {
      taskInfo: {},
      commentList: [],
      comment: {
        content: ''
      },
      total: 0,
      headers: {
        username: '',
        user_id: 0
      },
      queryParam: {
        pagesize: 5,
        pagenum: 1
      }
    }
  },
  created() {
    this.getTaskInfo()
    this.headers = {
      // 登陆后上传的用户信息
      // username: window.sessionStorage.getItem('username'),
      // user_id: window.sessionStorage.getItem('user_id'),
    }
  },
  watch: {
  },
  methods: {
    // 查询文章
    async getTaskInfo() {
      const { data: res } = await this.$http.get(`task/QueryTaskByID/${this.taskId}`)
      console.log(res.data)
      this.taskInfo = res.data;
      window.sessionStorage.setItem('title', this.taskInfo.title)
    },
    // 获取评论
    async getCommentList() {
      const { data: res } = await this.$http.get(`commentfront/${this.id}`, {
        params: {
          pagesize: this.queryParam.pagesize,
          pagenum: this.queryParam.pagenum
        }
      })
      console.log(res.total)
      this.commentList = res.data
      this.total = Math.ceil(res.total / this.queryParam.pagesize)
    },
    // 发送评论
    async pushComment() {
      const { data: res } = await this.$http.post('addcomment', {
        article_id: parseInt(this.id),
        content: this.comment.content,
        user_id: parseInt(this.headers.user_id),
        username: this.headers.username
      })
      if (res.status !== 200) return this.$message.error(res.message)
      this.$message.success('评论成功，待审核后显示')
      this.comment.content = '';
    }
  }
}
</script>
<style scoped>
.content>>>div,
img,
span {
  width: auto;
  max-width: 100%;
}

.content>>>pre,
code {
  margin: 10px;
  padding: 14px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: rgba(27, 31, 35, 0.05);
  border-left-width: 0.5rem;
  border-left-style: solid;
  border-color: #303f9f;
}
</style>
