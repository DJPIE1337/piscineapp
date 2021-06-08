const PiscineSession = require("../models/piscinesessionModel");

    //Date to DD-MM-YY
function convertDatetoDDMMYY(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
  }

    //DD-MM-YY to Date
function convertDDMMYYtoDate(inputFormat) {
    var myDate = inputFormat.split("-");
    return new Date( myDate[2], myDate[1] - 1, myDate[0]);
  }

    //HH-MM-SS to Seconds
function convertHHMMSStoSeconds(inputFormat) {
    var a = inputFormat.split(':');
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])
  }

    //Seconds to HH-MM-SS
function convertSecondstoHHMMSS(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
   hours = Math.floor(inputFormat / 3600);
   inputFormat %= 3600;
   minutes = Math.floor(inputFormat / 60);
   seconds = inputFormat % 60;
   return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
  }

exports.getAllPiscineSessions = async (req, res, next) => {
    try{ 
           const piscinesessions = await PiscineSession.find({userid: req.params.userid}).sort({date: 'desc'});
           for (x in piscinesessions) {
            var target = {ratio : piscinesessions[x].value/(piscinesessions[x].time/100)};
            piscinesessions[x] = Object.assign(piscinesessions[x]._doc, target);
            piscinesessions[x].time = convertSecondstoHHMMSS(piscinesessions[x].time)
            piscinesessions[x].date = convertDatetoDDMMYY(piscinesessions[x].date);
            }
           res.status(200).json({
            status: 'Success',
            results: piscinesessions.length,
            
            data: {piscinesessions: piscinesessions} 
        });
        }
    catch (e) { res.status(400).json({status: "Fail"});}
}

exports.getGraphLongueurs = async (req, res) => {
    try{ 
        const piscinesessions = await PiscineSession.find({userid: req.params.userid}).sort({date: 'asc'});
        var xvalues = [];
        var yvalues = [];
        for (i in piscinesessions) {
         xvalues[i] = convertDatetoDDMMYY(piscinesessions[i].date);
         yvalues[i] = piscinesessions[i].value;
        }
        res.status(200).json({
         status: 'Success',
         data: {x: xvalues, y: yvalues} 
     });
     }
 catch (e) { res.status(400).json({status: "Fail"});}
}

exports.getGraphTemps = async (req, res) => {
    try{ 
        const piscinesessions = await PiscineSession.find({userid: req.params.userid}).sort({date: 'asc'});
        var xvalues = [];
        var yvalues = [];
        for (i in piscinesessions) {
         xvalues[i] = convertDatetoDDMMYY(piscinesessions[i].date);
         yvalues[i] = piscinesessions[i].time;
        }
        res.status(200).json({
         status: 'Success',
         data: {x: xvalues, y: yvalues} 
     });
     }
 catch (e) { res.status(400).json({status: "Fail"});}
}

exports.getGraphRatio = async (req, res) => {
    try{ 
        const piscinesessions = await PiscineSession.find({userid: req.params.userid}).sort({date: 'asc'});
        var xvalues = [];
        var yvalues = [];
        for (i in piscinesessions) {
         xvalues[i] = convertDatetoDDMMYY(piscinesessions[i].date);
         yvalues[i] = piscinesessions[i].value/piscinesessions[i].time;
        }
        res.status(200).json({
         status: 'Success',
         data: {x: xvalues, y: yvalues} 
     });
     }
 catch (e) { res.status(400).json({status: "Fail"});}
}

exports.getOnePiscineSession = async (req, res, next) => {
    try{ 
           const piscinesession = await PiscineSession.findById(req.params.id);
           var target = {ratio : piscinesession.value/(piscinesession.time/100)};
           piscinesession = Object.assign(piscinesession._doc, target);
           piscinesession.time = convertSecondstoHHMMSS(piscinesession.time)
           piscinesession.date = convertDatetoDDMMYY(piscinesession.date);
           res.status(200).json({
            status: 'Success',
            data: {piscinesession: piscinesession} 
        });
        }
    catch (e) { res.status(400).json({status: "Fail"});}
}

exports.createPiscineSession = async (req, res, next) => {
    try{ 
        req.body.date = convertDDMMYYtoDate(req.body.date)
        req.body.time = convertHHMMSStoSeconds(req.body.time);
        req.body.ratio = req.body.value/(req.body.time/100);
        const piscinesession = await PiscineSession.create(req.body);
           res.status(200).json({
            status: 'Success',
            data: {piscinesession: piscinesession} 
        });
        }
    catch (e) { res.status(400).json({status: "Fail"});}
}

exports.updatePiscineSession = async (req, res, next) => {
    try{ 
        const {newdate, newtime, newvalue} = req.body;
        const sessiontoupdate = await PiscineSession.findOne({_id: req.params.id});
        var updatedate = "01-01-0001";
        var updatetime = "01:00:00";
        var updatevalue = 0;
        if(!newdate){updatedate = sessiontoupdate.date;}
        else {updatedate = convertDDMMYYtoDate(newdate);}
        if (!newtime){updatetime = sessiontoupdate.time;}
        else{updatetime = convertHHMMSStoSeconds(newtime);}
        if (!newvalue){updatevalue = sessiontoupdate.value;}
        else {updatevalue = newvalue}
        var updateratio = updatevalue/(updatetime/100);
        var updateuserid = sessiontoupdate.userid;
        const piscinesession = await PiscineSession.findByIdAndUpdate(req.params.id, {date: updatedate, time: updatetime, value: updatevalue, ratio: updateratio, userid: updateuserid}, {new: true, runValidators: true});
           res.status(200).json({
            status: 'Success',
            data: {piscinessession: piscinesession} 
        });
        }
    catch (e) { res.status(400).json({status: "Fail"});}
}

exports.deletePiscineSession = async (req, res, next) => {
    try{ 
           const piscinesession = await PiscineSession.findByIdAndDelete(req.params.id);
           res.status(200).json({
            status: 'Success'
        });
        }
    catch (e) { res.status(400).json({status: "Fail"});}
}