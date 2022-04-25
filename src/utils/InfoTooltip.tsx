import { FC, PropsWithChildren, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle as infoIcon } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';
import { Placement } from '@popperjs/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type InfoTooltipProps = PropsWithChildren<{
  className?: string;
  placement: Placement;
}>;

export const InfoTooltip: FC<InfoTooltipProps> = ({ className = '', placement, children }) => {
  const ref = useRef<HTMLSpanElement | null>();
  const refCallback = (el: HTMLSpanElement) => {
    ref.current = el;
  };

  return (
    <>
      <span className={className} ref={refCallback}>
        <FontAwesomeIcon icon={infoIcon as IconProp} />
      </span>
      <UncontrolledTooltip target={(() => ref.current) as any} placement={placement}>{children}</UncontrolledTooltip>
    </>
  );
};
