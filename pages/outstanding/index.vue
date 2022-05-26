<template>
  <div>
    <h2>Check Outstanding</h2>

    <v-card class="elevation-3 mt-3">
      <v-card-text class="pa-0 indigo lighten-3 white--text d-sm-flex d-block align-baseline">
        <h2 class="ml-2 pt-3">Outstanding List</h2>
        <v-spacer></v-spacer>
        <div class="col-12 col-sm-4 col-md-3">
          <v-text-field
            v-model="search"
            label="seacrh"
            append-icon="mdi-magnify"
            dense
            solo
            rounded
            hide-details="auto"
          ></v-text-field>
        </div> </v-card-text
      ><v-data-table :headers="headerOutsatanding" :items="itemOutstanding">
        <template #[`item.no`]="{ index }"> {{ index + 1 }}</template></v-data-table
      ></v-card
    >
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
          cellClass: ' font-weight-bold',
          width: '75px',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Username',
          value: 'username',
          cellClass: ' font-weight-bold',
          sortable: false,
        },
        {
          text: 'Outstanding',
          value: 'Outstanding',

          cellClass: ' font-weight-bold',
          sortable: false,
        },
      ],
      itemOutstanding: [
        {
          username: 'UA1111111',
          Outstanding: 20.12,
        },
        {
          username: 'UA111333',
          Outstanding: 135.12,
        },
        {
          username: 'UA1111555',
          Outstanding: 2000.12,
        },
      ],
    }
  },
}
</script>

<style></style>
