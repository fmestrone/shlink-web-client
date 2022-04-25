import { FC, useMemo, useState } from 'react';
import { Modal, FormGroup, ModalBody, ModalHeader, Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload as downloadIcon } from '@fortawesome/free-solid-svg-icons';
import { ExternalLink } from 'react-external-link';
import { ShortUrlModalProps } from '../data';
import { SelectedServer } from '../../servers/data';
import { CopyToClipboardIcon } from '../../utils/CopyToClipboardIcon';
import { buildQrCodeUrl, QrCodeCapabilities, QrCodeFormat, QrErrorCorrection } from '../../utils/helpers/qrCodes';
import {
  supportsQrCodeSizeInQuery,
  supportsQrCodeMargin,
  supportsQrErrorCorrection,
} from '../../utils/helpers/features';
import { ImageDownloader } from '../../common/services/ImageDownloader';
import { Versions } from '../../utils/helpers/version';
import { QrFormatDropdown } from './qr-codes/QrFormatDropdown';
import './QrCodeModal.scss';
import { QrErrorCorrectionDropdown } from './qr-codes/QrErrorCorrectionDropdown';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface QrCodeModalConnectProps extends ShortUrlModalProps {
  selectedServer: SelectedServer;
}

const QrCodeModal = (imageDownloader: ImageDownloader, ForServerVersion: FC<Versions>) => (
  { shortUrl: { qrShortUrl, shortCode }, toggle, isOpen, selectedServer }: QrCodeModalConnectProps,
) => {
  const [size, setSize] = useState(300);
  const [margin, setMargin] = useState(0);
  const [format, setFormat] = useState<QrCodeFormat>('png');
  const [errorCorrection, setErrorCorrection] = useState<QrErrorCorrection>('L');
  const capabilities: QrCodeCapabilities = useMemo(() => ({
    useSizeInPath: !supportsQrCodeSizeInQuery(selectedServer),
    marginIsSupported: supportsQrCodeMargin(selectedServer),
    errorCorrectionIsSupported: supportsQrErrorCorrection(selectedServer),
  }), [selectedServer]);
  const willRenderThreeControls = capabilities.marginIsSupported !== capabilities.errorCorrectionIsSupported;
  const qrCodeUrl = useMemo(
    () => buildQrCodeUrl(qrShortUrl, { size, format, margin, errorCorrection }, capabilities),
    [qrShortUrl, size, format, margin, errorCorrection, capabilities],
  );
  const totalSize = useMemo(() => size + margin, [size, margin]);
  const modalSize = useMemo(() => {
    if (totalSize < 500) {
      return undefined;
    }

    return totalSize < 800 ? 'lg' : 'xl';
  }, [totalSize]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size={modalSize}>
      <ModalHeader toggle={toggle}>
        QR code for <ExternalLink href={qrShortUrl}>{qrShortUrl}</ExternalLink>
      </ModalHeader>
      <ModalBody>
        <Row>
          <FormGroup className={`d-grid ${willRenderThreeControls ? 'col-md-4' : 'col-md-6'}`}>
            <label>Size: {size}px</label>
            <input
              type="range"
              className="form-control-range"
              value={size}
              step={10}
              min={50}
              max={1000}
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </FormGroup>
          {capabilities.marginIsSupported && (
            <FormGroup className={`d-grid ${willRenderThreeControls ? 'col-md-4' : 'col-md-6'}`}>
              <label htmlFor="marginControl">Margin: {margin}px</label>
              <input
                id="marginControl"
                type="range"
                className="form-control-range"
                value={margin}
                step={1}
                min={0}
                max={100}
                onChange={(e) => setMargin(Number(e.target.value))}
              />
            </FormGroup>
          )}
          <FormGroup className={willRenderThreeControls ? 'col-md-4' : 'col-md-6'}>
            <QrFormatDropdown format={format} setFormat={setFormat} />
          </FormGroup>
          {capabilities.errorCorrectionIsSupported && (
            <FormGroup className="col-md-6">
              <QrErrorCorrectionDropdown errorCorrection={errorCorrection} setErrorCorrection={setErrorCorrection} />
            </FormGroup>
          )}
        </Row>
        <div className="text-center">
          <div className="mb-3">
            <ExternalLink href={qrCodeUrl} />
            <CopyToClipboardIcon text={qrCodeUrl} />
          </div>
          <img src={qrCodeUrl} className="qr-code-modal__img" alt="QR code" />
          <ForServerVersion minVersion="2.9.0">
            <div className="mt-3">
              <Button
                block
                color="primary"
                onClick={() => {
                  imageDownloader.saveImage(qrCodeUrl, `${shortCode}-qr-code.${format}`).catch(() => {});
                }}
              >
                Download <FontAwesomeIcon icon={downloadIcon as IconProp} className="ms-1" />
              </Button>
            </div>
          </ForServerVersion>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default QrCodeModal;
