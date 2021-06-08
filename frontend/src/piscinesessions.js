import React from 'react';
import Header from './header';
import PiscineSessionsGrid from './piscinesessionsgrid';

function PiscineSessions(props) {

  return (
    <div>
      {Header()}
      <center>
      <h1>Sessions Panel</h1>
      <PiscineSessionsGrid />
      </center>
    </div>
  );
}
 
export default PiscineSessions;
