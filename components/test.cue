

        <!-- <div class="mx-auto mt-5 justify-center white rounded-lg classtable">
          <v-data-table
            :headers="headers"
            :items="reportdata"
            hide-default-header
            :page.sync="pagination.page"
            :items-per-page="pagination.rowsPerPage"
          >
            <template v-slot:header>
              <thead class="v-data-table-header">
                <tr>
                  <th rowspan="1" colspan="4" class="bg-blue-9 text-white">
                    ยูสเซอร์เนม
                  </th>
                  <th colspan="1" class="bg-blue-10 text-white">สมาชิก</th>
                  <th colspan="1" class="bg-blue-10 text-white">เอเย่น</th>
                  <th
                    colspan="1"
                    class="bg-blue-10 text-white"
                    v-if="role <= 5"
                  >
                    {{ 4 >= role ? "ซีเนียร์" : "คอมปะนี" }}
                  </th>
                  <th
                    colspan="1"
                    class="bg-blue-10 text-white"
                    v-if="role <= 4"
                  >
                    {{ 3 >= role ? "ผู้ถือหุ้น" : "คอมปะนี" }}
                  </th>
                  <th
                    colspan="1"
                    class="bg-blue-10 text-white"
                    v-if="role <= 3"
                  >
                    {{ 2 >= role ? "คอมปะนี" : "คอมปะนี" }}
                  </th>
                  <th
                    colspan="1"
                    class="bg-blue-10 text-white"
                    v-if="role <= 2"
                  >
                    {{ 2 >= role ? "Smart Bet" : "คอมปะนี" }}
                  </th>
                </tr>
                <tr>
                  <th class="color_subtitle">
                    username
                  </th>
                  <th class="color_subtitle">
                    Bet
                  </th>
                  <th class="color_subtitle">
                    Turn Over
                  </th>
                  <th class="color_subtitle">
                    Payout
                  </th>
                  <th
                    class="color_winlose"
                    v-for="index in role < 2 ? 6 : 6 - role + 2"
                    :key="index"
                  >
                    W/L
                  </th>
                </tr>
              </thead>
            </template>
            <template v-slot:body>
              <td v-if="isLoading" colspan="100%">
                <div class="center">
                  <div class="lds-hourglass"></div>

                  <div>loading...</div>
                </div>
              </td>

              <tbody v-if="!isLoading">
                <tr v-for="(item, index) in reportdata" :key="index">
                  <td class="d-flex justify-center text-center usertext pa-2">
                    <div
                      class="cursor-pointer"
                      @click="isClick ? handleClickUserName(item) : null"
                      style="justify-content: center;align-items: center;display: flex;"
                    >
                      {{ item.username }}
                    </div>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      x-small
                      color="grey darken-2"
                      @click="handleClickCopy(item.username)"
                    >
                      <v-icon>
                        mdi-content-copy
                      </v-icon>
                    </v-btn>
                  </td>

                  <td class="text-center  pa-2">
                    {{ getBTPdata("bet", item.report) }}
                  </td>
                  <td class="text-center  pa-2">
                    {{ getBTPdata("turnover", item.report) }}
                  </td>
                  <td class="text-center  pa-2">
                    {{ getBTPdata("payout", item.report) }}
                  </td>
                  <td
                    class="text-center"
                    :class="bgFunc(getWinLose(6, item.report))"
                  >
                    {{ getWinLose(6, item.report) }}
                  </td>
                  <td
                    class="text-center"
                    :class="bgFunc(getWinLose(5, item.report))"
                  >
                    {{ getWinLose(5, item.report) }}
                  </td>
                  <td
                    class="text-center"
                    v-if="role <= 5"
                    :class="bgFunc(getWinLose(4, item.report))"
                  >
                    {{ getWinLose(4, item.report) }}
                  </td>
                  <td
                    class="text-center"
                    v-if="role <= 4"
                    :class="bgFunc(getWinLose(3, item.report))"
                  >
                    {{ getWinLose(3, item.report) }}
                  </td>
                  <td
                    class="text-center"
                    v-if="role <= 3"
                    :class="bgFunc(getWinLose(2, item.report))"
                  >
                    {{ getWinLose(2, item.report) }}
                  </td>
                  <td
                    class="text-center"
                    v-if="role <= 2"
                    :class="bgFunc(getWinLose(1, item.report))"
                  >
                    {{ getWinLose(1, item.report) }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </div> -->