import { FC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { AuthContextProps, useAuth } from 'react-oidc-context';
import NotFound from '../common/NotFound';
import { ServersMap } from '../servers/data';
import { Settings } from '../settings/reducers/settings';
import { changeThemeInMarkup } from '../utils/theme';
import { AppUpdateBanner } from '../common/AppUpdateBanner';
import { forceUpdate } from '../utils/helpers/sw';
import './App.scss';
// import { createServers } from '../servers/reducers/servers';
// import { HomeProps } from '../common/Home';

interface AppProps {
  fetchServers: (auth: AuthContextProps) => void;
  servers: ServersMap;
  settings: Settings;
  resetAppUpdate: () => void;
  appUpdated: boolean;
}

const App = (
  MainHeader: FC,
  Home: FC,
  MenuLayout: FC,
  CreateServer: FC,
  EditServer: FC,
  SettingsComp: FC,
  ManageServers: FC,
  ShlinkVersionsContainer: FC,
) => ({ fetchServers, servers, settings, appUpdated, resetAppUpdate }: AppProps) => {
  const auth = useAuth();

  useEffect(() => {
    // On first load, try to fetch the remote servers if the list is empty
    if (Object.keys(servers).length === 0) {
      fetchServers(auth);
    }
  });

  const location = useLocation();
  const isHome = location.pathname === '/';

  changeThemeInMarkup(settings.ui?.theme ?? 'light');

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>;
    case 'signoutRedirect':
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    console.log(auth);
    return (
      <div className="container-fluid app-container">
        <MainHeader />

        <div className="app">
          <div className={classNames('shlink-wrapper', { 'd-flex d-md-block align-items-center': isHome })}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/settings/*" element={<SettingsComp />} />
              <Route path="/manage-servers" element={<ManageServers />} />
              <Route path="/server/create" element={<CreateServer />} />
              <Route path="/server/:serverId/edit" element={<EditServer />} />
              <Route path="/server/:serverId/*" element={<MenuLayout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <div className="shlink-footer">
            <ShlinkVersionsContainer />
          </div>
        </div>

        <AppUpdateBanner isOpen={appUpdated} toggle={resetAppUpdate} forceUpdate={forceUpdate} />
      </div>
    );
  }

  return (
    <button type="button" onClick={() => void auth.signinRedirect()}>Log in</button>
  );

  return (
    <button type="button" onClick={() => void auth.signinRedirect()}>Log in</button>
  );
};

export default App;
