import {get,post} from './request';
//登陆
export const  login= (login)=>post('/api/v1/user/login',login)
//上传
export const  upload=(upload)=>get('/api/get/upload',upload)
//菜单
export const  menu= (menu)=>post('/api/v1/user/menu',menu)

