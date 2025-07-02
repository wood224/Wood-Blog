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
      coverDetails: {
        categoryName: '',
        introduction: '',
        tagName: '',
        createTime: ''
      },
      openDirectory: true,
      isDark: false
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
    setCoverDetails(categoryName?: string, introduction?: string, tagName?: string, createTime?: string) {  //修改封面详情信息
      this.coverDetails.categoryName = categoryName ?? '';
      this.coverDetails.introduction = introduction ?? '';
      this.coverDetails.tagName = tagName ?? '';
      this.coverDetails.createTime = createTime ?? '';
    },
    setOpenDirectory(open: boolean) {
      this.openDirectory = open;
    },
    setIsDark(dark: boolean) {
      this.isDark = dark;
    }
  }
})