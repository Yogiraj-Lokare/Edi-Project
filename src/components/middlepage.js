import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setTokenHeader } from '../redux/actions';
export function MiddlePage(){
    if(localStorage.getItem('jwt')){
        setTokenHeader(localStorage.getItem('jwt'));
    }
    const d = useParams();
    const [sel,setsel] = useState(3);
    const ups=()=>{
        switch(sel){
            case 1:
                return(<Wel/>);
            case 2:
                return(<Al/>);
            case 3:
                return(<Na/>);
            default:
                return(<Na/>);
        }
    }
    useEffect(()=>{
        const sd=async()=>{
            const {data} = await axios.post('/test/check',{test_name:d.id});
            console.log(data);
            if(data.error != null){
                if(data.error == '2'){
                    setsel(2);
                }
                if(data.error == '3'){
                    setsel(3);
                }
            }
            else{
                setsel(1);
            }
        }
        sd();
    },[]);
    return(
        <div className='container'>
            <div className='card my-5 shadow'>
               <div className='card-body'>
                   {ups()}
               </div>
            </div>
        </div>
    );
};
const start=async()=>{

};
export function Al(){
    return(
        <div>
            You already gave this test
        </div>
    );
}
function Na(){
    return(
        <div>
            You are not invited to this test
        </div>
    );
}
function Wel(){
    return(
        <React.Fragment>
            <div className='text-center'>
                welcome
            </div>
            <div>test duration  is 2 hours</div>
            <span>don't change tabs</span><br/><hr/>
            <button className='btn btn-outline-primary' onClick={()=>start()}>Start</button>
        </React.Fragment>
    );
}
/**{sel>=2 ? (sel==2 ? (<Al/>):(<Na/>) ):(<Wel/>)} */