import React from 'react';
import Header from './header';
import DashboardGraphs from './dashboardgraphs';

function Dashboard(props) {

  return (
    <div>
      {Header()}
      <center>
      <h1>Progress Graphs</h1>
      <DashboardGraphs />
      </center>
    </div>
  );
}
 
export default Dashboard;
