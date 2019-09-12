/* 
 * 系统登录模块
 */

// 登录接口
export function login() {
    const loginData = {
      "code": 200,
      "msg": "登录成功",
      "token": "77ae89be36504adfb5c09ef71409ea0e",
      "data": {
        name:"admin",
        lang: "zh",
        roles:["admin","body"],
        image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3266090804,66355162&fm=26&gp=0.jpg',
      }
    }
    return {
      url: 'api/v1/user/login',
      type: 'post',
      data: loginData
    }
  }
  // 登出接口
  export function logout() {
    const logoutData = {
      "code": 200,
      "msg": "注销成功",
      "data": {
      }
    }
    return {
      url: 'api/v1/user/logout',
      type: 'post',
      data: logoutData
    }
  }