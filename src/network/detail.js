import {request} from './request'
export function getDetail(iid){
    return request({
        url: '/detail',
        params : {
            iid
        }
    })
}

export function getRecommend(){
  return request({
    url: '/recommend'
  })
}

export class Goods {
    constructor(itemInfo, columns, services) {
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.realPrice = itemInfo.lowNowPrice;
      this.oldPrice = itemInfo.oldPrice;
      this.discount = itemInfo.discountDesc;
      this.discountBgColor = itemInfo.discountBgColor;
      this.columns = columns;
      this.services = services;
      this.nowPrice = itemInfo.highNowPrice;
    }
  }

// 店铺数据
export class Shops {
    constructor(shopInfo) {
      this.shopLogo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.cFans = shopInfo.cFans;
      this.cSells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.cGoods = shopInfo.cGoods;
    }
  }

  export class GoodsParam {
    constructor(info, rule) {
      // 注：images可能没有值(某些商品有值，某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }