<template>
  <div>
    <h2>Staff Log</h2>
    <div class="mt-3 classtable">
      <v-data-table :headers="headerOutsatanding" :items="renderlog">
        <template #[`item.no`]="{ index }">
          {{ index + 1 }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerOutsatanding: [
        {
          text: 'No.',
          value: 'no',
          sortable: false,
          align: 'center',
          cellClass: 'text-center font-weight-bold',
        },
        {
          text: 'time',
          value: 'time',
          align: 'center',
          cellClass: 'text-center font-weight-bold',
        },
        {
          text: 'Username',
          value: 'username',
          align: 'center',
          cellClass: 'text-center font-weight-bold',
        },
        {
          text: 'action',
          value: 'action',
          sortable: false,
          align: 'center',
          cellClass: 'text-center font-weight-bold',
        },
        {
          text: 'log',
          value: 'log',
          sortable: false,
          align: 'center',
          cellClass: 'text-center font-weight-bold',
        },

        {
          text: 'Log Detail',
          value: 'detail',
          sortable: false,
          align: 'center',
          cellClass: 'text-center font-weight-bold',
        },
        {
          text: 'IP',
          value: 'ipAddress',
          sortable: false,
          align: 'center',
          cellClass: 'text-center font-weight-bold',
        },
      ],
      renderlog: [
        {
          time: 'วันที่ 2022-05-25',
          username: 'superadmin',
          log: 'พยายามเข้าสู่ระบบ',
          detail: {},
          action:"",
          ipAddress: '103.156.154.173',
        },
      ],
//       {post => api
// body=>{
// username
// role
// agentPrefix
// comPrefix
// actions => ทำอะไรบ้าง
// details => string => อธิบาย action ว่าทำอะไร
// payload => Json}
    }
  },
}
</script>

<style></style>
