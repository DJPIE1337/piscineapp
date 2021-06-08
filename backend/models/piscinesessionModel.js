const mongoose = require("mongoose");
const piscinesessionSchema = new mongoose.Schema({
    date:{type:Date,require:[true,"PiscineSession must have date"],unique:true},
    userid:{type:String, require:[true, "PiscineSession must have user"]},
    time:{type:Number,require:[true,"PiscineSession must have time"]},
    value:{type:Number,require:[true,"PiscineSession must have value"]},
    ratio:{type:Number, require: false }
});
const PiscineSession = mongoose.model("PiscineSession",piscinesessionSchema);
module.exports = PiscineSession;