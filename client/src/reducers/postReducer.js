import {CREATE_NEWPOST, GET_POSTLIST, GET_PHOTO}  from '../action/type';


const INITIAL_STATE={infoPost:{},message:'',err:'',listPost:[],photo:''};

export default function(state=INITIAL_STATE,action){
    switch(action.type){
        case CREATE_NEWPOST:
            return{
                ...state,
                message:'success'
            }
        case GET_POSTLIST:
            return{
                ...state,
                listPost:action.payload
            }
        case GET_PHOTO:
                return{
                    ...state,
                    photo:action.payload
                }
        default: return state;
    }
}