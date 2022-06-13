<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-container>
        <v-row class="select-item py-2">
          <v-col cols="12" md="8">
            <h3 class="mt-2">
              Member Management - List : <span class="mx-3">Sub Account List</span>
              <v-btn elevation="2" color="primary" @click="handleAdd"> New sub account </v-btn>
            </h3>
          </v-col>
        </v-row>

        <v-card class="pb-1 mt-5 justify-center rounded-lg classtable">
          <v-data-table :headers="headers" :items="exampleitem" hide-default-footer>
            <!-- index -->
            <template #[`item.no`]="{ index }">
              {{ index + 1 }}
            </template>
            <template #[`item.status`]="{ item }">
              <span style="color: #c2e164">{{ item.status ? 'Active' : 'Idle' }}</span>
            </template>
          </v-data-table>

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
                        v-model="selected"
                        :value="`${item.menu}_read`"
                        @change="handleReadPermission(`${item.menu}_read`)"
                      ></v-checkbox>
                    </template>
                    <template #[`item.write`]="{ item }">
                      <v-checkbox
                        v-model="selected"
                        :value="`${item.menu}_write`"
                        @change="handleWritePermission(`${item.menu}_write`)"
                      ></v-checkbox>
                    </template>
                  </v-data-table>
                </v-card>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" depressed @click="handleSubmit"> บันทีก </v-btn>
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
        <v-data-table class="  ma-2" :headers="headersHistory" hide-default-footer></v-data-table
      ></v-card>
    </v-dialog>

    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </v-flex>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
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
        { displayName: 'Credit', menu: 'credit' },
        { displayName: 'Dashboard', menu: 'dashboard' },
        { displayName: 'Downline', menu: 'downline' },
        { displayName: 'Member', menu: 'member' },
        { displayName: 'Lotto Management', menu: 'lotto-management' },
        { displayName: 'Landing Management', menu: 'landing-management' },
        { displayName: 'Member Page Management', menu: 'member-management' },
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
          divider: true,
        },
        { text: 'Username', value: 'username', divider: true, align: 'center' },

        { text: 'Created at', value: 'created', divider: true },
        { text: 'Created by', value: 'created', divider: true },
        { text: 'Login IP', value: 'ip', divider: true },
        { text: 'Last Login', value: 'last_login', divider: true },
        { text: 'Suppend', value: 'Suppend', align: 'center', divider: false },
      ],
      exampleitem: [],
    }
  },
  created() {},
  methods: {
    ...mapActions('account', ['create_SubAccont']),
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
      console.log(this.formCreate)
      if (this.$refs.create.validate()) {
        try {
          // await this.create_SubAccont(this.formCreate)
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          })
        }
      }
    },
    handleAdd() {
      this.formCreate.role = this.$store.state.auth.role ? this.$store.state.auth.role : undefined
      this.formCreate.comPrefix = this.$store.state.account.profile.comPrefix
      this.formCreate.agentPrefix = this.$store.state.account.profile.agentPrefix
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
