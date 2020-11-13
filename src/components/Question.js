import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { decrementRemain,incrementRemain } from '../redux/actions';

function Question(props){
    const submitHander2=()=>{
        var ff = document.querySelectorAll('input');
        var not = false;
        for(var i=0;i<4;i++){
            if(ff[i].checked === true){
               if(props.answers[props.select-1] !=0){
                not = true;
               }
               props.answers[props.select-1] = 0;
               ff[i].checked=false;
            }
        }
        if(not){
        props.incrementRemain();
        }
    }
    const submitHander=()=>{          
        var ff = document.querySelectorAll('input');
        var not = false;
        for(var i=0;i<4;i++){
            if(ff[i].checked === true && props.answers[props.select-1]==0){
                not = true;
            }
            if(ff[i].checked === true){
               props.answers[props.select-1] = parseInt(ff[i].value);
               
            }     
        }
        if(not){
            props.decrementRemain();
            if(props.select < props.list.length){
                props.Next(props.select+1);
            }
        }   
    }
    const que=props.list.filter(co=> co.number === props.select);
        useEffect(()=>{
            const ff = document.querySelectorAll('input');
            if(props.answers[props.select-1] !== 0){
                ff[props.answers[props.select-1]-1].checked=true;
            }
            else if(props.select != 1 ){
                ff[0].checked=false;
                ff[1].checked=false;
                ff[2].checked=false;
                ff[3].checked=false;
            }
        },[props.select]);
         
        return(
            <React.Fragment>
                <div className='ques'>
                    <div className='maed' > 
                        <div>Question {props.select}.</div>
                        <div className='markss' data-toggle="tooltip" title="Marks">Score : {que[0].marks}</div>
                    </div>
                <div className='quess'>
                    <div className='quema' data-toggle="tooltip" title="Question"><pre>{que[0].question}</pre></div>
                </div>
                    <div className='bnm'>
                        <form action='#'>
                            <div className='mcq'>
                            <input className='radio' type='radio' value='1' name={que[0]._id} id='11'  /><div className='namein'>{que[0].mcq[0]}</div>
                            </div>
                            <div className='mcq'>
                            <input className='radio' type='radio' value='2' name={que[0]._id} id='11'  /><div className='namein'>{que[0].mcq[1]}</div>
                            </div>
                            <div className='mcq'>
                            <input className='radio' type='radio' value='3' name={que[0]._id} id='11'  /><div className='namein'>{que[0].mcq[2]}</div>
                            </div>
                            <div className='mcq'>
                            <input className='radio' type='radio' value='4' name={que[0]._id} id='11'  /><div className='namein'>{que[0].mcq[3]}</div>
                            </div>      
                        </form>
                    </div>
                    <button onClick={()=>submitHander()} className=' subtn sumo'>submit</button>
                    <button onClick={()=>submitHander2()} className='subtn clero'>Clear Response</button>
                </div>

            </React.Fragment>
        );
}
const mapStateToProps=(state)=>{
    return {
        list:state.reducer_main_test.list,
        answers:state.reducer_main_test.answers,
        remain:state.reducer_main_test.remain
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      decrementRemain: ()=> { dispatch(decrementRemain()) },
      incrementRemain: ()=> { dispatch(incrementRemain()) }  
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Question);