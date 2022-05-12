import { useEffect } from 'react';
import { isEmpty, values } from 'ramda';
import { useNavigate } from 'react-router-dom';
import { Card, Row } from 'reactstrap';
import { ExternalLink } from 'react-external-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ServersListGroup from '../servers/ServersListGroup';
import { ServersMap } from '../servers/data';
import { ShlinkLogo } from './img/ShlinkLogo';
import './Home.scss';

export interface HomeProps {
  servers: ServersMap;
}

function Home({ servers }: HomeProps) {
  const navigate = useNavigate();
  const serversList = values(servers);
  const hasServers = !isEmpty(serversList);

  useEffect(() => {
    // Try to redirect to the first server marked as auto-connect
    const autoConnectServer = serversList.find(({ autoConnect }) => autoConnect);
    autoConnectServer && navigate(`/server/${autoConnectServer.id}`);
  }, []);

  return (
    <div className="home">
      <Card className="home__main-card">
        <Row className="g-0">
          <div className="col-md-5 d-none d-md-block">
            <div className="home__logo-wrapper">
              <div className="home__logo">
                <ShlinkLogo />
              </div>
            </div>
          </div>
          <div className="col-md-7 home__servers-container">
            <div className="home__title-wrapper">
              <h1 className="home__title">Welcome!</h1>
            </div>
            <ServersListGroup embedded servers={serversList}>
              {!hasServers && (
                <div className="p-4 text-center">
                  <p className="mb-5">Your credentials give you access to the following NekoShlink servers.</p>
                  <p className="mb-0 mt-5">eko
                    <ExternalLink href="https://nekoshlink.nekosoft.org/documentation">
                      <small>
                        <span className="me-1">Learn more about NekoShlink</span> <FontAwesomeIcon icon={faExternalLinkAlt as IconProp} />
                      </small>
                    </ExternalLink>
                  </p>
                </div>
              )}
            </ServersListGroup>
          </div>
        </Row>
      </Card>
    </div>
  );
}

export default Home;
