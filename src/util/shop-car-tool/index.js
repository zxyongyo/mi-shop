
import VueDB from '../../util/vue-db/vue-db-long'

let DB = new VueDB()

class ShopCarTool{
  /**
   * 如果存在shop-car的本地存储 把它的值转为字符串赋给shopCar
   * 如果不存在初始化shopCar为空对象
   */
  constructor(store){
    var shopCar = DB.getItem('shop-car').toJson()
    if(!shopCar){
      DB.setItem('shop-car', JSON.stringify(shopCar = {}))
    }

    this.$store = store
    this.shopCarDB = shopCar
  }

  upData() {  //更新当前购物车和vuex
    DB.setItem('shop-car', JSON.stringify(this.shopCarDB))
    this.$store.commit('setShopCarLength', this.length())
  }

  /**
   * this.shopCarDB：当前购物车的信息
   * value: 要添加的商品的信息  
   * 先获取商品对应的id   如果this.shopCarDB里有这个id 说明该商品已存在  把它的length +1就行了
   * 如果没有  将该商品的信息加到this.shopCarDB中   更新
   */
  add( value ) {

    var key = value.id

    if(!key){
      return
    }

    if(this.shopCarDB[key]){    
      this.shopCarDB[key].length+=1
    }else{
      // 过滤需要的信息
      var filter = {}

      // 需要的信息列表
      var filterResout = ['title', 'money', 'id']

      for(var i=0; i<filterResout.length; i++){
        var innreKey = filterResout[i]
        filter[innreKey] = value[innreKey]
      }
      filter.img = value.banner[0] ? value.banner[0].src : '' // 取一张商品图片
      filter.link = '/detail/'+value.id
      filter.length = 1
      this.shopCarDB[key] = filter
    }

    this.upData()
  }

  // 减去一个商品，如果数量为零则删除该商品
  minus( value ) {
    var key = value.id

    if(!key){
      return
    }

    if(this.shopCarDB[key]){
      this.shopCarDB[key].length-=1
      if(this.shopCarDB[key].length <= 0){
        this.remove(key)
      }

      this.upData()
    }
  }

  // 删除整个商品
  remove(key) {
    this.shopCarDB[key].length = 0
    
    delete this.shopCarDB[key]
    this.upData()
  }
  // 删除所有商品
  removeAll() {
    this.shopCarDB = {}
    this.upData()
  }
  // 获取单个数据
  get(key) {
    return this.shopCarDB[key]
  }
  // 获取全部数据
  getAll(){
    return this.shopCarDB
  }
  // 设置单个数据里的某一个字段
  set(parentKey, key, value) {
    if(this.shopCarDB[parentKey]){
      this.shopCarDB[parentKey][key] = value
      this.upData()
    }
  }
  setLength(key, value){
    if( this.shopCarDB[key] ){
      this.shopCarDB[key].length = value
    }
    this.upData()
  }
  length() {
    var n = 0;
    for(var i in this.shopCarDB){
      n += this.shopCarDB[i].length
    }
    return n
  }

}


export default ShopCarTool
