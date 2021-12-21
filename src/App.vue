<template>
  <div class="VueXlsx">
    <section>
      <section>
        <h2>Import File</h2>
        <input type="file" @change="onChange" class="mb-5" />
        <xlsx-read :file="file">
          <template #default="{ loading }">
            <span v-if="loading">Loading...</span>
            <xlsx-sheets>
              <template #default="{ sheets }">
                <select v-model="selectedSheet">
                  <option value="">Chọn sheet</option>
                  <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                    {{ sheet }}
                  </option>
                </select>
              </template>
            </xlsx-sheets>
            <xlsx-json :sheet="selectedSheet" @parsed="updateColecction">
            </xlsx-json>
          </template>
        </xlsx-read>
      </section>
      <hr />
      <h2>Xuất file</h2>
      <div>
        <button v-if="sheetName" @click="addSheet" class="mb-5">
          Tạo dữ liệu
        </button>
      </div>

      <div class="mb-5">Dữ liệu : {{ sheets }}</div>
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
          <button>Tải về</button>
        </xlsx-download>
      </xlsx-workbook>
    </section>
  </div>
</template>

<script>
import XlsxRead from "./components/XlsxRead";
import XlsxSheets from "./components/XlsxSheets";
import XlsxJson from "./components/XlsxJson";
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
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
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
    },
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] });
    },
  },
};
</script>

<style>
.mt-5 {
  margin-top: 10px;
}
.mb-5 {
  margin-bottom: 10px;
}

.VueXlsx {
  background-color: antiquewhite;
  height: 100vh;
  padding: 50px;
}
</style>
