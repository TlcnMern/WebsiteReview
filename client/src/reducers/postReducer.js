import { GET_PHOTO}  from '../action/type';


const INITIAL_STATE={
    infoPost:{},
    message:'',
    isComment:false,
    err:'',
    listPost:[],
    photoData:{}
};

export default function(state=INITIAL_STATE,action){
    switch(action.type){
        case GET_PHOTO:
                return{
                    ...state,
                    photoData:action.payload
                }
        default: return state;
    }
}