import React, { useState } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {apiPost} from './api';
import { getUser } from './utils/common';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function AdminGrid() {
    const [init, setInit] = useState(false);
    const [data, setData] = useState(getData(init));

    window.selectedlineid = "NoRow";

    var responsivewidth = "100%";

   if (window.innerWidth < 640)
    {
      responsivewidth = window.innerWidth;
    }

    function getData(init){
      if (init===false) {
        apiPost('users/list', { requestinguserid: getUser()._id, requestinguserpassword: getUser().password }).then(response=>{setData(response.data.data.users); setInit(true);});
      }
    }

    const gridOptions = {
      rowSelection: 'single',
  
      onRowClicked: event => {window.selectedlineid = event.data._id;},
      onCellEditingStopped: event => {
        var selectedline = event.data._id;
        if (event.column.colId === "name"){updateName(selectedline, event.value);}
        if (event.column.colId === "password"){updatePassword(selectedline, event.value);}
        if (event.column.colId === "adminrights"){updateAdminRights(selectedline, event.value);}
        }
    }

    const updateName = (selectedline, newname) => {
      apiPost('users/update/' + selectedline, { newname: newname, requestinguserid: getUser()._id, requestinguserpassword: getUser().password }).then(response=>{setInit(false);getData(init);});
    }

    const updatePassword = (selectedline, newpassword) => {
      apiPost('users/update/' + selectedline, { newpassword: newpassword, requestinguserid: getUser()._id, requestinguserpassword: getUser().password }).then(response=>{setInit(false);getData(init);});
    }

    const updateAdminRights = (selectedline, newadminrights) => {
      apiPost('users/update/' + selectedline, { newadminrights: newadminrights, requestinguserid: getUser()._id, requestinguserpassword: getUser().password }).then(response=>{setInit(false);getData(init);});
    }

    const addLine = () => {
      apiPost('users/create', { name: "New User", password: "passwd", adminrights: 0, requestinguserid: getUser()._id, requestinguserpassword: getUser().password }).then(response=>{setInit(false);getData(init);});
    }

    const deleteLine = () => {
      if (window.selectedlineid !== "NoRow") apiPost('users/delete/'+ window.selectedlineid, { requestinguserid: getUser()._id, requestinguserpassword: getUser().password }).then(response=>{window.selectedlineid = "NoRow";setInit(false);getData(init);});
    }

    return ( 
        (data != null && init != null && responsivewidth != null) ?
        <div style={{ marginTop: "5px" }}>
        <input type="button" onClick={addLine} value="Add User"/> 
        <input type="button" onClick={deleteLine} value="Delete User"/>
        <div className="ag-theme-alpine" style={{ width: responsivewidth }}>
           <AgGridReact gridOptions={gridOptions} rowData={data} domLayout={'autoHeight'}>
               <AgGridColumn headerName="ID" editable={false} field="_id" ></AgGridColumn>
               <AgGridColumn headerName="Name" editable={true} field="name"></AgGridColumn>
               <AgGridColumn headerName="Encrypted Password" editable={true} field="password"></AgGridColumn>
               <AgGridColumn headerName="Admin Rights" editable={true} field="adminrights"></AgGridColumn>
           </AgGridReact>
       </div>
      </div> : <h1>Loading</h1>
    );
  };

  export default AdminGrid;