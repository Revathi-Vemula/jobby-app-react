import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <nav className="nav-bar-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
      </Link>
      <ul className="nav-menu-sm">
        <li className="menu-item-sm">
          <Link to="/">
            <AiFillHome size={20} color="#cbd5e1" />
          </Link>
        </li>
        <li className="menu-item-sm">
          <Link to="/jobs">
            <BsBriefcaseFill size={20} color="#cbd5e1" />
          </Link>
        </li>
        <li className="menu-item-sm">
          <button
            type="button"
            className="btn-sm-logout"
            onClick={onClickLogout}
          >
            <FiLogOut size={20} color="#cbd5e1" />
          </button>
        </li>
      </ul>
      <ul className="nav-menu-lg">
        <div className="menu-home-jobs">
          <li>
            <Link to="/" className="menu-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="menu-item">
              Jobs
            </Link>
          </li>
        </div>
        <li className="menu-item">
          <button
            type="button"
            className="btn-logout-lg"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
