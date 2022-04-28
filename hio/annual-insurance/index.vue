<template>
  <div class="app-container">
    <div class="insurance">
      <el-row>
        <el-col :span="12">
          <div class="mr-10">
            <h3>Danh sách Golfer mua bảo hiểm theo năm</h3>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="add">
            <el-button icon="el-icon-download">Tải danh sách</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">Thêm mới</el-button>
          </div>
          <el-dialog title="Thông tin danh sách bảo hiểm theo năm" top="50px" width="98%" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="Tên Golfer(*):" :label-height="formLabelWidth">
                <el-input v-model="form.name" placeholder="Tìm kiếm theo tên hoặc mã VGA" autocomplete="off" />
              </el-form-item>
              <el-form-item label="Người mua hộ (Nếu có):" :label-height="formLabelWidth">
                <el-input v-model="form.name2" placeholder="Tìm kiếm theo tên hoặc mã VGA" autocomplete="off" />
              </el-form-item>
              <el-form-item label="HDC tại thời điểm mua:" :label-height="formLabelWidth">
                <el-input v-model="input" :disabled="true" />
              </el-form-item>
              <el-form-item label="Chọn loại gói(*):">
                <el-select v-model="form.choose1" placeholder="Chọn loại gói(*):" style="width: 1824.94px;">
                  <el-option label="Gói tháng" />
                  <el-option label="Gói năm" />
                </el-select>
              </el-form-item>
              <el-form-item label="Chọn giá gói(*):">
                <el-select v-model="form.choose2" placeholder="Chọn giá gói(*):" style="width: 1824.94px;">
                  <el-option label="Y100-Gói mua cả năm trị giá 100 triệu đồng" />
                  <el-option label="Y200-Gói mua cả năm trị giá 200 triệu đồng" />
                  <el-option label="Y500-Gói mua cả năm trị giá 500 triệu đồng" />
                </el-select>
              </el-form-item>
              <el-form-item label="Giá tiền:" :label-height="formLabelWidth">
                <el-input v-model="input" placeholder="0" :disabled="true" />
              </el-form-item>
              <el-form-item label="Ngày có hiệu lực(*):" :label-height="formLabelWidth">
                <el-time-select
                  v-model="startTime"
                  placeholder="2022-04-20 07:30:00"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  :disabled="true"
                />
              </el-form-item>
              <el-form-item label="Ngày hết hạn(*):" :label-height="formLabelWidth">
                <el-time-select
                  v-model="startTime"
                  placeholder="2022-04-20 07:30:00"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  :disabled="true"
                />
              </el-form-item>
              <el-form-item label="Chọn QRCode:" :label-height="formLabelWidth">
                <el-input v-model="form.name" placeholder="Tìm kiếm theo số Serial" autocomplete="off" />
              </el-form-item>
              <el-form-item label="Thanh toán" :label-height="formLabelWidth">
                <el-select v-model="form.choose1" placeholder="Trạng thái thanh toán" style="width: 1824.94px;">
                  <el-option label="Đã thanh toán" />
                  <el-option label="Chưa thanh toán" />
                </el-select>
              </el-form-item>
              <el-form-item label="Ghi chú" :label-height="formLabelWidth">
                <el-input
                  v-model="textarea2"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="Nhập nội dung ghi chú"
                />
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
              v-model="value"
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
          <div class="mr-10">
            <el-select v-model="hioHistory.payment" style="width: 264px;" placeholder="TT Thanh toán">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="mr-10">
            <el-select v-model="hioHistory.pvi" style="width: 264px;" placeholder="TT Phản hồi từ PVI">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="mr-10">
            <el-date-picker
              v-model="hioHistory.time"
              style="width: 544px;"
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
        <el-col :span="4">
          <div class="mr-8">
            <el-button icon="el-icon-refresh">Làm mới</el-button>
            <el-button type="primary" icon="el-icon-search" @click="handleFilter">Tìm kiếm</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-if="!showListAnnualHio"
      :key="tableKey"
      :data="datas"
      border
      fit
      style="width: 100%;"
    >
      <el-table-column label="STT" width="50px" align="left" type="index" />
      <el-table-column label="Mã VGA" width="140px" align="left">
        <template slot-scope="{row}">
          <span> {{ row.vgaCode }} </span>
        </template>
      </el-table-column>
      <el-table-column label="Họ và tên" width="139px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Serial Qr" width="139px" align="left">
        <template slot-scope="{row}">
          <span v-if="row.serial">{{ formatNumber(row.serial) }}</span>
          <span v-else><el-tag type="info">None</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="Gói HIO" width="180px" align="left">
        <template slot-scope="{row}">
          <el-tag type="primary"><span>{{ row.HIO }}</span></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Thành tiền" width="139px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày Active" width="139px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.activeDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày hết hạn" width="139px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.endAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày tạo" width="139px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.creatAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" width="139px" align="left">
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
      <el-table-column label="Người xử lý" width="139px" align="left">
        <template slot-scope="{row}">
          <span v-if="row.handler"><el-tag type="info">{{ formatNumber(row.handler) }}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="Hành động" width="139px" align="left">
        <template>
          <el-button type="danger" icon="el-icon-delete" circle />
          <el-button type="primary" icon="el-icon-edit" circle />
        </template>
      </el-table-column>
    </el-table>

    <template v-if="showListAnnualHio">
      <i class="el-icon-back link-type" @click="back" />
    </template>
    <template v-if="showListAnnualHio">
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
        name2: '',
        choose1: '',
        choose2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        textarea2: ''
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
        }, {
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
      options2: [{
        value: 'Chưa thanh toán',
        label: 'Chưa thanh toán'
      },
      {
        value: 'Đã thanh toán',
        label: 'Đã thanh toán'
      }
      ],
      options3: [{
        value: 'Đã nhận phản hồi PVI',
        label: 'Đã nhận phản hồi PVI'
      },
      {
        value: 'Đang chờ phản hồi',
        label: 'Đang chờ phản hồi'
      }
      ],
      value2: '',
      value3: '',
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
          vgaCode: 'VGA69032',
          name: 'MR HERO',
          serial: '',
          HIO: '50.000.000 VNĐ - Y50',
          price: '300.000 VNĐ',
          activeDay: '2022-04-21 11:20:00',
          endAt: '2022-04-19 21:36:21',
          creatAt: '2022-04-19 21:36:21',
          handler: 'Viet Anh',
          active: 'active',
          payment: 'Đã thanh toán',
          infor: 'Đã nhận phản hồi PVI',
          recipient: 'Sport'

        },
        {
          id: 2,
          vgaCode: 'VGA21288',
          name: 'VAN ICHIHANA SUSHI',
          serial: '001445 - VGS Sport - thẻ 200 triệu (A Bôn)',
          HIO: '50.000.000 VNĐ - Y50',
          price: '100.000 VNĐ',
          activeDay: '2022-04-20 07:30:00',
          endAt: '2022-04-20 07:14:31',
          creatAt: '2022-04-19 21:36:21',
          handler: '',
          active: 'active',
          payment: '',
          infor: '',
          recipient: 'VGS Booking'

        },
        {
          id: 3,
          vgaCode: 'VGA70365',
          name: 'Le Khac Trinh',
          serial: '',
          HIO: '100.000.000 VNĐ - Y100',
          price: '200.000 VNĐ',
          activeDay: '2022-04-20 08:00:00',
          endAt: '2022-04-20 06:46:22',
          creatAt: '2022-04-19 21:36:21',
          handler: '',
          active: 'active',
          payment: 'Đã thanh toán',
          infor: '',
          recipient: 'Sport'

        },
        {
          id: 4,
          vgaCode: 'VGA60666',
          name: 'Lê Thái Sâm',
          serial: '',
          HIO: '200.000.000 VNĐ - Y200',
          price: '200.000 VNĐ',
          activeDay: '2022-04-20 08:00:00',
          endAt: '2022-04-20 06:46:22',
          creatAt: '2022-04-19 21:36:21',
          handler: 'Viet Anh',
          active: 'active',
          payment: 'Đã thanh toán',
          infor: '',
          recipient: 'VGS Booking'

        },
        {
          id: 5,
          vgaCode: 'VGA68732',
          name: 'Hoàng Xuân Mai',
          serial: '001842 - CTV Phương Holding - thẻ 100 triệu',
          HIO: '200.000.000 VNĐ - Y200',
          price: '200.000 VNĐ',
          activeDay: '2022-04-20 08:00:00',
          endAt: '2022-04-20 06:46:22',
          creatAt: '2022-04-19 21:36:21',
          handler: '',
          active: 'active',
          payment: '',
          infor: 'Đã nhận phản hồi PVI',
          recipient: 'Sport'

        },
        {
          id: 6,
          vgaCode: 'VGA68732',
          name: 'Hoàng Xuân Mai',
          serial: '',
          HIO: '200.000.000 VNĐ - Y200',
          price: '200.000 VNĐ',
          activeDay: '2022-04-20 08:00:00',
          endAt: '2022-04-20 06:46:22',
          creatAt: '2022-04-19 21:36:21',
          handler: '',
          active: 'active',
          payment: '',
          infor: '',
          recipient: 'APP VHANDICAP'

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
      showListAnnualHio: false,
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
        this.showListAnnualHio = true
      }
    },
    back() {
      this.showListAnnualHio = false
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
</style>
