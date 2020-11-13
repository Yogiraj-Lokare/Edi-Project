import React, { Component } from 'react';
import store from '../redux/store';
import { useSelector } from 'react-redux';
function Result(){
    const {answers,user_time} =useSelector(state=>state.reducer_main_test);
        return(
            <React.Fragment>
                <div>{answers}</div>
        <div>{user_time.hour}:{user_time.min}:{user_time.second}</div>
            </React.Fragment>
        );
}
export default Result;