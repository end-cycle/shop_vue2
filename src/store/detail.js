import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api/index";
import { GETUUID } from "@/utils/uuid_token";
const state = {
  goodInfo: {},
  uuid_token: GETUUID(),
};
const actions = {
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },

  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    commit;
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
