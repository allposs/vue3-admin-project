//全部菜单
export const menu = [{
    icon: "el-icon-news",
    index: "home",
    title: "menu.home"
},
{
    icon: "el-icon-document",
    index: "charts",
    title: "menu.chart",
    subs: [{
        index: "piechart",
        title: "menu.pieChart"
    }]
},
{
    icon: "el-icon-news",
    index: "settings",
    title: "menu.settings",
    subs: [{
        index: "user",
        title: "menu.user",
        icon: "el-icon-document",
    }]
},
{
    icon: "el-icon-news",
    index: "tty",
    title: "sys.tty"
}]