<template>
  <div class="app-container">
    <div class="insurance">
      <el-row>
        <el-col :span="12">
          <div class="mr-10">
            <h3>Danh sách Golfer mua bảo hiểm HIO</h3>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="add">
            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">Thêm mới</el-button>
          </div>
          <el-dialog title="Tạo mới giải đấu" top="30px" width="99%" :visible.sync="dialogFormVisible">
            <el-form class="dialog" :model="form">
              <el-form-item class="form" label="Tên giải đấu:" style="width: 456px;">
                <el-input v-model="form.name" placeholder="Nhập tên giải đấu" autocomplete="off" />
              </el-form-item>
              <el-form-item class="form" label="Số lượng người tham gia giải đấu:" style="width: 456px;">
                <el-select v-model="form.count" placeholder="Chọn số lượng" style="width: 456px;">
                  <el-option label="Outting từ 1-4 golfers" />
                  <el-option label="Outting từ 5-8 golfers" />
                  <el-option label="Outting từ 9-20 golfers" />
                  <el-option label="Outting từ 21-40 golfers" />
                  <el-option label="Giải đấu từ 41 đến 144 golfers" />
                  <el-option label="Giải đấu trên 145 golfers" />
                </el-select>
              </el-form-item>
              <el-form-item class="form" label="Người mua bảo hiểm:" style="width: 456px;">
                <el-input v-model="form.name" placeholder="Tìm kiếm theo tên hoặc mã VGA" autocomplete="off" />
              </el-form-item>
              <el-form-item class="form" label="Chọn Teetime:" style="width: 456px;">
                <el-row>
                  <div class="block">
                    <el-date-picker
                      v-model="form.date"
                      style="width: 227px;"
                      type="date"
                      placeholder="Chọn ngày chơi"
                    />
                  </div>
                  <el-time-select
                    v-model="form.hours"
                    style="width: 227px;"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30'
                    }"
                    placeholder="Chọn giờ chơi"
                  />
                </el-row>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">Thêm mới</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="mr-9">
            <el-select
              v-model="hioHistory.agent_id"
              style="width: 264px;"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="Tìm đại lý"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="mr-9">
            <el-switch
              v-model="hioHistory.day"
              active-text="Tìm kiếm theo ngày khởi tạo"
            />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="4">
          <div class="mr-10">
            <el-input v-model="hioHistory.contract_id" placeholder="Mã hợp đồng" style="width: 264px;" class="mr-10" @keyup.enter.native="handleFilter" />
          </div>
        </el-col>
        <el-col :span="4">
          <el-select v-model="hioHistory.payment" style="width: 264px;" placeholder="TT Thanh toán">
            <el-option
              v-for="item in optionsInfor"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="hioHistory.pvi" style="width: 264px;" placeholder="TT Phản hồi PVI">
            <el-option
              v-for="item in optionsPvi"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <div class="mr-10">
            <el-date-picker
              v-model="hioHistory.time"
              style="width: 412px;"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="Đến"
              start-placeholder="Ngày bắt đầu"
              end-placeholder="Ngày kết thúc"
              :picker-options="pickerOptions"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="mr-8">
            <el-button type="primary" icon="el-icon-download">Xuất excel</el-button>
            <el-button icon="el-icon-refresh">Làm mới</el-button>
            <el-button type="primary" icon="el-icon-search" @click="handleFilter">Tìm kiếm</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-if="!showListHio"
      :data="datas"
      border
      fit
      style="width: 100%;"
    >
      <el-table-column label="STT" width="50px" align="left" type="index" />
      <el-table-column label="Mã bảo hiểm" width="143px" align="left">
        <template slot-scope="{row}">
          <span> {{ row.code }} </span>
        </template>
      </el-table-column>
      <el-table-column label="Tên giải đấu" width="143px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.tourName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tên sân" width="143px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.arena }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mã VGA" width="143px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.vgaCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Giá mua" width="143px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày chơi" width="143px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.playDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày tạo" width="143px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.creatAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pax ID" width="143px" align="left">
        <template slot-scope="{row}">
          <span v-if="row.paxId">{{ formatNumber(row.paxId) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" width="143px" align="left">
        <template slot-scope="{row}">
          <el-row>
            <span v-if="row.payment"><el-tag type="success">{{ formatNumber(row.payment) }}</el-tag></span>
            <span v-else><el-tag type="info">Chưa thanh toán</el-tag></span>
          </el-row>
          <el-row>
            <span v-if="row.infor"><el-tag type="success">{{ formatNumber(row.infor) }}</el-tag></span>
            <span v-else><el-tag type="warning">Chưa gửi thông tin</el-tag></span>
          </el-row>
          <el-row>
            <span v-if="row.recipient"><el-tag>{{ formatNumber(row.recipient) }}</el-tag></span>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="Người xử lý" width="143px" align="left">
        <template slot-scope="{row}">
          <span v-if="row.handler"><el-tag type="info">{{ formatNumber(row.handler) }}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="Hành động" width="143px" align="left">
        <template>
          <el-button type="danger" icon="el-icon-delete" circle />
          <el-button type="primary" icon="el-icon-edit" circle />
        </template>
      </el-table-column>
    </el-table>

    <template v-if="showListHio">
      <i class="el-icon-back link-type" @click="back" />
    </template>
    <template v-if="showListHio">
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
        desc: '',
        date: '',
        hours: ''
      },
      formLabelWidth: '120px',
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: 'Last month',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: 'Last 3 months',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      time: '',
      optionsInfor: [{
        value: 'Chưa thanh toán',
        label: 'Chưa thanh toán'
      },
      {
        value: 'Đã thanh toán',
        label: 'Đã thanh toán'
      }
      ],
      optionsPvi: [{
        value: 'Đã nhận phản hồi PVI',
        label: 'Đã nhận phản hồi PVI'
      },
      {
        value: 'Đang chờ phản hồi',
        label: 'Đang chờ phản hồi'
      }
      ],
      day: false,
      payment: '',
      pvi: '',
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
          code: 'BH25294',
          tourName: 'HIO FOR BOOKING BK1831821 CMS API D20',
          arena: 'Harmonie Golf Park',
          vgaCode: 'VGA62029',
          price: '300.000 VNĐ',
          playDay: '2022-04-21 11:20:00',
          creatAt: '2022-04-19 21:36:21',
          paxId: '',
          handler: 'Viet Anh',
          active: 'active',
          payment: 'Đã thanh toán',
          infor: 'Đã nhận phản hồi PVI',
          recipient: 'Sport'

        },
        {
          id: 2,
          code: 'BH25351',
          tourName: 'Outing',
          arena: 'Long Bien Golf',
          vgaCode: 'VGA55472',
          price: '100.000 VNĐ',
          playDay: '2022-04-20 07:30:00',
          creatAt: '2022-04-20 07:14:31',
          paxId: '',
          handler: '',
          active: 'active',
          payment: '',
          infor: '',
          recipient: 'VGS Booking'

        },
        {
          id: 3,
          code: 'BH25349',
          tourName: 'Tuần châu - 20/4 - 08:00 amm',
          arena: 'Tuần Châu Golf & Resort',
          vgaCode: 'VGA9650',
          price: '200.000 VNĐ',
          playDay: '2022-04-20 08:00:00',
          creatAt: '2022-04-20 06:46:22',
          paxId: 'a87h54',
          handler: 'VCL',
          active: 'active',
          payment: 'Đã thanh toán',
          infor: '',
          recipient: 'APP VHANDICAP'

        },
        {
          id: 4,
          code: 'BH25349',
          tourName: 'Tuần châu - 20/4 - 08:00 amm',
          arena: 'Tuần Châu Golf & Resort',
          vgaCode: 'VGA9650',
          price: '200.000 VNĐ',
          playDay: '2022-04-20 08:00:00',
          creatAt: '2022-04-20 06:46:22',
          paxId: '',
          handler: 'Viet Anh',
          active: 'active',
          payment: 'Đã thanh toán',
          infor: '',
          recipient: 'VGS Booking'

        },
        {
          id: 5,
          code: 'BH25349',
          tourName: 'Tuần châu - 20/4 - 08:00 amm',
          arena: 'Tuần Châu Golf & Resort',
          vgaCode: 'VGA9650',
          price: '200.000 VNĐ',
          playDay: '2022-04-20 08:00:00',
          creatAt: '2022-04-20 06:46:22',
          paxId: '',
          handler: '',
          active: 'active',
          payment: '',
          infor: 'Đã nhận phản hồi PVI',
          recipient: 'APP VHANDICAP'

        },
        {
          id: 6,
          code: 'BH25349',
          tourName: 'Tuần châu - 20/4 - 08:00 amm',
          arena: 'Tuần Châu Golf & Resort',
          vgaCode: 'VGA9650',
          price: '200.000 VNĐ',
          playDay: '2022-04-20 08:00:00',
          creatAt: '2022-04-20 06:46:22',
          paxId: '',
          handler: '',
          active: 'active',
          payment: '',
          infor: '',
          recipient: 'VGS Booking'

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
      showListHio: false,
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
    GetUserList(keyword) {
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
  margin-bottom: 5px;
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
.form{
  margin-bottom: 0px;
}
</style>
