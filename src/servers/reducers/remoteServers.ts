// TODO REMOVE FILE

// import { pipe, prop } from 'ramda';
// import { AxiosInstance } from 'axios';
import { Dispatch } from 'redux';
import { AuthContextProps } from 'react-oidc-context';
// import pack from '../../../package.json';
import { ServerData } from '../data';
import { createServers } from './servers';

export const fetchServers = () => (auth: AuthContextProps) => async (dispatch: Dispatch) => {
  if (auth.isAuthenticated) {
    const servers = createServers(auth.user?.profile?.servers as ServerData[]);
    dispatch(servers);
  }
};
