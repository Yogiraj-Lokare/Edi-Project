import { DATA_REQUEST, DATA_SUCCESS, DECREMENT_REMAIN, INCREMENT_REMAIN, UPDATE_HOUR, UPDATE_TIME, ADD_USER, LOG_OUT } from "./actionTypes";
const initialState={
    list:[{
        _id:1,
        number: 1 ,
        question:'there is some problem',
        mcq:[
            'option1','option2','option3','option4'
        ],
    }],
    user_time:{
        hour:0,
        min:0,
        second:0
    },
    answers:[0],
    remain:0,
    loggedIn:false,
    username:'',
    user_id:1
};
const reducer_main_test = (state=initialState,action)=>{
    switch(action.type){
        case ADD_USER:
            return{
                ...state,
                loggedIn:true,
                username:action.name,
                user_id:action._id
            }
        case LOG_OUT:
            return{
                ...state,
                loggedIn:false,
                username:'',
                user_id:0
            }
        case DATA_REQUEST:
            return {...state,loading:true}
        case DATA_SUCCESS:
            var df=[];
            for(var i=0;i<action.data.list.length;i++){
                df.push(0);
            }
            return{
                ...state,
                loading:false,
                list:action.data.list,
                test_name:action.data.test_name,
                user_time:action.data.test_duration,
                remain:action.data.list.length,
                answers:df
            }
        case DECREMENT_REMAIN:
            var drrr = state.remain-1;
            return{
                ...state,
                remain:drrr
            }
        case INCREMENT_REMAIN:
            var drr = state.remain+1;
            return{
                ...state,
                remain:drr
            }
        case UPDATE_TIME:
            var up = state.user_time;
            if(action.what == 'hour'){
                up.hour=action.how;
            }
            if(action.what == 'min'){
                up.min=action.how;
            }
            if(action.what == 'second'){
                up.second=action.how;
            }
            return{
                ...state,
                user_time:up
            }
        default:
            return state;
    }
}
export default reducer_main_test;