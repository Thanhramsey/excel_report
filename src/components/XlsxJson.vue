<script>
import SheetTo from "../mixins/SheetTo";

export default {
  mixins: [SheetTo],
  data() {
    return {
      collection: null,
    };
  },
  mounted() {
    this._callBack = this.updateJson;
    this.load();
  },
  methods: {
    async load() {
      const {
        utils: { sheet_to_json },
      } = await import("xlsx");
      this._sheet_to_json = sheet_to_json;
      this.loaded = true;
    },
    updateJson(workbook) {
      const ws = workbook.Sheets[this.sheetNameFinder(workbook)];
      this.collection = this._sheet_to_json(ws, this.options);
      var duoi5 = [];
      var tu5Den65 = [];
      var tu65Den8 = [];
      var tu8Den10 = [];
      console.log(ws);
      console.log(this.collection);
      for (let i = 4; i < this.collection.length; i++) {
        let item = this.collection[i];
        if (item["__EMPTY_9"] < 5 || item["__EMPTY_9"] == "-") {
          duoi5.push(item["__EMPTY_9"]);
        } else if (item["__EMPTY_9"] >= 5 && item["__EMPTY_9"] < 6.5) {
          tu5Den65.push(item["__EMPTY_9"]);
        } else if (item["__EMPTY_9"] >= 6.5 && item["__EMPTY_9"] < 8) {
          tu65Den8.push(item["__EMPTY_9"]);
        } else {
          tu8Den10.push(item["__EMPTY_9"]);
        }
      }
      var text = this.collection[1];
      var string = text["THỐNG KÊ KẾT QUẢ CHI TIẾT HỌC VIÊN THAM GIA CUỘC THI"];
      var returnJson = [
        {
          [string]: "Số thí sinh",
          "Dưới 5:": duoi5.length + " Học sinh",
          "Từ 5 đến 6.5:": tu5Den65.length + " Học sinh",
          "Từ 6.5 đến 8:": tu65Den8.length + " Học sinh",
          "Từ 8 đến 10:": tu8Den10.length + " Học sinh",
        },
        {
          [string]: "Tỉ lệ %",
          "Dưới 5:":
            parseFloat(
              (duoi5.length / (this.collection.length - 4)) * 100
            ).toFixed(2) + "%",
          "Từ 5 đến 6.5:":
            parseFloat(
              (tu5Den65.length / (this.collection.length - 4)) * 100
            ).toFixed(2) + "%",
          "Từ 6.5 đến 8:":
            parseFloat(
              (tu65Den8.length / (this.collection.length - 4)) * 100
            ).toFixed(2) + "%",
          "Từ 8 đến 10:":
            parseFloat(
              (tu8Den10.length / (this.collection.length - 4)) * 100
            ).toFixed(2) + "%",
        },
      ];
      this.$emit("parsed", returnJson);
    },
  },
  render(h) {
    if (this.$scopedSlots.default && this.loaded) {
      return h("div", [
        this.$scopedSlots.default({
          collection: this.collection,
        }),
      ]);
    }
    return null;
  },
};
</script>
