<template>
  <div class="row">
    <div class="col-md-6 col-12">
      <div class="row" style="align-items: baseline;">
        เริ่ม
        <div class="col-7 col-md-7">
          <el-date-picker
            class="full-width"
            v-model.trim="filter.startDate"
            arrow-control
            placeholder="วันที่"
            style="width: 100%"
          />
        </div>
        <div class="col">
          <el-time-picker
            class="full-width"
            v-model.trim="filter.startTime"
            format="HH:mm"
            arrow-control
            placeholder="เวลา"
            style="width: 100%"
          >
          </el-time-picker>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-12">
      <div class="row" style="align-items: baseline;">
        ถึง
        <div class="col-7 col-md-7">
          <el-date-picker
            class="full-width"
            v-model.trim="filter.endDate"
            arrow-control
            placeholder="วันที่"
            style="width: 100%"
          />
        </div>
        <div class="col">
          <el-time-picker
            class="full-width"
            v-model.trim="filter.endTime"
            format="HH:mm"
            arrow-control
            placeholder="เวลา"
            style="width: 100%"
          >
          </el-time-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      startDate: new Date(),
      startTime: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate: new Date(),
      endTime: new Date(new Date().setHours(23, 59, 59, 999))
    }
  }
};
</script>
