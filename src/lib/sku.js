  const sku = {
    // 原始数据
    data: [],

    // 展示数据
    showData: {},

    // 所有属性二维数组
    allKeys: [],

    // 所有商品数据字典
    goodsDict: {},

    // 缓存查找数据
    cacheData: {},

    // 所有可选属性
    result: [],

    // 确定的ID
    resultID: '',
    /**
     * 计算展示数据
     * 计算字典数据
     */
    calculateShowData: function() {
      for (var item of this.data) {
        var _dict = '';
        for (var key in item) {
          if (key !== 'id' && key !== 'num') {
            _dict += item[key] + ';';
          }
          if (this.showData[key]) {
            // 去重
            if (this.showData[key].indexOf(item[key]) === -1) {
              this.showData[key].push(item[key]);
            }
          } else {
            this.showData[key] = new Array(item[key]);
          }
        }
        if (item.num > 0) {
          this.goodsDict[_dict] = {
            id: item.id,
            num: item.num
          };
        }
      }

      for (var key in this.showData) {
        this.allKeys.push(this.showData[key]);
      }
      // console.log(this.goodsDict);
      // console.log(this.allKeys);
      // console.log(this.showData);
    },
    /**
     * 得到结果
     * @param {string} key 查找关键字以；分割
     * @return {array} 所有可选属性数组
     */
    getResult: function(key, isRealFind) {
      var self = this;
      if (!isRealFind) {

      } else {
        isRealFind = true;
      }
      // isRealFind = true;
      // 如缓存中存在，则直接返回结果
      if (this.cacheData[key] && isRealFind) {
        this.result = this.cacheData[key];
        this.resultID = this.goodsDict[key] ? this.goodsDict[key] : '';
        // console.log(this.resultID);
        return this.result;
      }

      // 继续查找
      var result = '';
      for (var _key in this.goodsDict) {
        var keyArr = key.split(';');
        var _keyArr = _key.split(';');
        var arr = keyArr.concat(_keyArr);
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
          if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i]);
          }
        }
        // arr = Array.from(new Set(arr));
        if (newArr.length === _keyArr.length) {
          result += _key;
        }
      }

      if (isRealFind) {
        // 所有可选属性
        this.result = result.split(';');
        var _keyArr = key.split(';');
        if (_keyArr[_keyArr.length - 1] === '') {
          _keyArr.pop();
        }
        for (var i = 0; i < _keyArr.length; i++) {
          var _arr = key.split(';');
          var str = _arr.splice(i, 1);
          var oldResult = this.getResult(_arr.join(';'), false);
          var index = '';
          // 获取该key所在索引
          this.allKeys.forEach(function(item, i) {
            if (item.indexOf(str.join('')) !== -1) {
              index = i;
              return;
            }
          });
          this.allKeys[index].forEach(function(item) {
            if (oldResult.indexOf(item) !== -1) {
              self.result.push(item);
            }
          });
        }
        var newResultArr = [];
        for (var i = 0; i < this.result.length; i++) {
          if (newResultArr.indexOf(this.result[i]) == -1) {
            newResultArr.push(this.result[i]);
          }
        }
        this.result = newResultArr;
        // this.result = Array.from(new Set(this.result));

        // 缓存数据
        this.cacheData[key] = this.result;
        this.resultID = this.goodsDict[key] ? this.goodsDict[key] : '';
        console.log(this.resultID);
        return this.result;
      } else {
        return result;
      }
    },
    /**
     * 页面渲染
     */
    renderPage: function($cateTpl, $btnTpl, $dom) {
      var index = 0;
      for (var key in sku.showData) {
        if (key === 'id') {
          return;
        } else {
          var $item = $.tpl($cateTpl, { key }).appendTo($dom);
          // console.log($($item));
          var $child = $($item)[2];
          // console.log($child);
          sku.showData[key].forEach(function(item) {
            $.tpl($btnTpl, { item, index }).appendTo($child);
          });
        }
        index++;
      }
    },
    init: function(data, $parentText, $btnText, $wrapper) {
      this.data = data;
      this.calculateShowData();
      return this.showData;
      // this.renderPage($parentText, $btnText, $wrapper);
      // this.getResult('', []);


    }

  };
  export { sku };
