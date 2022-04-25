import {
  faList as listIcon,
  faLink as createIcon,
  faTags as tagsIcon,
  faPen as editIcon,
  faHome as overviewIcon,
  faGlobe as domainsIcon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { DeleteServerButtonProps } from '../servers/DeleteServerButton';
import { isServerWithId, SelectedServer } from '../servers/data';
import { supportsDomainRedirects } from '../utils/helpers/features';
import './AsideMenu.scss';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface AsideMenuProps {
  selectedServer: SelectedServer;
  showOnMobile?: boolean;
}

interface AsideMenuItemProps extends NavLinkProps {
  to: string;
}

const AsideMenuItem: FC<AsideMenuItemProps> = ({ children, to, className, ...rest }) => (
  <NavLink
    className={({ isActive }) => classNames('aside-menu__item', className, { 'aside-menu__item--selected': isActive })}
    to={to}
    {...rest}
  >
    {children}
  </NavLink>
);

const AsideMenu = (DeleteServerButton: FC<DeleteServerButtonProps>) => (
  { selectedServer, showOnMobile = false }: AsideMenuProps,
) => {
  const hasId = isServerWithId(selectedServer);
  const serverId = hasId ? selectedServer.id : '';
  const { pathname } = useLocation();
  const addManageDomainsLink = supportsDomainRedirects(selectedServer);
  const asideClass = classNames('aside-menu', {
    'aside-menu--hidden': !showOnMobile,
  });
  const buildPath = (suffix: string) => `/server/${serverId}${suffix}`;

  return (
    <aside className={asideClass}>
      <nav className="nav flex-column aside-menu__nav">
        <AsideMenuItem to={buildPath('/overview')}>
          <FontAwesomeIcon fixedWidth icon={overviewIcon as IconProp} />
          <span className="aside-menu__item-text">Overview</span>
        </AsideMenuItem>
        <AsideMenuItem
          to={buildPath('/list-short-urls/1')}
          className={classNames({ 'aside-menu__item--selected': pathname.match('/list-short-urls') !== null })}
        >
          <FontAwesomeIcon fixedWidth icon={listIcon as IconProp} />
          <span className="aside-menu__item-text">List short URLs</span>
        </AsideMenuItem>
        <AsideMenuItem to={buildPath('/create-short-url')}>
          <FontAwesomeIcon fixedWidth icon={createIcon as IconProp} flip="horizontal" />
          <span className="aside-menu__item-text">Create short URL</span>
        </AsideMenuItem>
        <AsideMenuItem to={buildPath('/manage-tags')}>
          <FontAwesomeIcon fixedWidth icon={tagsIcon as IconProp} />
          <span className="aside-menu__item-text">Manage tags</span>
        </AsideMenuItem>
        {addManageDomainsLink && (
          <AsideMenuItem to={buildPath('/manage-domains')}>
            <FontAwesomeIcon fixedWidth icon={domainsIcon as IconProp} />
            <span className="aside-menu__item-text">Manage domains</span>
          </AsideMenuItem>
        )}
        <AsideMenuItem to={buildPath('/edit')} className="aside-menu__item--push">
          <FontAwesomeIcon fixedWidth icon={editIcon as IconProp} />
          <span className="aside-menu__item-text">Edit this server</span>
        </AsideMenuItem>
        {hasId && (
          <DeleteServerButton
            className="aside-menu__item aside-menu__item--danger"
            textClassName="aside-menu__item-text"
            server={selectedServer}
          />
        )}
      </nav>
    </aside>
  );
};

export default AsideMenu;
