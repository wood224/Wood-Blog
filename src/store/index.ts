import { defineStore } from 'pinia';

export const useIndexStore = defineStore('index', {
  state: () => ({
    menuViewTitle: '',
    isEditor: false,
    editorType: 1,
    editorId: 0,
    editorTitle: '',
    editorChange: false,
    pageOptions: {
      limit: 10,
      offset: 0
    },
  }),
  getters: {

  },
  actions: {
    setMenuViewTitle(title: string) {
      this.menuViewTitle = title;
    },
    setIsEditor(isEditor: boolean, type?: number, id?: number, title?: string) {
      this.isEditor = isEditor;
      this.editorType = type ?? 1;
      this.editorId = id ?? 0;
      this.editorTitle = title ?? '';
    },
    setEditorChange(isChange: boolean) {
      this.editorChange = isChange;
    },
    setPageOptionsLimit(limit: number) {
      this.pageOptions.limit = limit;
    }
  },
});