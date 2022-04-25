import { isEmpty, values } from 'ramda';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import { faPlus as plusIcon, faServer as serverIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getServerId, SelectedServer, ServersMap } from './data';

export interface ServersDropdownProps {
  servers: ServersMap;
  selectedServer: SelectedServer;
}

const ServersDropdown = ({ servers, selectedServer }: ServersDropdownProps) => {
  const serversList = values(servers);

  const renderServers = () => {
    if (isEmpty(serversList)) {
      return (
        <DropdownItem tag={Link} to="/server/create">
          <FontAwesomeIcon icon={plusIcon as IconProp} /> <span className="ms-1">Add a server</span>
        </DropdownItem>
      );
    }

    return (
      <>
        {serversList.map(({ name, id }) => (
          <DropdownItem key={id} tag={Link} to={`/server/${id}`} active={getServerId(selectedServer) === id}>
            {name}
          </DropdownItem>
        ))}
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/manage-servers">
          <FontAwesomeIcon icon={serverIcon as IconProp} /> <span className="ms-1">Manage servers</span>
        </DropdownItem>
      </>
    );
  };

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        <FontAwesomeIcon icon={serverIcon as IconProp} /> <span className="ms-1">Servers</span>
      </DropdownToggle>
      <DropdownMenu end style={{ right: 0 }}>{renderServers()}</DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default ServersDropdown;
