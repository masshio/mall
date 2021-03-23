export default {
    addCart(context, payload){
        return new Promise((reslove,reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if(oldProduct){
                context.commit('addCounter',oldProduct)
                reslove("商品数量+1")
            }else {
                payload.count = 1
                context.commit('addToCart',payload)
                reslove("成功添加商品到购物车")
        }
        })
    }
}