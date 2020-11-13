import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetch, save_test_id } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { Header1 } from '../mainPage';
export function MyTest(){
    const {data} = useSelector(state=>state.reducer_my_tests);
    const check=()=>{
        if(data[0] == undefined){
            return true;
        }    
        if(data[0].test_name == 'dummy_name'){
            return false;
        }
        return true;
    }
    const dispatch = useDispatch();
    const history = useHistory();
    const redirect=(par)=>{
        dispatch(save_test_id(par.key));
        history.push('/edittest');
    }
    useEffect(()=>{
        if(!check()){
            dispatch(fetch());
        }
    },[]);
    return(
        <React.Fragment>
        <Header1/>
        <div className='container'>
            <div className='card my-5 shadow'>
                <div className='card-body'>
                <div className='text-center'>
                        <div className='h4 mb-4'>Your tests</div>
                    </div>
                <table className='table table-bordered'>
                <thead className='thead-light'>
                    <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Test-Name</th>
                    <th scope='col'>Start_time</th>
                    <th scope='col'>End_time</th>
                    <th  scope='col'>Edit</th>
                    <th  scope='col'>View</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(ts=>{
                                return (
                                    <tr key={ts.key}>
                                    <th scope='row'>{ts.no}</th>
                                    <td>{ts.test_name}</td>
                                    <td>{ts.test_start}</td>
                                    <td>{ts.test_end}</td>
                                    <td><button disabled={ts.disabled} onClick={()=>redirect(ts)} className='btn btn-secondary' >Edit</button></td>
                                    <td><button className='btn btn-success' >Results</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    </table>
                </div>
            </div>
            
        </div>
        </React.Fragment>
    );
}