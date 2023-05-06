import { TechnologyTag } from '@/types/TechnologyTagType'

export class Info {
  id: number;
  avatar: string;
  name: string;
  signature: string;
  technology: TechnologyTag[];
  constructor(id?: number, avatar?: string, name?: string, signature?: string, technology?: TechnologyTag[]) {
    this.id = id ?? 0;
    this.avatar = avatar ?? '';
    this.name = name ?? '';
    this.signature = signature ?? '';
    this.technology = technology ?? [];
  }
}