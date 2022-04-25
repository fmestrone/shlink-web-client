import { FC, PropsWithChildren } from 'react';
import { ButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV as menuIcon } from '@fortawesome/free-solid-svg-icons';
import './DropdownBtnMenu.scss';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type DropdownBtnMenuProps = PropsWithChildren<{
  isOpen: boolean;
  toggle: () => void;
  right?: boolean;
}>;

export const DropdownBtnMenu: FC<DropdownBtnMenuProps> = ({ isOpen, toggle, children, right = true }) => (
  <ButtonDropdown toggle={toggle} isOpen={isOpen}>
    <DropdownToggle size="sm" caret outline className="dropdown-btn-menu__dropdown-toggle">
      &nbsp;<FontAwesomeIcon icon={menuIcon as IconProp} />&nbsp;
    </DropdownToggle>
    <DropdownMenu end={right}>{children}</DropdownMenu>
  </ButtonDropdown>
);
