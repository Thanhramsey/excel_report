<template>
  <div>
    <section>
      <section class="mb-5">
        <h2 class="mb-5">Import Báo Cáo</h2>
        <input type="file" @change="onChange" class="mb-5" />
        <xlsx-read :file="file">
          <template #default="{ loading }">
            <span v-if="loading">Loading...</span>
            <xlsx-sheets>
              <template #default="{ sheets }">
                <label style="margin-right: 5px">Chọn sheet</label>
                <select v-model="selectedSheet" class="select-sheet">
                  <option value="">Chọn sheet</option>
                  <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                    {{ sheet }}
                  </option>
                </select>
              </template>
            </xlsx-sheets>
            <xlsx-json
              :sheet="selectedSheet"
              @parsed="updateColecction"
              @table="returnTable"
            >
            </xlsx-json>
          </template>
        </xlsx-read>
      </section>
      <hr class="mb-5" />
      <h2 class="mb-5">Xuất Báo Cáo</h2>

      <!-- <div class="mb-5">Dữ liệu : {{ sheets }}</div> -->
      <table class="mb-5 table">
        <thead>
          <tr>
            <th>{{ tableTitle }}</th>
            <th>Tổng số học sinh</th>
            <th>Có tham gia thi</th>
            <th>Vắng thi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in table" :key="item.a">
            <td>{{ item.a }}</td>
            <td>{{ item.b }}</td>
            <td>{{ item.c }}</td>
            <td>{{ item.d }}</td>
          </tr>
        </tbody>
      </table>
      <h2 class="mb-5">Danh sách vắng</h2>
      <table class="mb-5 table">
        <thead>
          <tr>
            <th>Số thứ tự</th>
            <th>Họ tên</th>
            <th>Cuộc thi</th>
            <th>Lớp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listVangThi" :key="item.__EMPTY_2">
            <td>{{ index + 1 }}</td>
            <td>{{ item.__EMPTY_2 }}</td>
            <td>{{ item.__EMPTY + "Vòng thi: " + item.__EMPTY_1 }}</td>
            <td>{{ item.__EMPTY_4 }}</td>
          </tr>
        </tbody>
      </table>
      <xlsx-workbook>
        <xlsx-sheet
          :collection="sheet.data"
          v-for="sheet in sheets"
          :key="sheet.name"
          :sheet-name="sheet.name"
        />
        <xlsx-sheet
          :collection="jsonFile"
          v-if="jsonFile"
          sheet-name="fromJson"
        />
        <xlsx-download @done="updateColecction">
          <button class="button-77" role="button">Tải về</button>
        </xlsx-download>
      </xlsx-workbook>
    </section>
  </div>
</template>

<script>
import XlsxRead from "./components/XlsxRead";
import XlsxSheets from "./components/XlsxSheets";
import XlsxJson from "./components/XlsxJson2";
import XlsxWorkbook from "./components/XlsxWorkbook";
import XlsxSheet from "./components/XlsxSheet";
import XlsxDownload from "./components/XlsxDownload";

export default {
  components: {
    XlsxRead,
    XlsxSheets,
    XlsxJson,
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload,
  },
  data() {
    return {
      file: null,
      selectedSheet: null,
      sheetName: "Dữ liệu",
      sheets: [],
      collection: [],
      jsonFile: null,
      table: [],
      tableTitle: "Cuộc thi",
      saiMau: false,
      listVangThi: [],
    };
  },
  watch: {
    saiMau: function () {
      if (this.saiMau) {
        this.sheets = [];
        alert("Sai mẫu Excel !!!!");
      }
    },
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      this.collection = [];
      this.table = [];
      this.sheets = [];
      this.saiMau = false;
      this.tableTitle = "Cuộc Thi";
    },
    onJsonFileChange(event) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        console.log(this.jsonFile);
        this.jsonFile = JSON.parse(evt.target.result);
      };
      reader.readAsText(event.target.files[0]);
    },
    updateColecction(data) {
      this.collection = data;
      this.sheets = [];
      this.addSheet();
    },
    returnTable(data) {
      this.table = data.returnTable;
      this.tableTitle = data.title;
      this.saiMau = data.saiMau;
      this.listVangThi = data.listVangThi;
    },
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: this.collection });
    },
  },
};
</script>

<style></style>
