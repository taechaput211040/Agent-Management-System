<template>
  <v-card tile outlined>
    <v-card-text
      v-if="!hiddenDefaultTitle"
      class="bg-condition text-white py-2 px-8 d-flex align-center justify-space-between min-height"
    >
      <slot name="title">
        <p class="font-weight-black body-1 title">
          {{ title }}
        </p>
      </slot>
      <div class="d-flex" v-if="search">
        <v-select
          :items="
            headers
              .filter((h) => h.search)
              .map((h) => ({ value: h.value, text: h.text.toLowerCase() }))
          "
          class="mini-auto select-width body-2 mr-2"
          placeholder="Select Column"
          background-color="white"
          item-text="text"
          item-value="value"
          solo
          single-line
          return-object
          height="34px"
          clearable
          dense
          hide-details
          v-model="search_column"
        >
        </v-select>
        <v-text-field
          class="mini-auto body-2 search-width"
          single-line
          placeholder="Search"
          background-color="white"
          solo
          height="34px"
          dense
          hide-details
          v-model="keyword"
        >
          <template #append>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </div>
    </v-card-text>
    <div v-if="title_content" style="height: 160px" class="px-4">
      <slot name="title-content" />
    </div>
    <v-data-table
      :value="value"
      :class="'cmm-data-table '.concat(tableClass)"
      :loading="loading"
      :item-key="itemKey"
      :expanded.sync="expanded"
      :items="items"
      :headers="headers"
      :hide-default-footer="true"
      :hide-default-header="hideDefaultHeader"
      dense
      :page.sync="pagination_data.page"
      :items-per-page="pagination_data.itemsPerPage"
      @page-count="pageCount"
      :search="keyword"
      :custom-filter="search_column ? columnFilter : defaultFilter"
      :show-select="showSelect"
      :single-select="singleSelect"
      @input="select"
      :height="calc_height($vuetify.application.top)"
      :selectable-key="selectKey"
      @item-selected="item_select"
    >
      <template
        v-for="(header, i) in headers"
        :slot="`item.${header.value}`"
        slot-scope="slotData"
      >
        <slot v-if="header.to && !loading" :name="`item.${header.value}`">
          <nuxt-link :to="header.to(slotData.item)">
            {{
              header.format
                ? header.format(
                    slotData.item,
                    items,
                    slotData.index,
                    rowHeaders ? rowHeaders[slotData.index]['value'] : null
                  )
                : slotData.item[header.value]
            }}
          </nuxt-link>
        </slot>
        <slot
          v-else-if="!loading"
          :name="`item.${header.value}`"
          v-bind="{
            ...slotData,
            toggle: () => toggle(slotData.item[itemKey], header.value),
            isExpand: expanded_data[slotData.item[itemKey]]
              ? expanded_data[slotData.item[itemKey]]['column'] == header.value
                ? true
                : false
              : false,
          }"
        >
          {{
            header.format
              ? header.format(
                  slotData.item,
                  items,
                  slotData.index,
                  rowHeaders ? rowHeaders[slotData.index]['value'] : null
                )
              : slotData.item[header.value]
          }}
        </slot>
        <v-skeleton-loader v-else type="text" :key="i" />
      </template>

      <template v-for="(header, i) in headers" :slot="`header.${header.value}`">
        {{
          header.format_header
            ? header.format_header(items ? items : header.text)
            : header.text
        }}
        <v-menu
          v-if="header.search"
          :close-on-click="true"
          :close-on-content-click="false"
          bottom
          left
          :key="i"
          rounded
          fixed
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" v-on="on" v-bind="attrs" :key="`b${i}`" icon>
              <v-icon x-small>mdi-filter</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item-group multiple v-model="activeitems[header.value]">
              <template v-for="item in filtermenu[header.value]">
                <v-list-item :key="`${item}`" dense class="py-0" :value="item">
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="item"
                        @click="toggle"
                        dense
                      ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title v-text="item" />
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </template>

      <template
        v-if="useCustomBodySelect"
        #[`item.data-table-select`]="slotData"
      >
        <slot name="item.data-table-select" v-bind="slotData" />
      </template>

      <template
        v-if="useCustomHeadSelect"
        #[`header.data-table-select`]="slotData"
      >
        <slot name="header.data-table-select" v-bind="slotData" />
      </template>

      <template #[`item.no`]="slotData">
        <slot v-if="!loading" :name="`item.no`" v-bind="slotData">
          {{
            pagination_data.itemsPerPage * (pagination_data.page - 1) +
            (slotData.index + 1)
          }}
        </slot>
        <v-skeleton-loader v-else type="text" />
      </template>

      <template #[`item.actions`]="slotData">
        <slot v-if="!loading" :name="`item.actions`" v-bind="slotData">
          <action
            :actions="actions"
            @handleClick="$emit(`${$event}`, slotData)"
          />
        </slot>
        <v-skeleton-loader v-else type="text" />
      </template>

      <template #[`item.status`]="slotData">
        <slot v-if="!loading" :name="`item.status`" v-bind="slotData">
          <v-icon :color="slotData.item.status.toLowerCase()" small
            >mdi-circle</v-icon
          >
          {{ slotData.item.status }}
        </slot>
        <v-skeleton-loader v-else type="text" />
      </template>

      <template #[`body.append`]="slotData">
        <slot name="footer" v-bind="slotData" />
      </template>

      <!-- expanded -->
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <slot
            v-if="expanded_data[item[itemKey]]"
            :name="`expanded-item.${expanded_data[item[itemKey]]['column']}`"
            v-bind="{ headers, item }"
          />
        </td>
      </template>
      <!-- end expanded -->
    </v-data-table>

    <div class="d-flex justify-space-between align-center">
      <div class="flex-grow-1">
        <v-select
          :items="[10, 20, 30, 50, 80, 130]"
          class="mini-auto select-width body-2 mr-2"
          background-color="white"
          solo
          single-line
          return-object
          height="34px"
          dense
          hide-details
          type="number"
          v-if="pagination"
          v-model="pagination_data.itemsPerPage"
          @input="
            pageChange(pagination_data.page, pagination_data.itemsPerPage)
          "
        />
      </div>
      <div>
        <v-pagination
          v-model="pagination_data.page"
          :length.sync="pagination_data.pageCount"
          class=""
          v-if="pagination"
          color="primary"
        
          :total-visible="totalVisible"
          @input="
            pageChange(pagination_data.page, pagination_data.itemsPerPage)
          "
        ></v-pagination>
      </div>
      <div class="flex-grow-1">
        <slot name="footer-right" />
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    title_content: {
      type: Boolean,
      default: () => true,
    },
    value: {
      required: false,
    },
    title: {
      type: String,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    rowHeaders: {
      type: Array,
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemKey: {
      type: String,
    },
    actions: Array,
    hideDefaultFooter: {
      type: Boolean,
      default: () => false,
    },
    hideDefaultHeader: {
      type: Boolean,
      default: () => false,
    },
    hiddenDefaultTitle: {
      type: Boolean,
      default: () => false,
    },
    page: {
      type: Object,
      default: () => ({
        page_size: 50,
        page_count: 1,
        page: 1,
      }),
    },
    showSelect: {
      type: Boolean,
      default: () => false,
    },
    singleSelect: {
      type: Boolean,
      default: () => false,
    },
    search: {
      type: Boolean,
      default: () => false,
    },
    pagination: {
      type: Boolean,
      default: () => false,
    },
    tableClass: {
      type: String,
      default: () => '',
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    totalVisible: {
      type: Number,
      default: () => 7,
    },
    singleExpand: {
      type: Boolean,
      default: () => true,
    },
    useServerPagination: {
      type: Boolean,
      default: () => false,
    },
    activeitems: Object,
    selectKey: {
      type: String,
      default: () => null,
    },
    useCustomBodySelect: {
      type: Boolean,
      default: () => false,
    },
    useCustomHeadSelect: {
      type: Boolean,
      default: () => false,
    },
  },
  watch: {
    page: {
      handler: function (value) {
        this.pagination_data.pageCount = value.page_count
      },
      deep: true,
    },
    items: function () {
      this.initial_filter()
    },
  },
  data() {
    return {
      expanded: [],
      expanded_data: {},
      pagination_data: {
        page: this.page.page,
        pageCount: this.page.page_count,
        itemsPerPage: this.page.page_size,
      },
      select_value: this.value,
      keyword: '',
      search_column: null,
      filtermenu: {},
      filter_head: [],
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.initial_filter()
    })
  },
  methods: {
    calc_height: function (top) {
      //100vh - #appbar - #title-content - #data-table-title - #footer + error
      return `calc(100vh - ${top}px - 160px - 56px - 59px - 36px + 13.41px)`
    },
    initial_filter: function () {
      this.headers
        .filter((h) => h.search)
        .map((h) => h.value)
        .forEach((h) => {
          console.log(h)
          this.$set(
            this.activeitems,
            h,
            this.filterUnique(this.items, h).map((m) => m[h])
          )
          this.$set(
            this.filtermenu,
            h,
            this.filterUnique(this.items, h).map((m) => m[h])
          )
        })
      this.$emit('update:activeitems', this.activeitems)
    },
    filterUnique: function (items, key) {
      var arr = []
      for (let i = 0; i < items.length; i++) {
        if (arr.findIndex((a) => a[key] == items[i][key]) == -1) {
          arr.push(items[i])
        }
      }
      return arr
    },
    columnFilter: function (value, search, item) {
      return (
        String(item[this.search_column.value])
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
      )
    },
    defaultFilter: function (value, search) {
      return (
        value != null &&
        search != null &&
        typeof value !== 'boolean' &&
        value
          .toString()
          .toLocaleLowerCase()
          .indexOf(search.toLocaleLowerCase()) !== -1
      )
    },
    select: function (e) {
      console.log(e)
      this.$emit('input', e)
    },
    item_select: function (e) {
      this.$emit('item-select', e)
    },
    toggle: function (value, column) {
      if (this.expanded_data[value]) {
        if (this.expanded_data[value]['column'] == column) {
          delete this.expanded_data[value]
          this.expanded = Object.keys(this.expanded_data).map((_e) => ({
            [this.itemKey]: _e,
          }))
          return
        }
      }
      if (this.singleExpand) {
        this.expanded_data = { [value]: { column } }
      } else {
        Object.assign(this.expanded_data, { [value]: { column } })
      }
      this.expanded = Object.keys(this.expanded_data).map((_e) => ({
        [this.itemKey]: _e,
      }))
    },
    pageChange(currentPage, itemPerPage) {
      this.$emit('page-change', {
        page_size: itemPerPage,
        page: currentPage,
      })
    },
    pageCount(countNum) {
      if (!this.useServerPagination) {
        this.pagination_data.pageCount = countNum
      }
    },
  },
}
</script>

<style scoped>
.select-width {
  max-width: 198px !important;
}

.search-width {
  width: 256px !important;
}

.title {
  margin: 0px;
}

.min-height {
  min-height: 56px !important;
}

.checkbox {
  position: absolute;
}
</style>
