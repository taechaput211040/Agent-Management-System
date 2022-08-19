<template>
  <div>
    <h2 class="mb-4 text-center">Create Pallete</h2>
    <div class="elevation-3 py-5">
      <v-form class="">
        <div class="row justify-center pa-5">
          <div class="row col-12 col-sm-12 col-lg-8">
            <div class="col-12 col-sm-5 pa-1 formCreateClass">
              Domain
              <v-text-field
                prepend-inner-icon
                hide-details="auto"
                v-model="form.domain"
                placeholder="domain"
                dense
                outlined
              >
                <template slot="prepend-inner"
                  ><div>
                    <v-select
                      style="width: 120px"
                      :items="itemHttp"
                      dense
                      outlined
                      hide-details="auto"
                      v-model="selectHttp"
                    ></v-select></div
                ></template>
              </v-text-field>
            </div>
            <div class="col-12 col-sm-3 pa-1">
              Company
              <v-text-field
                hide-details="auto"
                placeholder="company"
                v-model="form.company"
                dense
                required
                outlined
              ></v-text-field>
            </div>
            <div class="col-12 col-sm-4 pa-1">
              LOGO <b class="error--text">(*jpg,webp,png)</b>
              <v-file-input
                hide-details="auto"
                outlined
                dense
                v-model="form.logo"
                show-size
                small-chips
                truncate-length="8"
                placeholder="select file"
              ></v-file-input>
            </div>
          </div>
        </div>
        <div class="text-center">
          <v-btn color="success" @click="CreatePalette()">Create</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      itemHttp: ['https://', 'http://'],
      selectHttp: 'https://',
      form: {},
    }
  },
  methods: {
    ...mapActions('account', ['CreateOrganizePalette', 'CreatePreset']),
    async CreatePalette() {
      try {
        this.$swal({
          title: 'Are you sure you want to Restore Pallete ?',
          icon: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // console.log(this.formCreate)
            try {
              let organize = {
                domain: `${this.selectHttp}${this.form.domain}`,
                company: this.form.company,
                agent: this.form.agent,
                status: true,
              }
              let { data } = await this.CreateOrganizePalette(organize)
              console.log(data)
              this.$swal({
                icon: 'success',
                title: 'Restore Pallete Success',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500,
              }).then(async (result) => {
                if (result) {
                  let body = { id: data.id, detail: this.$store.state.palette }
                  console.log(body, 'body')
                  //refreshandredirect/
                  await this.CreatePreset(body)
                }
              })
            } catch (error) {
              this.$swal({
                icon: 'error',
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500,
              })
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
