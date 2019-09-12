/* 
 * 用户管理模块
 */

// 保存
export function save() {
    return {
      url: 'api/v1/user/save',
      type: 'post',
      data: {
        "code": 200,
        "msg": null,
        "data": 1
      }
    }
  }
  // 批量删除
  export function batchDelete() {
    return {
      url: 'api/v1/user/delete',
      type: 'post',
      data: {
        "code": 200,
        "msg": "删除成功",
        "data": 1
      }
    }
  }
  // 分页查询
  export function findPage(params) {
    let findPageData = {
      "code": 200,
      "msg": null,
      "data": {}
    }
    let pageNum = 1
    let pageSize = 8
    if(params !== null) {
      // pageNum = params.pageNum
    }
    if(params !== null) {
      // pageSize = params.pageSize
    }
    let content = getContent(pageNum, pageSize)
    findPageData.data.pageNum = pageNum
    findPageData.data.pageSize = pageSize
    findPageData.data.totalSize = 50
    findPageData.data.content = content
    return {
      url: 'api/v1/user/findPage',
      type: 'post',
      data: findPageData
    }
  }
  export function getContent(pageNum, pageSize) {
    let content = []
    for(let i=0; i<pageSize; i++) {
      let obj = {}
      let index = (pageNum - 1) * pageSize + i + 1
      obj.id = index
      obj.user = 'admin' + index
      obj.name = 'kitty' + index
      obj.password = '9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d'
      obj.email = 'kitty' + index +'@qq.com'
      obj.phone = '18688982323'
      obj.number = "4983"+index
      obj.department = '系统运维部'
      if(i % 2 === 0) {
        obj.login = '基础架构部'
      }
      obj.login = '否'
      if(i % 2 === 0) {
        obj.login = '是'
      }
      content.push(obj)
    }
    return content
  }
  // 查找用户的菜单权限标识集合
  export function findPermissions() {
    let permsData = {
      "code": 200,
      "msg": null,
      "data": [
        null,
        "sys:user:view",
        "sys:menu:delete",
        "sys:dept:edit",
        "sys:dict:edit",
        "sys:dict:delete",
        "sys:menu:add",
        "sys:user:add",
        "sys:log:view",
        "sys:dept:delete",
        "sys:role:edit",
        "sys:role:view",
        "sys:dict:view",
        "sys:user:edit",
        "sys:user:delete",
        "sys:dept:view",
        "sys:dept:add",
        "sys:role:delete",
        "sys:menu:view",
        "sys:menu:edit",
        "sys:dict:add",
        "sys:role:add"
      ]
    }
    return {
      url: 'api/v1/user/findPermissions',
      type: 'get',
      data: permsData
    }
  }