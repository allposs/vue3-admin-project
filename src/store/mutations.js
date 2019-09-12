//import {myRouter} from '@/router/router'
const mutations = {
    //保存token
    COMMIT_TOKEN(state, object) {
            state.token = object;
    },
    //保存标签
    TAGES_LIST(state, arr) {
        state.tagsList = arr;
    },
    IS_COLLAPSE(state, bool) {
        state.isCollapse = bool;
    },
    //保存用户信息
    COMMIT_USER(state,object) {
            state.user = object;
    },
    //保存主题改动信息
    COMMIT_THEME(state,object) {
            state.theme = object;
    },
    //保存语言改动信息
    COMMIT_I18N(state,object) {
            state.i18n = object;
    },
} 
export default mutations