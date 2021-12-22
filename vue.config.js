module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/excel_report/" // Thay tên repository của các bạn vào đây nhé
      : "/",
};
