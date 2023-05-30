// * menu 菜单
declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    meta: MetaProps;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    children?: MenuOptions[];
  }
  interface MetaProps {
    icon: string;
    title: string;
    // activeMenu?: string;
    // isLink?: string;
    isHidden: boolean;
    // isFull: boolean;
    // isAffix: boolean;
    // isKeepAlive: boolean;
  }
}
