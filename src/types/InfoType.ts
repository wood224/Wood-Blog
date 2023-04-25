import { Tag } from '@/types/TagType'

export class Info {
  id: number;
  avatar: string;
  name: string;
  signature: string;
  technology: Tag[];
  constructor(id?: number, avatar?: string, name?: string, signature?: string, technology?: Tag[]) {
    this.id = id ?? 0;
    this.avatar = avatar ?? '';
    this.name = name ?? '';
    this.signature = signature ?? '';
    this.technology = technology ?? [];
  }
}