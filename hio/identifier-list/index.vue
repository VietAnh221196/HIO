<template>
  <div class="app-container">
    <div class="insurance">
      <el-row>
        <el-col :span="12">
          <div class="mr-10">
            <h3>Danh sách thông tin golfer PVI</h3>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="add">
            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">Thêm mới</el-button>
          </div>
          <el-dialog title="Thêm mới" width="30%" top="30px" :visible.sync="dialogFormVisible">
            <el-form :model="form" class="dialog">
              <el-form-item label="Họ và tên" :label-height="formLabelWidth">
                <el-input v-model="form.name" placeholder="Họ và tên" autocomplete="off" />
              </el-form-item>
              <el-form-item label="Mã VGA" :label-height="formLabelWidth">
                <el-input v-model="form.vga" placeholder="Nhập mã VGA" autocomplete="off" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">Thêm mới</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="8">
          <div class="mr-10">
            <div data-v-323e70b0="" class="el-input el-input--medium">
              <input v-model="hioHistory.contract_id" type="text" autocomplete="off" placeholder="Nhập mã VGA" class="el-input__inner">
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="mr-10">
            <div data-v-323e70b0="" class="el-input el-input--medium">
              <input v-model="hioHistory.name_id" type="text" autocomplete="off" placeholder="Họ và tên" class="el-input__inner">
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="mr-8">
            <el-button icon="el-icon-refresh">Làm mới</el-button>
            <el-button type="primary" icon="el-icon-search" @click="handleFilter">Tìm kiếm</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-if="!showListIdentifier"
      :key="tableKey"
      :data="datas"
      border
      fit
      style="width: 100%;"
    >
      <el-table-column label="STT" width="50px" align="left" type="index" />
      <el-table-column label="Mã VGA" width="150px" align="left">
        <template slot-scope="{row}">
          <span> {{ row.vgaCode }} </span>
        </template>
      </el-table-column>
      <el-table-column label="Họ và tên" width="642px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày tạo" width="642px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.creatAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Hành động" width="150px" align="left">
        <template>
          <el-button type="primary" icon="el-icon-edit" circle />
        </template>
      </el-table-column>
    </el-table>

    <template v-if="showListIdentifier">
      <i class="el-icon-back link-type" @click="back" />
    </template>
    <template v-if="showListIdentifier">
      <list-repayment :contact-id="contactId" />
    </template>

    <pagination
      :total="total"
      :page.sync="hioHistory.page"
      :limit.sync="hioHistory.limit"
      @pagination="getList"
    />

  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import axios from 'axios' // secondary package based on el-pagination
import ListRepayment from '@/views/t99/loan-history/components/ListRepayment'

import { statusT99, arrayStatusT99 } from '@/utils/status'
import { formatNumber } from '@/utils'
import moment from 'moment'

export default {
  name: 'HioHistoryTable',
  components: { ListRepayment, Pagination },
  directives: { waves },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        count: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      hioHistory: {
        page: 1,
        type: '0',
        number: 10
      },
      users: [],
      tableKey: 0,
      datas: [
        {
          id: 1,
          vgaCode: 'VGA46087',
          name: 'nguyễn cường',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        },
        {
          id: 2,
          vgaCode: 'VGA46087',
          name: 'NGUYỄN VĂN B',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        },
        {
          id: 3,
          vgaCode: 'VGA46087',
          name: 'TRỊNH HỮU DƯƠNG',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        },
        {
          id: 4,
          vgaCode: 'VGA46087',
          name: 'TRƯƠNG VŨ HẠNH',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        },
        {
          id: 5,
          vgaCode: 'VGA46087',
          name: 'TRƯƠNG VŨ HẠNH',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        },
        {
          id: 6,
          vgaCode: 'VGA46087',
          name: 'NGUYỄN CÔNG TIẾN',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        },
        {
          id: 7,
          vgaCode: 'VGA46087',
          name: 'ĐỖ ĐỨC CHÍNH',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        },
        {
          id: 8,
          vgaCode: 'VGA46087',
          name: 'ĐỖ ĐỨC CHÍNH',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        },
        {
          id: 9,
          vgaCode: 'VGA46087',
          name: 'NGUYỄN ĐỨC LONG',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        },
        {
          id: 10,
          vgaCode: 'VGA46087',
          name: 'NGUYỄN ĐỨC LONG',
          creatAt: '2020-10-09 20:27:12',
          active: 'status'
        }
      ],
      total: 4,
      listLoading: true,
      dialogStatus: '',
      textMap: {
        pay: '',
        settlement: ''
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogRepaymentSchedule: '',
      showListIdentifier: false,
      contactId: {},
      status: {},
      paramSearchUser: Object.assign({}, { page: 1, number: 10 })
    }
  },
  created() {
    // this.getList()
    this.status = this.arrayStatusT99()
  },
  methods: {
    getList() {
      this.listLoading = true
      axios.post('', this.hioHistory).then(res => {
        if (res.data.error_code === 0) {
          this.datas = res.data.data.list_contract
          this.total = res.data.data.list_contract.lenth
          this.listLoading = false
        }
      }).catch(error => {
        console.log('error', error)
      })
    },
    handleFilter() {
      if (this.hioHistory.date != null) {
        this.hioHistory.time_step_1 = moment(this.hioHistory.date[0]).unix()
        this.hioHistory.time_step_2 = moment(this.hioHistory.date[1]).unix()
      }
      console.log(this.hioHistory)
      this.hioHistory.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    showRepaymentSchedule(contactId) {
      this.contactId = Object.assign({}, contactId) // copy obj
      if (contactId) {
        this.showListIdentifier = true
      }
    },
    back() {
      this.showListIdentifier = false
    },
    onGetUserList(keyword) {
      this.paramSearchUser.q = keyword
      const params = Object.keys(this.paramSearchUser).map(key => {
        return `${key}=${this.paramSearchUser[key]}`
      }).join('&')
      this.loadingUser = true
      axios.post('' + params).then(response => {
        // this.loadingUser = false
        // const { error_code, data } = response.data
        // if (error_code === 0) {
        //   if (data.length > 0) {
        //     const array = []
        //     data.map(result => {
        //       const name = `${result.id} - ${result.fullname}`
        //       const item = { label: name, value: result._id, golfer: result }
        //       array.push(item)
        //     })
        //     this.users = [...array]
        //     // this.currentAdminId = currentAdminId
        //     // this.parent_id = parent_id
        //     console.log('this.users', this.users)
        //   } else {
        //     this.users = []
        //   }
        // }
      })
    },
    statusT99, arrayStatusT99, formatNumber
  }
}
</script>

<style>
.mr-10 {
  margin-bottom: 10px;
}
.mr-9{
  margin-bottom: 5px;
}
.add{
  text-align: right;
  margin-bottom: 5px;
}
.mr-8{
  text-align: right;
}
</style>
