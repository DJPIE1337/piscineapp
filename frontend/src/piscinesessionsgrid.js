import React, { useState } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {apiPost, apiGet} from './api';
import { getUser } from './utils/common';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function PiscineSessionsGrid() {
  const [init, setInit] = useState(false);
  const [data, setData] = useState(getData(init));

  window.selectedlineid = "NoRow";
  const today = new Date();
  
  var responsivewidth = "100%";

  if (window.innerWidth < 640)
  {
    responsivewidth = window.innerWidth;
  }

    function getData(init){
      if (init===false) {
      apiGet('piscinesessions/list/' + getUser()._id).then(response=>{setData(response.data.piscinesessions); setInit(true);});
      }
    }


    const gridOptions = {
      rowSelection: 'single',
      stopEditingWhenCellsLoseFocus:'true',
      onRowClicked: event => {window.selectedlineid = event.data._id;},
      onCellEditingStopped: event => {
        var selectedline = event.data._id;
        if (event.column.colId === "date"){updateDate(selectedline, event.value);}
        if (event.column.colId === "time"){updateTime(selectedline, event.value);}
        if (event.column.colId === "value"){updateValue(selectedline, event.value);}
      },
  }

    function convertDatetoDDMMYY(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(inputFormat)
      return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
    }

    function convertHHMMSStoSeconds(inputFormat) {
      var a = inputFormat.split(':');
      return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])
    }    

    const updateDate = (selectedline, newdate) => {
      apiPost('piscinesessions/update/' + selectedline, { newdate: newdate }).then(response=>{setInit(false);getData(init);});
    }

    const updateTime = (selectedline, newtime) => {
      console.log(newtime);
      if (convertHHMMSStoSeconds(newtime) > 0) apiPost('piscinesessions/update/' + selectedline, { newtime: newtime }).then(response=>{setInit(false);getData(init);});
    }

    const updateValue = (selectedline, newvalue) => {
      apiPost('piscinesessions/update/' + selectedline, { newvalue: newvalue }).then(response=>{setInit(false);getData(init);});
    }

    const addLine = () => {
      var ajd = convertDatetoDDMMYY(today);
      apiPost('piscinesessions/create', { date: ajd, time: "01:00:00", value: 0, userid: getUser()._id }).then(response=>{setInit(false);getData(init);});
    }

    const deleteLine = () => {
      if (window.selectedlineid !== "NoRow") apiPost('piscinesessions/delete/'+ window.selectedlineid).then(response=>{window.selectedlineid = "NoRow";setInit(false);getData(init);});
    }

    return ( 
        (data != null && init != null && responsivewidth != null) ?
        <div style={{ marginTop: "5px" }}>
        <input type="button" onClick={addLine} value="Add Session"/> 
        <input type="button" onClick={deleteLine} value="Delete Session"/>
        <div className="ag-theme-alpine" style={{ width: responsivewidth }} >
           <AgGridReact gridOptions={gridOptions} rowData={data} domLayout={'autoHeight'} >
               <AgGridColumn headerName="ID" editable={false} field="_id" hide="true" ></AgGridColumn>
               <AgGridColumn headerName="Session date" editable={true} field="date"></AgGridColumn>
               <AgGridColumn headerName="Session time" editable={true} field="time"></AgGridColumn>
               <AgGridColumn headerName="Pool lengths" editable={true} field="value"></AgGridColumn>
               <AgGridColumn headerName="Lengths/Time Ratio" editable={false} field="ratio"></AgGridColumn>
           </AgGridReact>
       </div>
      </div> : <h1>Loading</h1>
    );
  };

export default PiscineSessionsGrid;