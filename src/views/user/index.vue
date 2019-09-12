<template>
  <div class="container" style="width:100%;">
    <!--工具栏-->
    <div class="toolbar" style="float:left; padding:18px;">
        <el-form :inline="true" :model="filters" size="small">
            <el-form-item>
                <el-input v-model="filters.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="findPage(null)">{{ $t("table.serach") }}</el-button>
            </el-form-item>
            <el-form-item>
                <vap-button :label="$t('button.add')" perms="sys:user:add" type="primary" @click="handleAdd" />
            </el-form-item>
        </el-form>
    </div>
    <!--表格内容栏-->
    <vap-table permsEdit="sys:user:edit" permsDelete="sys:user:delete"
        :data="pageResult" :columns="columns" 
        @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </vap-table>
    <!--新增编辑界面-->
    <el-dialog :title="operation? $t('button.add'): $t('button.edit')" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
            <el-form-item :label="$t('dialog.id')" prop="id">
                <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dialog.user')" prop="user">
                <el-input v-model="dataForm.user" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dialog.name')" prop="name">
                <el-input v-model="dataForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dialog.pass')" prop="password">
                <el-input v-model="dataForm.pass" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dialog.number')" prop="number">
                <el-input v-model="dataForm.number" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dialog.lang')" prop="lang">
                <el-input v-model="dataForm.lang" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="机构" prop="deptName">
                <popup-tree-input 
                    :data="deptData" 
                    :props="deptTreeProps" 
                    :prop="dataForm.deptName" 
                    :nodeKey="''+dataForm.deptId" 
                    :currentChangeHandle="deptTreeCurrentChangeHandle">
                </popup-tree-input>
            </el-form-item>
            <el-form-item :label="$t('dialog.email')" prop="email">
                <el-input v-model="dataForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dialog.phone')" prop="phone">
                <el-input v-model="dataForm.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dialog.login')" prop="login">
            <el-switch :label="$t('dialog.login')" 
                v-model="dataForm.login"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="true"
                inactive-value="flase"
                :active-text="$t('dialog.true')"
                :inactive-text="$t('dialog.flase')">
            </el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import PopupTreeInput from "@/views/components/PopupTreeInput"
import VapTable from "@/views/components/VapTable"
import VapButton from "@/views/components/VapButton"
import { userSave,userDel,userFindPage,deptFindDeptTree } from "@/api/api";
export default {
    components:{
            PopupTreeInput,
            VapTable,
            VapButton
    },
    data() {
        return {
            filters: {
                name: ''
            },
            columns: [
                {prop:"id", label:"table.id", minWidth:40, sortable:"false"},
                {prop:"user", label:"table.user", minWidth:120, sortable:"true"},
                {prop:"name", label:"table.name", minWidth:120, sortable:"true"},
                {prop:"number", label:"table.number", minWidth:120, sortable:"true"},
                {prop:"department", label:"table.department", minWidth:120, sortable:"true"},
                {prop:"email", label:"table.email", minWidth:120, sortable:"true"},
                {prop:"phone", label:"table.phone", minWidth:120, sortable:"true"},
                {prop:"login", label:"table.login", minWidth:120, sortable:"true"},

            ],
            pageRequest: { pageNum: 1, pageSize: 10 },
            pageResult: {},

            operation: false, // true:新增, false:编辑
            editDialogVisible: false, // 新增编辑界面是否显示
            editLoading: false,
            dataFormRules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                user: [
                    { required: true, message: '请输入登录名', trigger: 'blur' }
                ]
            },
            // 新增编辑界面数据
            dataForm: {
                id: 0,
                user:'',
                name: '',
                number:'',
                lang:'',
                pass: '',
                deptId: 1,
                deptName: '',
                email: '',
                phone: '',
                login:'',
                status: 1
            },
            deptData: [],
            deptTreeProps: {
                label: 'name',
                children: 'children'
            }
        }
    },
    methods: {
        // 获取分页数据
        findPage: function (data) {
            if(data !== null) {
                this.pageRequest = data.pageRequest
            }
            this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name}}
            userFindPage(this.pageRequest).then((res) => {
                this.pageResult = res.data
            })
        },
        // 批量删除
        handleDelete: function (data) {
            userDel(data.params).then(data.callback)
        },
        // 显示新增界面
        handleAdd: function () {
            this.editDialogVisible = true
            this.operation = true
            this.dataForm = {
                id: 0,
                name: '',
                password: '',
                deptId: 1,
                deptName: '',
                email: 'test@qq.com',
                mobile: '13889700023',
                login:'flase',
                status: 1
            }
        },
        // 显示编辑界面
        handleEdit: function (params) {
            this.editDialogVisible = true
            this.operation = false
            this.dataForm = Object.assign({}, params.row)
        },
        // 编辑
        editSubmit: function () {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true
                        let params = Object.assign({}, this.dataForm)
                        userSave(params).then((res) => {
                            console.log(res)
                            this.editLoading = false
                            this.$message({ message: '提交成功', type: 'success' })
                            this.$refs['dataForm'].resetFields()
                            this.editDialogVisible = false
                            this.findPage(null)
                        })
                    })
                }
            })
        },
        // 获取部门列表
		findDeptTree: function () {
			deptFindDeptTree().then((res) => {
            this.deptData = res.data
            console.log(res)
			})
		},
        // 菜单树选中
          deptTreeCurrentChangeHandle (data, node) {
            console.log(node)
            this.dataForm.deptId = data.id
            this.dataForm.deptName = data.name
          }
    },
    mounted() {
		this.findDeptTree()
	}

}
</script>

<style lang="scss">
    .el-form-item__label {
        color: #606266;
  }
</style>