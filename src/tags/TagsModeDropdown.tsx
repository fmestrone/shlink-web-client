import { FC } from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars as listIcon, faThLarge as cardsIcon } from '@fortawesome/free-solid-svg-icons';
import { DropdownBtn } from '../utils/DropdownBtn';
import { TagsMode } from '../settings/reducers/settings';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface TagsModeDropdownProps {
  mode: TagsMode;
  onChange: (newMode: TagsMode) => void;
  renderTitle?: (mode: TagsMode) => string;
}

export const TagsModeDropdown: FC<TagsModeDropdownProps> = ({ mode, onChange, renderTitle }) => (
  <DropdownBtn text={renderTitle?.(mode) ?? `Display mode: ${mode}`}>
    <DropdownItem active={mode === 'cards'} onClick={() => onChange('cards')}>
      <FontAwesomeIcon icon={cardsIcon as IconProp} fixedWidth className="me-1" /> Cards
    </DropdownItem>
    <DropdownItem active={mode === 'list'} onClick={() => onChange('list')}>
      <FontAwesomeIcon icon={listIcon as IconProp} fixedWidth className="me-1" /> List
    </DropdownItem>
  </DropdownBtn>
);
