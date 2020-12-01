import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header1 } from '../mainPage';
import axios from 'axios';
export function GivenTest(){
    var dd = [{
        key:1,
        no:1,
        test_name:'oneeee',
        test_start:12,
        test_end:3,
        score:56
    }]
    const [data1,setdata] = useState(dd);
    useEffect(()=>{
        const load=async()=>{
            const {data} = await axios.get('/test/given');
            setdata(data);
        };
        load();
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
                    <th  scope='col'>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data1.map(ts=>{
                                return (
                                    <tr key={ts.key}>
                                    <th scope='row'>{ts.no}</th>
                                    <td>{ts.test_name}</td>
                                    <td>{ts.test_start}</td>
                                    <td>{ts.test_end}</td>
                                    <td>{ts.score}</td>
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