import axios from 'axios'
import { createStore, Commit } from 'vuex'

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
}

export interface HomeProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  token: string;
  loading: boolean;
  count: number;
  user: UserProps;
  homeData: HomeProps;
  error: GlobalErrorProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  // await new Promise(resolve => setTimeout(resolve, 3000))
  commit(mutationName, data)
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

export default createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    error: { status: false },
    loading: false,
    count: 0,
    user: { isLogin: false },
    homeData: {}
  },
  mutations: {
    add (state) {
      state.count++
    },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      // axios 设置通用 header
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout (state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.remove('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    getHomeData (state, rawData) {
      state.homeData = rawData.data
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    }
  },
  actions: {
    login ({ commit }, payload) {
      // 异步请求改造
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    async getHomeData ({ commit }, cid) {
      const { data } = await axios.get(`/columns/${cid}`)
      commit('getHomeData', data)
    },
    getHomeDatas ({ commit }, cid) {
      axios.get(`/columns/${cid}`).then(resp => {
        commit('getHomeData', resp.data)
      })
    },
    // 组合Action
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  modules: {
  },
  getters: {
  }
})
