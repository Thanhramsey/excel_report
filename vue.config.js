module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/ddd/" // Thay tên repository của các bạn vào đây nhé
      : "/",
};
