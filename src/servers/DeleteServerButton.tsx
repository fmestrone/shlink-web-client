import { FC } from 'react';
import { faMinusCircle as deleteIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToggle } from '../utils/helpers/hooks';
import { DeleteServerModalProps } from './DeleteServerModal';
import { ServerWithId } from './data';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface DeleteServerButtonProps {
  server: ServerWithId;
  className?: string;
  textClassName?: string;
}

const DeleteServerButton = (DeleteServerModal: FC<DeleteServerModalProps>): FC<DeleteServerButtonProps> => (
  { server, className, children, textClassName },
) => {
  const [isModalOpen, , showModal, hideModal] = useToggle();

  return (
    <>
      <span className={className} onClick={showModal}>
        {!children && <FontAwesomeIcon fixedWidth icon={deleteIcon as IconProp} />}
        <span className={textClassName}>{children ?? 'Remove this server'}</span>
      </span>

      <DeleteServerModal server={server} isOpen={isModalOpen} toggle={hideModal} />
    </>
  );
};

export default DeleteServerButton;
