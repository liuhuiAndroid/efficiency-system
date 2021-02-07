import { createStore } from 'vuex'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface GlobalDataProps {
  count: number;
  user: UserProps;
}

export default createStore<GlobalDataProps>({
  state: {
    count: 0,
    user: { isLogin: false }
  },
  mutations: {
    add (state) {
      state.count++
    },
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'aa' }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
