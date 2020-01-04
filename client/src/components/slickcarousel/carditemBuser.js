import React from 'react';
import { API_URL } from '../../config/helper';
import man from '../../public/images/man.png';
import {Link} from 'react-router-dom'

export default function RecipeReviewCard(props) {

  const avatar = props.user.avatar;
  var urlAvatar = '';
  if (avatar) {
    if (avatar.includes('dist')) {
      urlAvatar = API_URL + '/' + avatar;
    }
    else {
      urlAvatar = avatar;
    }
  }
  else {
    urlAvatar = man;
  }

  return (
    <Link to={
      {
          pathname: `/GuestViewProfile/${props.user._id}`
      }}>
      <div className="carditem_buser">
        <div className="txtUserName">
          {props.user.name}
        </div>
        <img width="100%" height="100%" className="user_avatar_link " src={urlAvatar} alt="Nguyễn Tuấn Vũ " />
      </div>
    </Link>

  );
}