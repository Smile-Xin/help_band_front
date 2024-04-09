<template>
    <div class="chat-content">
        <!-- recordContent 聊天记录数组-->
        <div v-for="item in messageList" :key="item.ID" class="chat">
            <div>{{ item.context }}</div>
            <!-- 对方 -->
            <div v-if="item.sender_id !== user_id" class="word">
                <img :src="taAvatar">
                <div class="info">
                    <!-- <p class="time">{{ itemc.nickName }} {{ chatTime(itemc.timestamp) }}</p> -->
                    <div class="info-content" style="color: #333;">{{ item.content }}</div>
                </div>
            </div>
            <!-- 我的 -->
            <div v-else class="word-my">
                <div class="info">
                    <!-- <p class="time">{{ itemc.nickName }} {{ chatTime(itemc.timestamp) }}</p> -->
                    <div class="info-content">{{ item.content }}</div>
                </div>
                <img :src="myAvatar">
            </div>
        </div>
        <v-card flat class="text">
            <div>
                <v-textarea class="mx-3 " outlined v-model="message.content"></v-textarea>
                <v-btn class="ml-3 mb-1" dark color="indigo" small @click="pushComment()">确定</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    props: ["chat_id"],
    data() {
        return {
            user_id: 0,
            taId: 0,
            user_name: "",
            chatId: 0,
            myAvatar: "",
            taAvatar: "",
            MessageUser: {},
            messageList: [],
            message: {
                lid: 0,
                sender_id: 0,
                content: '',
            },
        }
    },
    methods: {
        async queryLetter() {
            const { data: res } = await this.$http.get(`/letter/QueryLetterById/${this.chat_id}`)
            if (res.state !== 200) {
                this.$message.error(res.message)
                console.log("queryLetter res", res)
                return
            }
            console.log("queryLetter res", res)
            if (res.data.userA_id === this.user_id) {
                this.taId = res.data.userB_id
            } else {
                this.taId = res.data.userA_id
            }
            console.log("taId111", this.taId)
            console.log("getAvatar1 taId", this.taId)
            const { data: taAvatar } = await this.$http.get(`/user/GetAvatar/${this.taId}`)
            this.taAvatar = taAvatar.data
            console.log("taAvatar", taAvatar)
        },
        // 查询对话
        async queryChat() {
            console.log("queryChat headers", this.headers)
            const { data: res } = await this.$http.get(`/message/QueryMessage/${this.chatId}`)
            if (res.state !== 200 && res.state !== 8002) {
                this.$message.error(res.message)
                console.log("meaageList res", res)
                return
            }
            if (res.state === 8002) {
                return
            }
            console.log("meaageList res", res)
            this.messageList = res.data
            console.log("messageList", this.messageList)
        },
        //  获取头像1
        async getAvatar1() {
            console.log("getAvatar1 taId", this.taId)
            const { data: taAvatar } = await this.$http.get(`/user/GetAvatar/${this.taId}`)
            this.taAvatar = taAvatar.data
            console.log("taAvatar", taAvatar)
        },
        //  获取头像2
        async getAvatar2() {
            const { data: myAvatar } = await this.$http.get(`/user/GetAvatar/${this.user_id}`)
            this.myAvatar = myAvatar.data
            console.log("myAvatar", myAvatar)
        },
        // 发送消息
        async pushComment() {
            console.log("pushComment message", this.message)
            const { data: res } = await this.$http.post('message/AddMessage', this.message)
            if (res.state !== 200) return this.$message.error(res.message)
            console.log("pushComment res", res)
            this.$message.success('发送成功')
            this.message.content = '';
        },
        // 时间循环
        setTime() {
            this.time = setInterval(() => {
                this.queryChat()
            }, 1500);
        },

    },
    created() {
        window.sessionStorage.setItem('active', this.chat_id)
        this.chatId = parseFloat(this.chat_id)
        this.user_name = window.sessionStorage.getItem('user_name')
        this.user_id = parseInt(window.sessionStorage.getItem('user_id'))
        this.message.sender_id = parseInt(this.user_id)
        this.message.lid = parseInt(this.chatId)
        this.queryLetter()
        // this.getAvatar1()
        this.getAvatar2()
        this.queryChat()
        this.setTime()
    },
    beforeDestroy() {
        clearInterval(this.time)
        this.time = null
    },

}
</script>



<style scoped>
.chat-content {
    width: 100%;
    height: 100%;
    min-height: 550px;
    padding: 20px;

    .word {
        display: flex;
        margin-bottom: 20px;

        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        .info {
            margin-left: 10px;

            .time {
                font-size: 12px;
                color: rgba(51, 51, 51, 0.8);
                margin: 0;
                height: 20px;
                line-height: 20px;
                margin-top: -5px;
            }

            .info-content {
                padding: 10px;
                font-size: 14px;
                background: #A3C3F6;
                position: relative;
                margin-top: 8px;
            }

            /* //小三角形 */
            .info-content::before {
                position: absolute;
                left: -8px;
                top: 8px;
                content: '';
                border-right: 10px solid #A3C3F6;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
            }
        }
    }

    .word-my {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;

        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        .info {
            width: 90%;
            margin-left: 10px;
            text-align: right;

            .time {
                font-size: 12px;
                color: rgba(51, 51, 51, 0.8);
                margin: 0;
                height: 20px;
                line-height: 20px;
                margin-top: -5px;
                margin-right: 10px;
            }

            .info-content {
                max-width: 70%;
                padding: 10px;
                font-size: 14px;
                float: right;
                margin-right: 10px;
                position: relative;
                bottom: 5px;
                margin-top: 8px;
                background: #A3C3F6;
                text-align: left;
            }

            /* //小三角形 */
            .info-content::after {
                position: absolute;
                right: -8px;
                top: 8px;
                content: '';
                border-left: 10px solid #A3C3F6;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
            }
        }
    }
}

.v-application .info {
    background-color: transparent !important;
    border-color: #2196f3 !important;
}

.text {
    /* position: relative; */
    bottom: 0px;
    width: 100%;

}

.chat {
    /* height: 200px; */
}
</style>