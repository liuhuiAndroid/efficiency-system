import axios, { AxiosRequestConfig } from 'axios'
import { createStore, Commit } from 'vuex'
import { arrToObj, objToArr } from '../utils/helper'

export interface StationInfo {
  stationName: string;
  stationPhoto: string;
  capacity: string;
  powerToday: string;
  powerThisMonth: string;
  powerTotal: string;
}

// 电站信息
export interface PowerStationInfoProps {
  stationInfo: StationInfo;
  deviceOverview: string;
}

// 升压变
export interface TransformerInfo {
  deviceName: string;
  deviceId: string;
  status: boolean;
  fac: number;
  hU: number;
  lU: number;
  pFactor: number;
  pac: boolean;
  inverterCount: number;
}

// 升压变列表数据
export interface TransformerListInfo {
  pageNum?: number;
  pageSize?: number;
  pageCount?: number;
  totalCount?: number;
  pvStringDatas?: TransformerInfo[];
}

// 逆变器
export interface InverterInfo {
  deviceName: string;
  deviceId: string;
  status: number;
  u: number;
  i: number;
  p: number;
  combinerBoxCount: number;
}

// 逆变器列表数据
export interface InverterListInfo {
  pageNum?: number;
  pageSize?: number;
  pageCount?: number;
  totalCount?: number;
  pvStringDatas?: InverterInfo[];
}

// 汇流箱
export interface CombinerBoxInfo {
  deviceName: string;
  deviceId: string;
  status: number;
  u: number;
  i: number;
  p: number;
  temperature: number;
  pvStringCount: number;
}

// 汇流箱列表数据
export interface CombinerBoxListInfo {
  pageNum?: number;
  pageSize?: number;
  pageCount?: number;
  totalCount?: number;
  pvStringDatas?: CombinerBoxInfo[];
}

// 光伏组串
export interface PvstringInfo {
  deviceName: string;
  deviceId: string;
  status: number;
  u: number;
  i: number;
  p: number;
  temperature: number;
  standard: boolean;
}

// 光伏组串列表数据
export interface PvstringListInfo {
  pageNum?: number;
  pageSize?: number;
  pageCount?: number;
  totalCount?: number;
  pvStringDatas?: PvstringInfo[];
}

// 光伏组串详情
export interface PvstringDetailProps {
  deviceName: string;
  deviceId: string;
  deviceStaus: number;
  isStandard: string;
  deviceInfos: string;
  deviceData: string;
}

// 标杆组串
export interface StandardPvstringlist {
  deviceName: string;
  deviceId: string;
  deviceStaus: number;
  isStandard: string;
  deviceInfos: string;
  deviceData: string;
}

export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}

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

export interface MeteoProps {
  temperature?: number;
  humidity?: number;
  pressure?: number;
  windDirection?: string;
  windSpeed?: number;
  poa?: number;
}

export interface DeviceInfo {
  deviceType: string,
  deviceTypeCode: number,
  deviceCount: number
}

export interface DeviceStatusInfo {
  deviceStauts: string,
  deviceStautsCode: number,
  deviceCount: number
}

// 电站信息
export interface PowerStationInfo {
  stationName?: string,
  capacity?: string,
  powerToday?: string,
  powerThisMonth?: string,
  powerThisYear?: string,
  powerTotal?: string
}

interface ListProps<P> {
  [id: string]: P;
}

export interface GlobalDataProps {
  token: string;
  loading: boolean;
  user: UserProps;
  homeData: HomeProps;
  error: GlobalErrorProps;
  meteoData: MeteoProps;
  deviceInfos: ListProps<DeviceInfo>;
  dviceStatusInfos: ListProps<DeviceStatusInfo>;
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  powerStationInfo: PowerStationInfo;
  transformerListInfo: TransformerListInfo;
  inverterListInfo: InverterListInfo;
  combinerBoxListInfo: CombinerBoxListInfo;
  pvstringListInfo: PvstringListInfo;
}

const asyncAndCommit = async (url: string, mutationName: string, commit: Commit,
  config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}

export default createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    error: { status: false },
    loading: false,
    user: { isLogin: false },
    homeData: {},
    meteoData: {},
    deviceInfos: {},
    dviceStatusInfos: {},
    columns: { data: {}, currentPage: 0, total: 0 },
    powerStationInfo: {},
    transformerListInfo: {},
    inverterListInfo: {},
    combinerBoxListInfo: {},
    pvstringListInfo: {}
  },
  // mutations 不可以包含异步操作
  mutations: {
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      state.user = { ...state.user, isLogin: true }
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
    getMeteoData (state, rawData) {
      state.meteoData = rawData.entity
    },
    getDevicesInfo (state, rawData) {
      state.deviceInfos = rawData.entity
    },
    getDeviceStatusInfo (state, rawData) {
      state.dviceStatusInfos = rawData.entity
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchColumn (state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchColumns (state, rawData) {
      const { data } = state.columns
      const { list, count, currentPage } = rawData.data
      state.columns = {
        data: { ...data }, // , ...arrToObj(list)
        total: count,
        currentPage: currentPage * 1
      }
    },
    setPowerStationInfo (state, rawData) {
      state.powerStationInfo = rawData.entity
    },
    setTransformerList (state, rawData) {
      state.transformerListInfo = rawData.entity
    },
    setInverterList (state, rawData) {
      state.inverterListInfo = rawData.entity
    },
    setCombinerBoxList (state, rawData) {
      state.combinerBoxListInfo = rawData.entity
    },
    setPvstringList (state, rawData) {
      state.pvstringListInfo = rawData.entity
    }
  },
  actions: {
    login ({ commit }, payload) {
      // 异步请求改造
      return asyncAndCommit('/user/login', 'login', commit, { method: 'post' }, payload)
    },
    fetchCurrentUser ({ commit }) {
      return asyncAndCommit('/user/current', 'fetchCurrentUser', commit)
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
    },
    // 获取当前气象数据
    getMeteoData ({ commit }, payload) {
      return asyncAndCommit('/web/sidebar/getmeteodata', 'getMeteoData', commit, { method: 'post' }, payload)
    },
    // 获取设备Bar信息
    getDevicesInfo ({ commit }, payload) {
      return asyncAndCommit('/web/sidebar/getdevicesinfo', 'getDevicesInfo', commit, { method: 'post' }, payload)
    },
    // 获取设备状态Bar信息
    getDeviceStatusInfo ({ commit }, payload) {
      return asyncAndCommit('/web/sidebar/getdevicestatusinfo', 'getDeviceStatusInfo', commit, { method: 'post', data: payload })
    },
    fetchColumns ({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      if (state.columns.currentPage < currentPage) {
        return asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
      }
    },
    fetchColumn ({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    // 获取电站信息
    getPowerStationInfo ({ commit }, payload) {
      return asyncAndCommit('/web/home/getpowerstationinfo', 'setPowerStationInfo', commit, { method: 'post', data: payload })
    },
    // 获取升压变列表
    getTransformerList ({ commit }, payload) {
      return asyncAndCommit('/web/monitor/gettransformerlist', 'setTransformerList', commit, { method: 'post', data: payload })
    },
    // 获取逆变器列表
    getInverterList ({ commit }, payload) {
      return asyncAndCommit('/web/monitor/getinverterlist', 'setInverterList', commit, { method: 'post', data: payload })
    },
    // 获取汇流箱列表
    getCombinerBoxList ({ commit }, payload) {
      return asyncAndCommit('/web/monitor/getcombinerboxlist', 'setCombinerBoxList', commit, { method: 'post', data: payload })
    },
    // 获取光伏组串列表
    getPvStringList ({ commit }, payload) {
      return asyncAndCommit('/web/monitor/getpvstringlist', 'setPvstringList', commit, { method: 'post', data: payload })
    }
  },
  modules: {
  },
  getters: {
    getColumns: (state) => {
      return objToArr(state.columns.data)
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    }
  }
})
