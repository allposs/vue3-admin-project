import Mock from 'mockjs';

Mock.mock('http://localhost:8080/api/v1/user/login','post',{
    data:{
        token:"123456",
        username:"admin",
        lang: "zh",
        roles:["admin","body"],
        image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3266090804,66355162&fm=26&gp=0.jpg',
    },
    msg: null,
    code:200,
});
Mock.mock('http://localhost:8080/api/v1/user/menu',{
    code:200,
    data: [{
    icon: "el-icon-document",
    index: "charts",
    title: "图表",
    subs: [{
        index: "cricle",
        title: "饼图"
    }]
    }]});
