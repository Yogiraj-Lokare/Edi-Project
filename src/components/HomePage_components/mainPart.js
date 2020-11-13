import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory, Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header1 } from '../mainPage';
export function MainPart(){
    const [ser,setser] = useState('');
    const [message,setmsg] = useState('');
    const history = useHistory();
    const clear=()=>{
        var er = document.getElementById('error');
        er.style.display = 'none';
    }
    const SetError=(error)=>{
        setmsg(error);
        var er = document.getElementById('error');
        er.style.display = 'block';  
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        const {data} =await axios.post('/test/search',{test_name:ser});
        console.log(data);
        if(data.error != null){
            SetError(data.error);
        }
        else{
        history.push(`/middle/${data}`);
        }
    }
    return(
        <React.Fragment>
            <Header1/>
        <div className='container'>
            <div className='card my-5 shadow'>
                <div className='card-body'>
                <div className='text-center'>
                        <div className='h4 mb-4'>Search</div>
                </div>
                <div id='error' style={{display:'none'}} className='alert alert-danger alert-dismissible'> <button onClick={()=>clear()} className='close' datadismiss='alert' aria-label='close'>&times;</button><strong>{message}</strong>
                </div>
                <form onSubmit={(e)=>submitHandler(e)}>
                    <div className=' form-group '>
                    <input type='text' value={ser} onChange={(e)=>setser(e.target.value)} className=' form-control form-control-user ' placeholder='search test' name='test_name'></input>
                    <hr></hr>
                    <div className='text-center'>
                    <input type='submit' className='btn  btn-outline-primary' name='submit'></input>
                    </div>     
                    </div>
                    
                </form>
            </div>
            </div>
        </div>
        </React.Fragment>
    );
};
