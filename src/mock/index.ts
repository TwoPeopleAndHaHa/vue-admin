import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/login",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: {
          token: "mockToken"
        }
      };
    }
  },
  {
    url: "/api/logout",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: {
          msg: "退出成功"
        }
      };
    }
  }
] as MockMethod[];
