import { GET_COMMENT } from '../config/type';

const INITIAL_STATE = {
    listComment: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_COMMENT:
            return {
                ...state,
                listComment: action.payload
            }
        default: return state;
    }
}