import React, { useState, useEffect } from 'react';
import { Button, ButtonToggle } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from 'app/config/store';

// import { IBookMark } from 'app/shared/model/book-mark.model';
// import { getUserBookmark } from 'app/entities/book-mark/book-mark.reducer';

export const BookmarkButton = () => {
//   const dispatch = useAppDispatch();
//   const { id } = useParams<'id'>();

  let tempVar: boolean = true;
//   let activeToggle: boolean = true;
  const loggedInUser = useAppSelector(state => state.authentication.account.login);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const [toggle, setToggle] = useState(true);

//   useEffect(() => {
//     dispatch(getUserBookmark());
//   }, []);

// it looks ugly now BUT IT WORKS!
  return (
    <div className="d-flex justify-content-end">
      {isAuthenticated ?
        <Button className="me-2" color="info" onClick={() => setToggle(!toggle)} active={toggle}>
          <FontAwesomeIcon icon={faBookmark} />
        </Button>
        :
        <span>&nbsp;</span>
      }
    </div>
  );
};

export default BookmarkButton;
