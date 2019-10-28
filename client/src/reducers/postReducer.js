import { GET_PHOTO, GET_COMMENT}  from '../action/type';


const INITIAL_STATE={
    message:'',
    err:'',
    listComment:[]
};

export default function(state=INITIAL_STATE,action){
    switch(action.type){
        case GET_PHOTO:
                return{
                    ...state,
                    photoData:action.payload
                }
        case GET_COMMENT:
            return{
                ...state,
                listComment:action.payload
            }
        default: return state;
    }
}