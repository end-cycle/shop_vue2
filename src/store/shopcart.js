import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
  cartList: [],
};
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  async deleteCartListBySkuId({ commit }, skuId) {
    commit;
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    commit;
    let result = await reqUpdateCheckedById(skuId, isChecked);
    console.log(result, "1");
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  deleteAllCheckedCart({ dispatch, getters }) {
    console.log(getters, "1");
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
