import { defineStore } from 'pinia';

export const useIndexStore = defineStore('index', {
  state: () => ({
    menuViewTitle: '',
  }),
  getters: {

  },
  actions: {
    setMenuViewTitle(title: string) {
      this.menuViewTitle = title;
    }
  },
});