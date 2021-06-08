import React, { useState } from 'react';
import {apiGet} from './api';
import Plot from 'react-plotly.js';
import { getUser } from './utils/common';

const DashboardGraphs = () => {
  const [initDataLongueurs, setInitDataLongueurs] = useState(false);
  const [initDataTemps, setInitDataTemps] = useState(false);
  const [initDataRatio, setInitDataRatio] = useState(false);
  const [dataLongueurs, setDataLongueurs] = useState(getDataLongueurs(initDataLongueurs));
  const [dataTemps, setDataTemps] = useState(getDataTemps(initDataTemps));
  const [dataRatio, setDataRatio] = useState(getDataRatio(initDataRatio));
  
  var responsivewidth = 640;

  if (window.innerWidth < 640)
  {
    responsivewidth = window.innerWidth;
  }

  function getDataLongueurs(init){
    if (init===false) {
    apiGet('piscinesessions/getGraphLongueurs/'+getUser()._id).then(response=>{setDataLongueurs(response.data); setInitDataLongueurs(true);});
    }
  }

  function getDataTemps(init){
    if (init===false) {
    apiGet('piscinesessions/getGraphTemps/'+getUser()._id).then(response=>{setDataTemps(response.data); setInitDataTemps(true);});
    }
  }

  function getDataRatio(init){
    if (init===false) {
    apiGet('piscinesessions/getGraphRatio/'+getUser()._id).then(response=>{setDataRatio(response.data); setInitDataRatio(true);});
    }
  }

  function sec2dt(v) {
    var MIN = 60
    var HOUR = 60 * 60
    
    var h = Math.floor(v / HOUR)
    var m =  Math.floor((v - (h * HOUR)) / MIN)
    var s = Math.floor(v - (h * HOUR) - (m * MIN))
  
    return `2017-01-01 ${h}:${pad(m)}:${pad(s)}`
  }
  
  function pad(v) {
    return v < 10 ? '0' + v : String(v)
  }

  return ( 
      (dataLongueurs != null && dataRatio != null && dataTemps != null && responsivewidth != null) ?
      <div style={{ marginTop: "5px" }}>
      <Plot 
         data={[
          {type: 'bar', x:dataLongueurs.x, y:dataLongueurs.y}
        ]}
        layout={ {width: responsivewidth, height: 480, title: 'Pool lengths per session'} }
      />
      <Plot 
         data={[
          {type: 'bar', x:dataTemps.x, y:dataTemps.y.map(sec2dt)}
        ]}
        layout={ {width: responsivewidth, height: 480, yaxis: {
          tickformat: '%H:%M:%S'
      }, title: 'Time per session'} }
      />
      <Plot 
         data={[
          {type: 'bar', x:dataRatio.x, y:dataRatio.y}
        ]}
        layout={ {width: responsivewidth, height: 480, title: 'Pool lengths/Time Ratio per session'} }
      />
    </div> : <h1>Loading</h1>
  );
};

export default DashboardGraphs;