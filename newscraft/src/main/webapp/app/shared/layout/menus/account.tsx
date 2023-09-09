import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { DropdownItem } from 'reactstrap';

import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavDropdown } from './menu-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const accountMenuItemsAuthenticated = () => (
  <>
    <DropdownItem tag={Link} to="/account/bookmarks" data-cy="bookmarks">
      <FontAwesomeIcon icon={faBookmark} fixedWidth /> Bookmarks
    </DropdownItem>
{/*     <NavDropdown.Divider /> */}
    <MenuItem icon="wrench" to="/account/settings" data-cy="settings">
      Settings
    </MenuItem>
    <MenuItem icon="lock" to="/account/password" data-cy="passwordItem">
      Password
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout" data-cy="logout">
      Sign out
    </MenuItem>
  </>
);

const accountMenuItems = () => (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login" data-cy="login">
      Sign in
    </MenuItem>
    <MenuItem icon="user-plus" to="/account/register" data-cy="register">
      Register
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name="Account" id="account-menu" data-cy="accountMenu">
    {isAuthenticated ? accountMenuItemsAuthenticated() : accountMenuItems()}
  </NavDropdown>
);

export default AccountMenu;
