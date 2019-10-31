import {GET_COMMENT, GET_RATING}  from '../action/type';


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
        case GET_RATING:
            return{
                ...state,
                pointRateOfUser:action.payload
            }
        default: return state;
    }
}