import {GET_COMMENT}  from '../action/type';


const INITIAL_STATE={
    message:'',
    err:'',
    listComment:[],
    pointRateOfUser:null
};

export default function(state=INITIAL_STATE,action){
    switch(action.type){
        case GET_COMMENT:
            return{
                ...state,
                listComment:action.payload
            }
        default: return state;
    }
}