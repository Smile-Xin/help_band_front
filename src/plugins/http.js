import Vue from 'vue'
import axios from 'axios'

// axios请求地址
axios.defaults.baseURL = 'http://localhost:3001/api/v1'

Vue.prototype.$http = axios
