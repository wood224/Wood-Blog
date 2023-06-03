import { defineStore } from 'pinia';

export const useIndexStore = defineStore('index', {
  state: () => ({
    menuViewTitle: '',      //菜单标题
    isEditor: false,
    editorType: 1,
    editorId: 0,
    editorTitle: '',
    editorChange: false,    //笔记编辑页面是否有修改
    infoChange: false,       //个人信息页面是否有修改
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
    setInfoChange(isChange: boolean) {
      this.infoChange = isChange;
    },
    setPageOptionsLimit(limit: number) {
      this.pageOptions.limit = limit;
    },
  },
});