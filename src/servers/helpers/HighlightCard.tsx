import { FC } from 'react';
import { Card, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { faArrowAltCircleRight as linkIcon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HighlightCard.scss';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface HighlightCardProps {
  title: string;
  link?: string | false;
}

const buildExtraProps = (link?: string | false) => (!link ? {} : { tag: Link, to: link });

export const HighlightCard: FC<HighlightCardProps> = ({ children, title, link }) => (
  <Card className="highlight-card" body {...buildExtraProps(link)}>
    {link && <FontAwesomeIcon size="3x" className="highlight-card__link-icon" icon={linkIcon as IconProp} />}
    <CardTitle tag="h5" className="highlight-card__title">{title}</CardTitle>
    <CardText tag="h2">{children}</CardText>
  </Card>
);
