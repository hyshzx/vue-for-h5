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
  good: {
    favorGood: function(id) {
      return axios.post('/v1/favor/goods/' + id);
    },
    unfavorGood: function(id) {
      return axios.post('/v1/unfavor/goods/' + id);
    },
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
    },
    getAddrById: function(addrId) {
      return axios.get('/v1/address/' + addrId);
    },
    getProvince: function() {
      return axios.get('/v1/region/province');
    },
    getCityByProv: function(prov) {
      return axios.get('/v1/region/city/' + prov);
    },
    getRegionByCity: function(city) {
      return axios.get('/v1/region/region/' + city);
    },
    newAddrsss: function(data, addrId) {
      if (addrId) {
        return axios.post('/v1/address/' + addrId, data);
      } else {
        return axios.post('v1/address', data);
      }
    },
    getCollection: function() {
      return axios.get('/v1/favors/goods')
    }
  },
  order: {
    getOrders: function(status) {
      return axios.get('/v1/order/list')
    }
  }

};
export { ajax }
