import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
} from 'reactstrap';
import { useSelector } from 'react-redux';

// Constants
import {
  PATH_HOME,
  PATH_PHOTOS,
  PATH_CATEGORIES,
  PATH_USER_LOGIN,
  PATH_USER_ACCOUNT,
} from 'constants/route';

// Styles
import './styles.scss';

const Header = (props) => {
  const { onLogoutClick } = props;
  const history = useHistory();

  const userLogin = useSelector((state) => state.cookies.login);
  const isTimeout = useSelector((state) => state.cookies.isTimeout);
  const isLogin = useSelector((state) => state.users.isLogin);
  useEffect(() => {
    if (!userLogin && isLogin && isTimeout) {
      console.log('Session timeout');
      history.push(PATH_USER_LOGIN);
    }
  }, [userLogin, isLogin, isTimeout, history]);

  // Render GUI
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md' className='header'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto header__ul' navbar>
            <NavbarBrand href={PATH_HOME} className='header__title'>
              PHOTO APPS
            </NavbarBrand>
            <NavItem>
              <NavLink href={PATH_PHOTOS}>Photo</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={PATH_CATEGORIES}>Category</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        {userLogin ? (
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              {userLogin.name}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to={PATH_USER_ACCOUNT} className='header__link'>
                  Account
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link to='' onClick={onLogoutClick} className='header__link'>
                  Logout
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <NavLink href={PATH_USER_LOGIN}>Login</NavLink>
        )}
      </Navbar>
    </div>
  );
};

Header.propTypes = {
  onLogoutClick: PropTypes.func,
};

Header.defaultProps = {
  onLogoutClick: null,
};

export default Header;
