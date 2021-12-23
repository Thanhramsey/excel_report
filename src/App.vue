<template>
  <div class="VueXlsx">
    <v-card height="100%" class="big-card">
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card height="100%" class="big-card">
            <v-card-text>
              <component v-bind:is="item.content"></component>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import BAOCAO1 from "./BAOCAO1";
import BAOCAO2 from "./BAOCAO2";

export default {
  components: {
    BAOCAO1,
    BAOCAO2,
  },
  data() {
    return {
      tableTitle: "Cuộc thi",
      tab: null,
      items: [
        { tab: "Thống kê kết quả thi", content: "BAOCAO1" },
        { tab: "Thống kê tham gia thi", content: "BAOCAO2" },
      ],
    };
  },
  methods: {},
};
</script>

<style>
.big-card {
  /* background-image: #d0d4f1 !important */
  background-image: url("../public/bg.jpg");
}
.v-slide-group__content.v-tabs-bar__content {
  background-color: darkslategray;
}
</style>
