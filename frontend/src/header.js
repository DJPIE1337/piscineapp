import { NavLink } from 'react-router-dom';
import { getUser, getToken, removeUserSession } from './utils/common';
import './index.css';

  function Header(){
    if (getToken() != null)
    {
    return(<div className="header">{connected()}{piscinesessions()}{logOut()}{admin()}</div>)
    }
    else
    return(<div className="header"><NavLink activeClassName="active" to="/Login">Login</NavLink></div>)
  }
  function connected(){if (getUser() != null){return(<NavLink activeClassName="active" to="/dashboard">Graphs</NavLink>)} else return;}
  function piscinesessions(){if (getUser() != null){return(<NavLink activeClassName="active" to="/piscinesessions">Sessions</NavLink>)} else return;}
  function logOut(){if (getUser() != null){return(<input type="button" onClick={handleLogout} value="Logout" style={{float: 'right'}}/>)} else return;}
  function admin(){if (getUser() != null && getUser().adminrights === 1){return(<NavLink activeClassName="active" to="/admin" style={{float: 'right'}}>Admin</NavLink>)} else return;}
  const handleLogout = () => {
    removeUserSession();
    window.location.reload(false);
  }

  export default Header;