import { faChevronDown as arrowIcon, faCogs as cogsIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import classNames from 'classnames';
import { useToggle } from '../utils/helpers/hooks';
import { ShlinkLogo } from './img/ShlinkLogo';
import './MainHeader.scss';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const MainHeader = (ServersDropdown: FC) => () => {
  const [isOpen, toggleOpen, , close] = useToggle();
  const location = useLocation();
  const { pathname } = location;

  useEffect(close, [location]);

  const settingsPath = '/settings';
  const toggleClass = classNames('main-header__toggle-icon', { 'main-header__toggle-icon--opened': isOpen });

  return (
    <Navbar color="primary" dark fixed="top" className="main-header" expand="md">
      <NavbarBrand tag={Link} to="/">
        <ShlinkLogo className="main-header__brand-logo" color="white" /> Shlink
      </NavbarBrand>

      <NavbarToggler onClick={toggleOpen}>
        <FontAwesomeIcon icon={arrowIcon as IconProp} className={toggleClass} />
      </NavbarToggler>

      <Collapse navbar isOpen={isOpen}>
        <Nav navbar className="ms-auto">
          <NavItem>
            <NavLink tag={Link} to={settingsPath} active={pathname.startsWith(settingsPath)}>
              <FontAwesomeIcon icon={cogsIcon as IconProp} />&nbsp; Settings
            </NavLink>
          </NavItem>
          <ServersDropdown />
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default MainHeader;
