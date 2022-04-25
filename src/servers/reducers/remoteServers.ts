// TODO REMOVE FILE

// import { pipe, prop } from 'ramda';
// import { AxiosInstance } from 'axios';
import { Dispatch } from 'redux';
import { AuthContextProps } from 'react-oidc-context';
// import pack from '../../../package.json';
import { ServerData } from '../data';
import { createServers } from './servers';

export const fetchServers = (auth: AuthContextProps) => () => async (dispatch: Dispatch) => {
  if (auth.isAuthenticated) {
    console.log('FETCH SERVERS'); // TODO remove eventually
    console.log(auth); // TODO remove eventually
    const servers = createServers(auth.user?.profile?.servers as ServerData[]);
    console.log(servers); // TODO remove eventually

    dispatch(servers);
  }
};
