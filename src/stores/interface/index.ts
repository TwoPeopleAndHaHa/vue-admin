export interface GlobalState {
  token: string;
  userName: string;
  // language: string;
  // isFollowSystem: boolean;
  systemConfig: systemConfigOptions;
  tabsIcon: boolean;
}
// 菜单
export interface MenuState {
  authMenuList: Menu.MenuOptions[];
}
// 系统设置
export interface systemConfigOptions {
  isCollapse: boolean;
  isDark: boolean;
}

/* tabs */
export interface TabsMenuProps {
  icon: string;
  title: string;
  path: string;
  name: string;
  close: boolean;
}

/* TabsState */
export interface TabsState {
  tabsMenuList: TabsMenuProps[];
}
