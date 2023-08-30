import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/user-profile">
        User Profile
      </MenuItem>
      <MenuItem icon="asterisk" to="/comment">
        Comment
      </MenuItem>
      <MenuItem icon="asterisk" to="/book-mark">
        Book Mark
      </MenuItem>
      <MenuItem icon="asterisk" to="/news-article">
        News Article
      </MenuItem>
      <MenuItem icon="asterisk" to="/category">
        Category
      </MenuItem>
      <MenuItem icon="asterisk" to="/picture">
        Picture
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
