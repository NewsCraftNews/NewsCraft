import React from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// data-popper-placement="bottom-start"
// style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px 42px);"

export const NavDropdown = props => (
  <UncontrolledDropdown nav inNavbar id={props.id} data-cy={props['data-cy']}>
    <DropdownToggle nav caret className="d-flex align-items-center" style={{opacity: 1, fontWeight: 'bold'}}>
      <span>&nbsp;</span>
      <FontAwesomeIcon icon={props.icon} />
      <span>&nbsp;{props.name}</span>
    </DropdownToggle>
    <DropdownMenu data-popper-placement="bottom-start" style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);
