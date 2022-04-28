<template>
  <div class="app-container">
    <div class="insurance">
      <el-row>
        <el-col :span="24">
          <div class="mr-10">
            <h3>Danh sách Golfer book bảo hiểm</h3>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="4">
          <div class="mr-10">
            <el-input v-model="hioHistory.contract_id" placeholder="Mã hợp đồng" class="mr-10" @keyup.enter.native="handleFilter" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="mr-10">
            <el-select v-model="hioHistory.payment" style="width: 267px;" placeholder="TT Thanh toán">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="mr-8">
            <el-button icon="el-icon-refresh">Làm mới</el-button>
            <el-button type="primary" icon="el-icon-search" @click="handleFilter">Tìm kiếm</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-if="!showListOrderHio"
      :key="tableKey"
      :data="datas"
      border
      fit
      style="width: 100%;"
    >
      <el-table-column label="STT" width="50px" align="left" type="index" />
      <el-table-column label="Mã User" width="180px" align="left">
        <template slot-scope="{row}">
          <span> {{ row.userCode }} </span>
        </template>
      </el-table-column>
      <el-table-column label="Loại bảo hiểm" width="175px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.classify }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Số lượng bảo hiểm" width="175px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mệnh giá thẻ" width="175px" align="left">
        <template slot-scope="{row}">
          <span v-if="row.denominations">{{ formatNumber(row.denominations) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày booking" width="175px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.bookingDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" width="175px" align="left">
        <template slot-scope="{row}">
          <div class="el-col el-col-24">
            <el-switch
              v-model="value1"
            />
            <span v-if="row.status"><el-tag type="success">{{ formatNumber(row.status) }}</el-tag></span>
            <span v-else><el-tag>Chưa xử lý</el-tag></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Người xử lý" width="175px" align="left">
        <template slot-scope="{row}">
          <span v-if="row.handler"><el-tag type="info">{{ formatNumber(row.handler) }}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="Ghi chú" width="175px" align="left">
        <template slot-scope="{row}">
          <span v-if="row.note">{{ formatNumber(row.note) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Hành động" width="175px" align="left">
        <template>
          <el-button type="primary" icon="el-icon-edit" circle />
        </template>
      </el-table-column>
    </el-table>

    <template v-if="showListOrderHio">
      <i class="el-icon-back link-type" @click="back" />
    </template>
    <template v-if="showListOrderHio">
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
      options: [{
        value: 'Chưa xử lý',
        label: 'Chưa xử lý'
      },
      {
        value: 'Đã xử lý',
        label: 'Đã xử lý'
      }
      ],
      payment: '',
      value1: false,
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
          userCode: 'VGA46087',
          classify: '0',
          count: '1',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
          active: 'status'
        },
        {
          id: 2,
          userCode: 'VGA79432',
          classify: '0',
          count: '1',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
          active: 'status'
        },
        {
          id: 3,
          userCode: 'VGA911',
          classify: '2',
          count: '2',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
          active: 'status'
        },
        {
          id: 4,
          userCode: 'VGA25092',
          classify: '0',
          count: '10',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
          active: 'status'
        },
        {
          id: 5,
          userCode: 'VGA9368',
          classify: '2',
          count: '1',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
          active: 'status'
        },
        {
          id: 6,
          userCode: 'VGA46087',
          classify: '2',
          count: '3',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
          active: 'status'
        },
        {
          id: 7,
          userCode: 'VGA46087',
          classify: '2',
          count: '3',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
          active: 'status'
        },
        {
          id: 8,
          userCode: 'VGA46087',
          classify: '2',
          count: '3',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
          active: 'status'
        },
        {
          id: 9,
          userCode: 'VGA46087',
          classify: '2',
          count: '3',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
          active: 'status'
        },
        {
          id: 10,
          userCode: 'VGA46087',
          classify: '2',
          count: '3',
          denominations: '',
          bookingDay: '2022-04-21 11:20:00',
          status: '',
          handler: '',
          note: '',
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
      showListOrderHio: false,
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
        this.showListOrderHio = true
      }
    },
    back() {
      this.showListOrderHio = false
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
