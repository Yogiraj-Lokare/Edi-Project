import React, { Component, useState, useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import store from '../redux/store';
import { updateTime } from '../redux/actions';

function Navbar(props){
        const history=useHistory();
        const endTest=()=>{

            history.push('/submit');
        }
        /*var timee=0;
        window.addEventListener('blur',()=>{
            timee=props.second;
            timee+=(props.min*60);
            timee+=(props.hour*60*60);
        });
        window.addEventListener('focus',()=>{
            var cur=props.second;
            cur+=(props.min*60);
            cur+=(props.hour*60*60);
            if(timee-cur<=5){
                alert('dont change tab');
            }
            else{
                alert('you were on another tab for more than 5 sec');
                endTest();
            }
        });*/
        useEffect(()=>{
            var inter=setInterval(()=>{
                if(props.hour == 0 && props.min == 0 && props.second==1){
                    endTest();
                }
                if(props.second==0){
                    props.updateTime(59,'second');
                    if(props.min==0){
                        props.updateTime(props.hour-1,'hour');
                        props.updateTime(59,'min');
                    }
                    else{
                        props.updateTime(props.min-1,'min');
                    }
                }
                else{
                    props.updateTime(props.second-1,'second');
                }
            },1000);
            return()=> clearInterval(inter);
        },[props.second]);

        const total=props.list.length;
        var progress = (100*(props.remain))/total;
        var radius = 33;
        var stroke = 4;
        var normalizedRadius = radius - stroke * 2;
        var circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset = -circumference + progress / 100 * circumference;
        return(
            <React.Fragment>
                <div className='header'>
                   <div className="test-name">{props.test_name}</div>
                    <div className='timer'>
                    {props.hour<10 ?`0${props.hour}`:props.hour }:{props.min<10 ? `0${props.min}`:props.min}:{props.second<10 ? `0${props.second}`:props.second}
                    </div>
                    <div className='remain'>
                        <div className='counter-no' data-toggle="tooltip" title="Remaing Questions" >{props.remain}</div>
                            <svg
                                height={radius * 2}
                                width={radius * 2}
                            >
                            <circle
                                stroke="blue"
                                fill="transparent"
                                strokeWidth={ stroke }
                                strokeDasharray={ circumference + ' ' + circumference }
                                style={ { strokeDashoffset } }
                                r={ normalizedRadius }
                                cx={ radius }
                                cy={ radius }
                            />
                            </svg>
                    </div>
                    <button className='end' onClick={()=>endTest()}>END TEST</button>
                </div>

            </React.Fragment>
        );
}
 
const mapStateToProps=(state)=>{
    return {
        remain:state.reducer_main_test.remain,
        list:state.reducer_main_test.list,
        test_name:state.reducer_main_test.test_name,
        hour:state.reducer_main_test.user_time.hour,
        min:state.reducer_main_test.user_time.min,
        second:state.reducer_main_test.user_time.second
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      updateTime:(p1,p2)=>dispatch(updateTime(p1,p2))  
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar);