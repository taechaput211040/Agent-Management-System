<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <div>
      <v-container>
        <div class="d-block d-sm-flex">
          <h3 class="mt-2">Sub Account Management</h3>
          <v-spacer></v-spacer>
          <v-btn elevation="2" color="primary" v-show="!$store.state.account.profile.isClone" @click="handleAdd">
            New sub-account</v-btn
          >
        </div>

        <v-card class="pb-1 mt-5 justify-center rounded-lg classtable">
          <v-row class="ma-3 justify-end" align="center">
            <v-col cols="12" sm="4" class="ma-2">
              <v-text-field
                @keyup.enter="search()"
                v-model="serchtext"
                dense
                solo-inverted
                label="username"
                hide-details="auto"
                required
              ></v-text-field>
            </v-col>
            <v-btn elevation="2" color="success" @click.stop="search()">
              <v-icon left> mdi-magnify</v-icon> Search
            </v-btn>
          </v-row>
          <v-divider></v-divider>
          <v-data-table
            :page.sync="pagination.page"
            :items-per-page="pagination.itemPerpage"
            :server-items-length="pagination.totalDocs"
            :headers="headers"
            :items="itemList"
            hide-default-footer
          >
            <!-- index -->
            <template #[`item.no`]="{ index }">
              {{ pagination.itemPerpage * (pagination.page - 1) + (index + 1) }}
            </template>

            <template #[`item.createdAt`]="{ item }">
              {{ item.createdAt | dateFormat }}
            </template>
            <template #[`item.loginDatetime`]="{ item }">
              <span v-if="item.loginDatetime">{{ item.loginDatetime | dateFormat }}</span>
              <span v-else><v-chip small color="grey" dark> - </v-chip></span>
            </template>
            <template #[`item.isSuspend`]="{ item }">
              <span v-if="item.isSuspend">{{ item.isSuspend }}</span>
              <span v-else><v-chip small color="grey" dark> - </v-chip></span>
            </template>
            <!-- <template #[`item.action`]="{ item }">
              <v-btn @click="editSubaccont"> <v-icon>mdi-pencil</v-icon>edit</v-btn>
            </template> -->
          </v-data-table>
          <v-row align="baseline" class="mt-3">
            <v-col cols="12" sm="2">
              <v-select
                outlined
                hide-details="auto "
                dense
                v-model="pagination.itemPerpage"
                @change="changeItemPerpage"
                :items="pageSizes"
                label="รายการต่อหน้า"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="10">
              <v-pagination
                v-model="pagination.page"
                @input="changePage(pagination.page)"
                :total-visible="7"
                :length="Math.ceil(pagination.totalDocs / pagination.itemPerpage)"
              ></v-pagination>
            </v-col>
          </v-row>

          <v-dialog v-model="modalAddSubAccount" persistent max-width="800">
            <v-form ref="create">
              <v-card class="pa-5">
                <h2 class="mt-3 mb-6 text-center">New Sub Account</h2>

                <!-- username -->
                <v-row class="select-item py-2">
                  <v-col cols="12" sm="4" md="2" class="py-0">
                    <h3 class="mt-2 text-left text-sm-right mx-4 mx-sm-0">Username</h3>
                  </v-col>
                  <v-col cols="12" sm="8" md="10" style="padding: 0 30px">
                    <!-- <pre v-if="$store.state.account.organizations">{{
                     
                    }}</pre> -->

                    <v-text-field
                      :prefix="
                        this.$store.state.account.profile
                          ? this.$store.state.account.profile.comPrefix + this.$store.state.account.profile.agentPrefix
                          : null
                      "
                      :rules="[(v) => !!v || 'username is required']"
                      placeholder=""
                      outlined
                      v-model="formCreate.username"
                      dense
                      hide-details="auto"
                      color="purple"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- password -->
                <v-row class="select-item py-2">
                  <v-col cols="12" sm="4" md="2" class="py-0">
                    <h3 class="mt-2 text-left text-sm-right mx-4 mx-sm-0">Password</h3>
                  </v-col>
                  <v-col cols="12" sm="8" md="10" style="padding: 0 30px">
                    <v-text-field
                      type="password"
                      v-model="formCreate.password"
                      outlined
                      hide-details="auto"
                      :rules="[(v) => !!v || 'password is required']"
                      dense
                      placeholder=""
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- contact -->

                <!-- Sub user preference -->
                <v-card class="ma-3">
                  <v-card-text class="pa-3 indigo lighten-3 white--text d-sm-flex d-block align-baseline">
                    <h2 class="ml-2 pt-3">User Permission</h2>
                    <v-spacer></v-spacer>
                  </v-card-text>

                  <v-data-table hide-default-footer :items="item_menu" class="elevetion-1" :headers="headrSetting">
                    <template #[`header.read`]>
                      <v-checkbox
                        hide-details="auto"
                        v-model="selectedReadAll"
                        label="ดู"
                        :value="selected.filter((x) => x.endsWith('_read')).length > 0"
                        :indeterminate="
                          selected.filter((x) => x.endsWith('_read')).length > 0 &&
                          selected.filter((x) => x.endsWith('_read')).length < item_menu.length
                        "
                        @change="handleReadAllPermission(selectedReadAll, item_menu)"
                      ></v-checkbox>
                    </template>
                    <template #[`header.write`]>
                      <v-checkbox
                        v-model="selectedWriteAll"
                        hide-details="auto"
                        label="แก้ไข"
                        :value="selected.filter((x) => x.endsWith('_write')).length > 0"
                        :indeterminate="
                          selected.filter((x) => x.endsWith('_write')).length > 0 &&
                          selected.filter((x) => x.endsWith('_write')).length < item_menu.length
                        "
                        @change="handleWriteAllPermission(selectedWriteAll, item_menu)"
                      >
                      </v-checkbox>
                    </template>
                    <template #[`item.read`]="{ item }">
                      <v-checkbox
                        hide-details="auto"
                        v-model="selected"
                        :value="`${item.menu}_read`"
                        @change="handleReadPermission(`${item.menu}_read`)"
                      ></v-checkbox>
                    </template>
                    <template #[`item.write`]="{ item }">
                      <v-checkbox
                        hide-details="auto"
                        v-model="selected"
                        :value="`${item.menu}_write`"
                        @change="handleWritePermission(`${item.menu}_write`)"
                      ></v-checkbox>
                    </template>
                  </v-data-table>
                </v-card>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" :loading="loadingCreatebtn" depressed @click="handleSubmit"> บันทีก </v-btn>
                  <v-btn color="error" depressed @click="handleCloseDialog"> ยกเลิก </v-btn
                  ><v-spacer></v-spacer> </v-card-actions></v-card
            ></v-form>
          </v-dialog>
        </v-card>
      </v-container>
    </div>
    <v-dialog v-model="open_history" width="800">
      <v-card class="pb-2">
        <v-card color="indigo darken-2" dark align-baseline>
          <v-card-title class="text-h5"
            >ประวัติการเติม<v-spacer></v-spacer
            ><v-btn fab icon x-small @click="open_history = false"><v-icon>mdi-close-thick</v-icon></v-btn>
          </v-card-title>
        </v-card>
        <v-data-table class="ma-2" :headers="headersHistory" hide-default-footer></v-data-table
      ></v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
import { mapActions } from 'vuex'
import loadingPage from '~/components/form/loadingPage.vue'
export default {
  components: { loadingPage },
  data() {
    return {
      pageSizes: [5, 10, 15, 25],
      serchtext: '',
      pagination: {
        itemPerpage: 15,
        page: 1,
        totalDocs: 0,
      },
      loadingCreatebtn: false,
      formCreate: {
        username: '',
        password: '',
        role: '',
        comPrefix: '',
        agentPrefix: '',
        isClone: true,
        groups: [],
      },
      selected: [],
      selectedReadAll: false,
      selectedWriteAll: false,
      item_menu: [
        { displayName: 'Dashboard', menu: 'dashboard' },
        { displayName: 'Downline', menu: 'downline' },
        { displayName: 'Sub Account', menu: 'sub-account' },
        { displayName: 'Member', menu: 'member' },
        { displayName: 'Lotto Management', menu: 'lotto-management' },
        { displayName: 'Report', menu: 'report' },
        { displayName: 'Check Outstanding', menu: 'check-outstanding' },
        { displayName: 'Staff Logs', menu: 'staff-log' },
      ],
      headrSetting: [
        {
          text: 'Menu',
          value: 'displayName',
          sortable: false,
        },
        {
          text: 'View',
          value: 'read',
          sortable: false,
        },
        {
          text: 'Edit',
          value: 'write',
          sortable: false,
        },
      ],
      history: [],
      open_history: false,
      modalAddSubAccount: false,
      show: false,
      isLoading: false,
      headersHistory: [
        {
          text: 'No.',
          align: 'center',
          value: 'no',
          divider: true,
        },
        {
          text: 'Deposit',
          value: 'credit_type_display',
          divider: true,
          sortable: false,
        },
        {
          text: 'Withdrawal',
          value: 'credit_type_display',
          divider: true,
          sortable: false,
        },
        {
          text: 'Date/Time',
          value: 'datetime_transaction',
          divider: true,
          sortable: false,
        },
      ],
      headers: [
        {
          text: 'No.',
          align: 'center',
          value: 'no',
          class: 'col-1',
          sortable: false,
        },
        { text: 'Username', value: 'username', align: 'left', sortable: false },
        { text: 'Created at', value: 'createdAt', sortable: false },
        { text: 'Login IP', value: 'ipAddress', sortable: false },
        { text: 'Last Login', value: 'loginDatetime', sortable: false },
        // { text: 'Last Login', value: 'last_login', divider: true },
        { text: 'Suppend', value: 'isSuspend', align: 'center', sortable: false },
        // { text: 'Action', value: 'action', align: 'center', sortable: false },
      ],
      itemList: [],
    }
  },
  created() {},
  async mounted() {
    this.getSubaccount()
  },
  methods: {
    search() {
      this.pagination.page = 1
      this.getSubaccount()
    },
    ...mapActions('account', ['create_SubAccont', 'subaccontList', 'createGroups']),
    changeItemPerpage(size) {
      this.pagination.page = 1
      this.pagination.itemPerpage = size
      this.getSubaccount()
    },
    changePage(size) {
      this.pagination.page = size
      this.getSubaccount()
    },
    handleReadAllPermission(state, items) {
      if (state) {
        this.selected = items.map((item) => {
          return `${item.menu}_read`
        })
      } else {
        this.selected = []
      }
    },
    handleWriteAllPermission(state, items) {
      if (state) {
        this.selected = items
          .map((item) => {
            return [`${item.menu}_read`, `${item.menu}_write`]
          })
          .reduce((prev, curr) => [...prev, ...curr], [])
      } else {
        this.selected = this.selected.filter((selected) => !selected.endsWith('_write'))
      }
    },
    getParameter() {
      let param = {
        search: this.serchtext || this.serchtext !== '' ? this.serchtext : undefined,
        limit: this.pagination.itemPerpage,
        page: this.pagination.page,
      }

      return param
    },
    async getSubaccount() {
      this.isLoading = true
      let parameters = this.getParameter()
      try {
        let { data } = await this.subaccontList(parameters)
        console.log(data, 'data')
        this.itemList = data.docs
        this.pagination.totalDocs = data.totalDocs
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },
    handleReadPermission(value) {
      const item = value.split('_')
      this.selected = this.selected.filter((selected) => selected != `${item[0]}_write`)
    },
    handleWritePermission(value) {
      const item = value.split('_')
      if (this.selected.findIndex((selected) => selected == `${item[0]}_read`) < 0) {
        this.selected.push(`${item[0]}_read`)
      }
    },
    showlog(dataHistory) {
      this.open_history = true
      this.history = dataHistory
    },

    addstatus(value) {
      console.log(value)
    },
    async showcredit(credit, i) {
      this.show = true
    },
    async handleSubmit() {
      this.formCreate.groups = this.selected
      this.loadingCreatebtn = true
      let body = {
        username:
          this.$store.state.account.profile.comPrefix +
          this.$store.state.account.profile.agentPrefix +
          this.formCreate.username,
        comPrefix: undefined,
        agentPrefix: undefined,
        groups: this.formCreate.groups,
        isClone: true,
        role: this.$store.state.auth.role ? this.$store.state.auth.role : undefined,
        password: this.formCreate.password,
      }
      if (this.$refs.create.validate()) {
        try {
          let { data } = await this.create_SubAccont(body)
          if (data.code == 201) {
            let payout = {
              username: body.username,
              groups: this.selected,
            }
            await this.createGroups(payout)
            console.log('create')
          }
          await this.getSubaccount()
          this.$swal({
            icon: 'success',
            title: `Create Sub-Account Success`,
            showConfirmButton: false,
            timer: 1500,
          })
          this.modalAddSubAccount = false
          this.loadingCreatebtn = false
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: `${error.response.data.message}`,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1500,
          })
          this.loadingCreatebtn = false
        }
      }
    },
    handleAdd() {
      this.selected = this.$store.state.account.profile.groups
      this.modalAddSubAccount = true
    },
    async handleCloseDialog() {
      this.modalAddSubAccount = false
      this.$refs.create.reset()
      this.$refs.create.resetValidation()
    },
    async handlcCloseEditForm() {
      this.modalAddSubAccount = false
    },
  },
}
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
}
</style>
