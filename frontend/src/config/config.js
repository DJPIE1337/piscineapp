module.exports = {
    PORT: process.env.PORT || 4000,
    APIURL: "http://"+process.env.APIURL || "http://localhost:3000/api/v1/",
    ISPROD: process.env.ISPROD || false
}