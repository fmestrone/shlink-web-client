import {
  faChartPie as pieChartIcon,
  faQrcode as qrIcon,
  faMinusCircle as deleteIcon,
  faEdit as editIcon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { DropdownItem } from 'reactstrap';
import { useToggle } from '../../utils/helpers/hooks';
import { ShortUrl, ShortUrlModalProps } from '../data';
import { SelectedServer } from '../../servers/data';
import { DropdownBtnMenu } from '../../utils/DropdownBtnMenu';
import ShortUrlDetailLink from './ShortUrlDetailLink';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface ShortUrlsRowMenuProps {
  selectedServer: SelectedServer;
  shortUrl: ShortUrl;
}
type ShortUrlModal = FC<ShortUrlModalProps>;

const ShortUrlsRowMenu = (
  DeleteShortUrlModal: ShortUrlModal,
  QrCodeModal: ShortUrlModal,
) => ({ shortUrl, selectedServer }: ShortUrlsRowMenuProps) => {
  const [isOpen, toggle] = useToggle();
  const [isQrModalOpen, toggleQrCode] = useToggle();
  const [isDeleteModalOpen, toggleDelete] = useToggle();

  return (
    <DropdownBtnMenu toggle={toggle} isOpen={isOpen}>
      <DropdownItem tag={ShortUrlDetailLink} selectedServer={selectedServer} shortUrl={shortUrl} suffix="visits">
        <FontAwesomeIcon icon={pieChartIcon as IconProp} fixedWidth /> Visit stats
      </DropdownItem>

      <DropdownItem tag={ShortUrlDetailLink} selectedServer={selectedServer} shortUrl={shortUrl} suffix="edit">
        <FontAwesomeIcon icon={editIcon as IconProp} fixedWidth /> Edit short URL
      </DropdownItem>

      <DropdownItem onClick={toggleQrCode}>
        <FontAwesomeIcon icon={qrIcon as IconProp} fixedWidth /> QR code
      </DropdownItem>
      <QrCodeModal shortUrl={shortUrl} isOpen={isQrModalOpen} toggle={toggleQrCode} />

      <DropdownItem divider />

      <DropdownItem className="dropdown-item--danger" onClick={toggleDelete}>
        <FontAwesomeIcon icon={deleteIcon as IconProp} fixedWidth /> Delete short URL
      </DropdownItem>
      <DeleteShortUrlModal shortUrl={shortUrl} isOpen={isDeleteModalOpen} toggle={toggleDelete} />
    </DropdownBtnMenu>
  );
};

export default ShortUrlsRowMenu;
