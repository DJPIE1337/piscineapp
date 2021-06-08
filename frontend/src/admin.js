import React from 'react';
import Header from './header';
import AdminGrid from './admingrid';

function Admin(props) {

  return (
    <div>
      {Header()}
      <center>
      <h1>Admin Panel</h1>
      <AdminGrid />
      </center>
    </div>
  );
}
 
export default Admin;
