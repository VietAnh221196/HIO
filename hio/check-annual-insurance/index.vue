<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <div class="mr-10">
          <h2>Nhập mã VGA để kiểm tra</h2>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="23">
      <el-col :span="4">
        <div class="input">
          <div data-v-323e70b0="" class="el-input el-input--medium">
            <input v-model="message" type="text" autocomplete="off" placeholder="Mã VGA" class="el-input__inner">
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="search">
          <el-button icon="el-icon-refresh">Làm mới</el-button>
          <el-button type="primary" icon="el-icon-search" @click="greet">Tìm kiếm</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="mr-10">
        <h4>VGA {{ message }} chưa mua bảo hiểm năm</h4>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    greet(event) {
      alert('VGA ' + this.message + ' chưa mua bảo hiểm năm')
    }
  }
}

</script>
<style>
.input{
    margin-bottom: 10px;
}

</style>
