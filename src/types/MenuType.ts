interface Children {
  icon: string,
  name: string,
}

export interface MenuList {
  icon: string,
  name: string,
  children: Array<Children>,
}