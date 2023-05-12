import { defineStore } from 'pinia';
import { getInfoApi } from '../api'
import { AxiosResponse } from 'axios';

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      info: {             //个人信息
        avatar: '',
        name: '',
        signature: '',
        technology: '',
        email: ''
      },
    }
  },
  getters: {

  },
  actions: {
    async setInfo() {     //获取个人信息
      if (this.info.name !== '') return this.info;
      return await getInfoApi().then((res: AxiosResponse) => {
        const data = res.data;
        this.info = {
          ...data,
          technology: data.technology.split(',').join(' ')
        }
        return this.info;
      })
    },
  }
})