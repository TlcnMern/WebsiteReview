import { FETCH_USER, ERROR_RESPONSE, FOLLOW, FOLLOWED, CLEAN_PROFILE,GET_AVATAR } from '../config/type';
import { auth } from '../config/helper';

const INITIAL_STATE = { profile: {}, message: '', error: '', isFollow: false,avatar:'' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, profile: action.payload };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
    case FOLLOW:
      return { ...state, error: action.payload, isFollow: true };
    case FOLLOWED:
      return { ...state, error: action.payload, isFollow: false };
    case CLEAN_PROFILE:
      return { ...state, message: '', error: '', isFollow: false };
    case GET_AVATAR:{
      return { ...state, avatar:auth.getAvatar()};
    }
    default:
      return state;
  }
}
