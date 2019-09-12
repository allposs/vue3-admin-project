import {get,post} from './request';

//上传
export const  upload=(params)=>get('/api/get/upload',params)
//菜单
export const  menu= (params)=>post('/api/v1/user/menu',params)

//用户登陆
export const  userLogin= (params)=>post('/api/v1/user/login',params)
//用户注销
export const  userLogout= (params)=>post('/api/v1/user/logout',params)
//用户管理分页查询
export const userFindPage=(params)=>post('/api/v1/user/findPage',params)
//用户管理保存
export const userSave=(params)=>post('/api/v1/user/save',params)
//用户管理删除
export const userDel=(params)=>post('/api/v1/user/delete',params)

//部门信息保存
export const deptSave=(params)=>post('/api/v1/dept/save',params)
//部门信息删除
export const deptDel=(params)=>post('/api/v1/dept/delete',params)
//部门信息分页查询
export const deptFindDeptTree=(params)=>get('/api/v1/dept/findPage',params)