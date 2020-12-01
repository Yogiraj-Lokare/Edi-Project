import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetch, save_test_id } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { Header1 } from '../mainPage';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
export function MyTest(){
    const {data} = useSelector(state=>state.reducer_my_tests);
    const [results,setResults] = useState([{
        key:1,
        username:'2',
        email:'22',
        score:1
    }]);
    const hideResults = () =>{
        const page = document.getElementById('page');
        page.classList.remove('show-results');
        page.classList.add('hide-results');
    }
    const result = async(par)=>{
        const {data} = await axios.post('/test/results',{test_name:par.test_name});
        setResults(data);
        const page = document.getElementById('page');
        page.classList.remove('hide-results');
        page.classList.add('show-results');
    }
    const check=()=>{
        if(data[0] == undefined){
            return true;
        }    
        if(data[0].test_name == 'dummy_name'){
            return false;
        }
        return true;
    }
    const del=async(par)=>{
        const {data} = await axios.post('/test/delete',{_id:par.key});
        window.confirm('Test deleted successfully');
        window.location.reload();
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
                <thead className='thead-light' >
                    <tr >
                    <th style={{backgroundColor:'rgba(111, 7, 247, 0.445)',color:'white'}} scope='col'>#</th>
                    <th style={{backgroundColor:'rgba(111, 7, 247, 0.445)',color:'white'}} scope='col'>Test-Name</th>
                    <th style={{backgroundColor:'rgba(111, 7, 247, 0.445)',color:'white'}} scope='col'>Start_time</th>
                    <th style={{backgroundColor:'rgba(111, 7, 247, 0.445)',color:'white'}} scope='col'>End_time</th>
                    <th style={{backgroundColor:'rgba(111, 7, 247, 0.445)',color:'white'}}  scope='col'>Edit</th>
                    <th style={{backgroundColor:'rgba(111, 7, 247, 0.445)',color:'white'}} scope='col' >Delete</th>
                    <th style={{backgroundColor:'rgba(111, 7, 247, 0.445)',color:'white'}} scope='col'>View</th>
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
                                    <td>
                                        <IconButton  disabled={ts.disabled} aria-label='edit' onClick={()=>redirect(ts)}  style={{outline:'none'}}><EditIcon /></IconButton>
                                    </td>
                                    <td> <IconButton onClick={()=>del(ts)}  style={{outline:'none'}} color='secondary' aria-label='delete'><DeleteIcon/></IconButton></td>
                                    <td><button onClick={()=>result(ts)} className='btn btn-success' >Results</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    </table>
                    <hr/>
                    <div className='hide-results' id='page'>

                        <table className='table table-bordered'>
                    <thead className='thead-light' >
                    <tr >
                    <th style={{backgroundColor:'#ccc',color:'white'}} scope='col'>#</th>
                    <th style={{backgroundColor:'#ccc',color:'white'}} scope='col'>User-name</th>
                    <th style={{backgroundColor:'#ccc',color:'white'}} scope='col'>Email-Id</th>
                    <th style={{backgroundColor:'#ccc',color:'white'}} scope='col'>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            results.map(ts=>{
                                return (
                                    <tr key={ts.key}>
                                    <th scope='row'>{ts.key}</th>
                                    <td>{ts.username}</td>
                                    <td>{ts.email}</td>
                                    <td>{ts.score}</td>
                                    
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    </table>
                    <Button color='primary' onClick={()=>hideResults()} style={{outline:'none'}}>close</Button>
                    </div>
                </div>
            </div>
            
        </div>
        </React.Fragment>
    );
}