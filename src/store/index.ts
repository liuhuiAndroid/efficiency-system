import axios from 'axios'
import { createStore, Commit } from 'vuex'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface HomeProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

export interface GlobalDataProps {
  loading: boolean;
  count: number;
  user: UserProps;
  homeData: HomeProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  // await new Promise(resolve => setTimeout(resolve, 3000))
  commit(mutationName, data)
}

export default createStore<GlobalDataProps>({
  state: {
    loading: false,
    count: 0,
    user: { isLogin: false },
    homeData: { }
  },
  mutations: {
    add (state) {
      state.count++
    },
    login (state, rawData) {
      // state.user = { ...state.user, isLogin: true, name: 'aa' }
      state.user = rawData.data
    },
    getHomeData (state, rawData) {
      // state.user = { ...state.user, isLogin: true, name: 'aa' }
      state.homeData = rawData.data
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  actions: {
    login ({ commit }) {
      // 异步请求改造
      getAndCommit('/columns', 'login', commit)
    },
    async getHomeData ({ commit }, cid) {
      const { data } = await axios.get(`/columns/${cid}`)
      commit('getHomeData', data)
    },
    getHomeDatas ({ commit }, cid) {
      axios.get(`/columns/${cid}`).then(resp => {
        commit('getHomeData', resp.data)
      })
    }
  },
  modules: {
  },
  getters: {
  }
})
