import { defineStore } from 'pinia';

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      pageOptions: {
        limit: 6,
        offset: 0,
      }
    }
  },
  getters: {

  },
  actions: {

  }
})