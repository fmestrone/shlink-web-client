import { pipe } from 'ramda';
import { ExternalLink } from 'react-external-link';
import { useAuth } from 'react-oidc-context';
import { versionToPrintable, versionToSemVer } from '../utils/helpers/version';
import { isReachableServer, SelectedServer } from '../servers/data';

const SHLINK_WEB_CLIENT_VERSION = '%_VERSION_%';
const normalizeVersion = pipe(versionToSemVer(), versionToPrintable);

export interface ShlinkVersionsProps {
  selectedServer: SelectedServer;
  clientVersion?: string;
}

const VersionLink = ({ project, version }: { project: 'shlink' | 'shlink-web-client'; version: string }) => (
  <ExternalLink href={`https://github.com/shlinkio/${project}/releases/${version}`} className="text-muted">
    <b>{version}</b>
  </ExternalLink>
);

const ShlinkVersions = ({ selectedServer, clientVersion = SHLINK_WEB_CLIENT_VERSION }: ShlinkVersionsProps) => {
  const normalizedClientVersion = normalizeVersion(clientVersion);
  const auth = useAuth();

  return (
    <small className="text-muted">
      <>Hello <b>{auth.user?.profile.name}</b>! &middot; You&apos;re using: </>
      <i>{isReachableServer(selectedServer) && (
        <>server=<VersionLink project="shlink" version={selectedServer.printableVersion} /> &ndash; </>
      )}
        client=<VersionLink project="shlink-web-client" version={normalizedClientVersion} />
      </i>
      <> &middot; <ExternalLink href="#" onClick={() => void auth.removeUser()} className="text-muted"><b>Logout</b></ExternalLink> </>
    </small>
  );
};

export default ShlinkVersions;
