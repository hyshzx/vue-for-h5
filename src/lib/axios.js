import axios from "axios"
import { storage } from "./storage.js"
axios.defaults.headers.common['JOKE'] = "s7s7s3astar7mall!";
if (storage.get('token')) {
  axios.defaults.headers.common['Authorization'] = storage.get('token');
}

const ajax = {
  index: {
    getIndex: function() {
      return axios.get('/v1/goods/index');
    },
    getGood: function(goodId) {
      return axios.get('/v1/goods/' + goodId)
    },
    getGoodPJ: function(goodId) {
      return axios.get('/v1/comment/information/' + goodId)
    },
    getGoodList: function(params) {
      return axios.get('/v1/goods/list', { params: params })
    }
  },
  user: {
    login: function(data) {
      return axios.post('/v1/users/login', data)
    },
    getListAddr: function() {
      return axios.get('/v1/address/list')
    },
    deleteAddr: function(addrId) {
      return axios.post('/v1/address/delete/' + addrId)
    },
    defaultAddr: function(addrId) {
      return axios.post('/v1/address/default/' + addrId)
    }
  },
  order: {
    getOrders: function(status) {
      return axios.get('/v1/order/list')
    }
  }

};
export { ajax }
