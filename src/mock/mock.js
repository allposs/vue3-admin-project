import Mock from 'mockjs';
Mock.mock('http://localhost:8080/user',{
    'name': '@name',
    'email':'@email',
    'age|1-10': 5,
    err_code:0,
});
Mock.mock('http://localhost:8080/api/v1/user/login','post',{
    data:{token:"123456"},
    msg: '登录成功',
    err_code:0,
});

Mock.mock('http://localhost:8080/api/v1/user/menu',{
    err_code:0,
    data: [{
    icon: "el-icon-document",
    index: "charts",
    title: "图表",
    subs: [{
        index: "cricle",
        title: "饼图"
    }]
    }]});


//npm install axios-mock-adapter --save-dev
//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
//let mock = new MockAdapter(axios);
//mock.onPost('/api/v1/user/login').reply(200, {
//   data:{
//    token:"123456",
//   },
//   msg: 'success'
//  });
