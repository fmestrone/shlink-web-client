import { FC } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight as chevronIcon } from '@fortawesome/free-solid-svg-icons';
import { ServerWithId } from './data';
import './ServersListGroup.scss';

interface ServersListGroupProps {
  servers: ServerWithId[];
  embedded?: boolean;
}

const ServerListItem = ({ id, name }: { id: string; name: string }) => (
  <ListGroupItem tag={Link} to={`/server/${id}`} className="servers-list__server-item">
    {name}
    <FontAwesomeIcon icon={chevronIcon as IconProp} className="servers-list__server-item-icon" />
  </ListGroupItem>
);

const ServersListGroup: FC<ServersListGroupProps> = ({ servers, children, embedded = false }) => (
  <>
    {children && <h5 className="mb-md-3">{children}</h5>}
    {servers.length > 0 && (
      <ListGroup
        className={classNames('servers-list__list-group', { 'servers-list__list-group--embedded': embedded })}
      >
        {servers.map(({ id, name }) => <ServerListItem key={id} id={id} name={name} />)}
      </ListGroup>
    )}
  </>
);

export default ServersListGroup;
