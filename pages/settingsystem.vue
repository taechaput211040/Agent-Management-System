<template>
  <div>
    <loading-page v-if="isLoading"></loading-page>
    <h1 class="text-center mt-2">ตั้งค่าระบบ</h1>
    <v-form ref="form" :disabled="$store.state.auth.username !== 'smart'">
      <div class="row">
        <div class="col-12 col-sm-6">
          <v-card class="pa-3 mt-3 rounded-lg elevation-3">
            <v-card-title class="justify-center">ข้อมูล Prefix</v-card-title>
            <div class="row">
              <div class="col-12 col-sm-6">
                Company
                <v-text-field
                  :rules="[(v) => !!v || ' Company is required']"
                  dense
                  hide-details="auto"
                  outlined
                  v-model="form.company"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Agent Username
                <v-text-field
                  :rules="[(v) => !!v || ' Agent Username is required']"
                  dense
                  hide-details="auto"
                  outlined
                  v-model="form.agent_username"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                System Status
                <v-switch dense hide-details="auto" v-model="form.system_status"></v-switch>
              </div>
            </div>
          </v-card>
        </div>
        <div class="col-12 col-sm-6">
          <v-card class="pa-3 mt-3 rounded-lg elevation-3">
            <v-card-title class="justify-center">ข้อมูลเว็ปไซต์</v-card-title>
            <div class="row">
              <div class="col-12 col-sm-6">
                Static Hash
                <v-text-field dense hide-details="auto" outlined v-model="form.static_hash"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Provider Hash
                <v-text-field dense hide-details="auto" outlined v-model="form.provider_hash"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Company Name
                <v-text-field dense hide-details="auto" outlined v-model="form.company_name"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Member Link
                <v-text-field dense hide-details="auto" outlined v-model="form.member_link"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Auto Link
                <v-text-field dense hide-details="auto" outlined v-model="form.auto_link"></v-text-field>
              </div>
            </div>
          </v-card>
        </div>
        <div class="col-12 col-sm-6">
          <v-card class="pa-3 mt-3 rounded-lg elevation-3">
            <v-card-title class="justify-center">ข้อมูลระบบ</v-card-title>
            <div class="row">
              <div class="col-12 col-sm-6">
                Company Name
                <v-text-field
                  :rules="[(v) => !!v || '  Company Name is required']"
                  dense
                  hide-details="auto"
                  outlined
                  v-model="form.companyname"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Company URL
                <v-text-field dense hide-details="auto" outlined v-model="form.companyurl"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Company Line URL
                <v-text-field dense hide-details="auto" outlined v-model="form.companynlineurl"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Company Key
                <v-text-field dense hide-details="auto" outlined v-model="form.companykey"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Lease Withdraw Credit
                <v-text-field dense hide-details="auto" outlined v-model="form.least_wd_credits"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Withdraw Auto Amount
                <v-text-field dense hide-details="auto" outlined v-model="form.wd_auto_amount"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Member Site Name
                <v-text-field dense hide-details="auto" outlined v-model="form.member_site_name"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                LOGO URL
                <v-text-field dense hide-details="auto" outlined v-model="form.member_logo_url"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Line Name
                <v-text-field dense hide-details="auto" outlined v-model="form.line_name"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Token
                <v-text-field dense hide-details="auto" outlined v-model="form.token"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Register Link
                <v-text-field dense hide-details="auto" outlined v-model="form.register_link"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Login Link
                <v-text-field dense hide-details="auto" outlined v-model="form.login_link"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Rico ID
                <v-text-field dense hide-details="auto" outlined v-model="form.rico_id"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Hash
                <v-text-field dense hide-details="auto" outlined v-model="form.hash"></v-text-field>
              </div></div
          ></v-card>
        </div>
        <div class="col-12 col-sm-6">
          <v-card class="pa-3 mt-3 rounded-lg elevation-3">
            <v-card-title class="justify-center">ข้อมูลการฝาก-ถอน</v-card-title>
            <div class="row">
              <div class="col-12 col-sm-6">
                เทิร์นเมื่อไม่รับโบนัส
                <v-text-field dense hide-details="auto" outlined v-model="form.turnNobonus"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                ถอนออโต้ทั้งระบบ
                <v-switch dense hide-details="auto" outlined v-model="form.wdautoAll"></v-switch>
              </div>
              <div class="col-12 col-sm-6">
                อั้นจำนวนครั้งในการถอนต่อวัน
                <v-text-field dense hide-details="auto" outlined v-model="form.wdlimitTime"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                อั้นถอนต่อวัน
                <v-switch dense hide-details="auto" outlined v-model="form.wdlimit"></v-switch>
              </div>
              <div class="col-12 col-sm-6">
                จำนวนเงินที่อั้นถอนต่อวันต่อคน
                <v-text-field dense hide-details="auto" outlined v-model="form.wdlimitcredit"></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Withdraw When Outstanding
                <v-switch dense hide-details="auto" outlined v-model="form.wdwhenoutstanding"></v-switch>
              </div></div
          ></v-card>
        </div>
      </div>
      <div class="mt-3 text-center">
        <v-btn @click="setUpconfig()" :disabled="$store.state.auth.username !== 'smart'" large color="success"
          >ตั้งค่าระบบ</v-btn
        >
      </div>
    </v-form>

    <v-dialog max-width="800" v-model="dlResultSetup">
      <v-card>
        <v-card-title primary-title class="justify-center"> Setup Process </v-card-title>
        <div class="pa-3">
          <div class="row pa-2 font-weight-bold primary--text text-decoration-underline">
            <div class="col-4">System</div>
            <div class="col-4">status</div>
            <div class="col-4">detail</div>
          </div>
          <v-card
            class="my-1 pa-2 rounded-lg elevation-lg"
            v-for="(item, i) in resSetup"
            :key="i"
            v-if="i !== 'result'"
          >
            <div class="row">
              <div class="col-4">
                <div class="font-weight-bold">{{ i }}</div>
              </div>
              <div class="col-4" v-for="(obj, j) in item" :key="j">
                <v-chip small color="success" v-if="obj === 'ok'"><v-icon left>mdi-check-bold</v-icon> OK</v-chip>
                <v-chip small color="error" v-else-if="obj === 'error'"
                  ><v-icon left>mdi-close-thick</v-icon> ERROR</v-chip
                >
                <span v-else>{{ obj }}</span>
              </div>
            </div>
          </v-card>
        </div>
        <v-card-actions class="justify-center">
          <v-btn color="error" @click="dlResultSetup = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import loadingPage from '~/components/form/loadingPage.vue'
export default {
  components: { loadingPage },
  data() {
    return {
      isLoading: false,
      dlResultSetup: false,
      resSetup: {},
      form: {
        turnNobonus: 0,
        wdautoAll: false,
        wdlimitTime: 0,
        wdlimit: false,
        wdlimitcredit: 0,
        wdwhenoutstanding: false,

        companyname: 'AA',
        companyurl: 'https://XXXXX.com',
        companynlineurl: 'https://line.me/ti/p/~@line_id',
        companykey: 'KAAAAA',
        least_wd_credits: 0,
        wd_auto_amount: 0,
        member_site_name: 'member.XXXXX.com',
        member_logo_url: 'https://smart-binary.cloud/storage/XXXXX/logo/logo.pn',
        line_name: '@line_id',
        token: '',
        register_link: 'https://member.XXXXX.com/register',
        login_link: 'https://member.XXXXX.com/login',
        rico_id: 1,
        hash: '379cb12d6e1b3d7a5e295059ba623071',

        company: 'sm',
        agent_username: 'AA',
        system_status: true,

        static_hash: '3932196b5c05bb7ac5a4b932521d0b61',
        provider_hash: 'f3a228aec76cee06e5cb783c43efe8e5',
        company_name: 'Smartbet',
        member_link: 'https://member.XXXXX.com',
        auto_link: 'https://rico.XXXXX.com',
      },
    }
  },
  methods: {
    async setUpconfig() {
      if (this.$refs.form.validate()) {
        try {
          this.$swal({
            title: 'Setup System??',
            icon: 'warning',
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
          }).then(async (result) => {
            if (result.isConfirmed) {
              this.isLoading = true
              let res = await this.$store.dispatch('downline/configSystem', this.form)
              await this.handleRessetup(res.data)
              this.isLoading = false
            }
          })
        } catch (error) {
          console.log(error)
          this.isLoading = false
        }
      }
    },
    handleRessetup(res) {
      this.resSetup = res
      this.dlResultSetup = true
    },
  },
}
</script>

<style></style>
