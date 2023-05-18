export class Word {
  text: string;
  author: string;
  title: string
  type: string;
  constructor(text?: string, author?: string, title?: string, type?: string) {
    this.text = text ?? '';
    this.author = author ?? '';
    this.title = title ?? '';
    this.type = type ?? '';
  }
}