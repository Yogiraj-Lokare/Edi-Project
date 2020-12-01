import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Header1 } from '../mainPage';
export function EditTest(){
    const [file,Setfile] = useState(null);
    const [loaded,setLo] = useState(0);
    const [loaded1,setLo1] = useState(0);
    const [file1,Setfile1] = useState(null);
    const [testName, setTestname] = useState('');
    const [testdh, setTestdh] = useState(0);
    const [testst, setTestst] = useState('');
    const [testet, setTestet] = useState('');
    const [testdm, setTestdm] = useState(0);
    const [testett, setTestett] = useState('');
    const [teststt, setTeststt] = useState('');
    const [message , setmessage] = useState('');
    var ev = 'Open'; 
    const {test_id } = useSelector(state=>state.reducer_my_tests);
    useEffect(()=>{
        const fe=async()=>{
            const {data} = await axios.post('/test/onetest',{test_id:test_id});
            console.log(data);
            if(data.kind != 'ObjectId'){
            setTestname(data.test_name);
            setTestdh(data.test_duration.hour);
            setTestdm(data.test_duration.min);
            setTestst(data.start_time.date);
            setTestet(data.end_time.date);
            setTestett(data.end_time.time);
            setTeststt(data.start_time.time);
            }
        }
        //dispatch(fetch());
        fe();
    },[]);
    const SetError=(error)=>{
        setmessage(error);
        var er = document.getElementById('error');
        er.style.display = 'block';  
    }
    const clear=()=>{
        var er = document.getElementById('error');
        er.style.display = 'none';
    }
    const check=()=>{
        const ler = document.getElementById('sel');
        const v2 = document.getElementById('close');
        ev=ler.value;
        ev == 'Open' ? v2.style.display = 'none':v2.style.display = 'block';
    }
    const handle=(e)=>{
        setLo(0);
        console.log(e.target.files[0]);
        Setfile(e.target.files[0]);
    }
    const handle1=(e)=>{
        setLo1(0);
        console.log(e.target.files[0]);
        Setfile1(e.target.files[0]);
    }
    const upfile1=async(e)=>{
        e.preventDefault();
        if(file != null){
        const data1 = new FormData();
        data1.append('file', file);
        const {data} = await axios.post('/test/allowuser',data1,{
            onUploadProgress:ProgressEvent=>{
                setLo(ProgressEvent.loaded / ProgressEvent.total*100);
            }
        })
        }
        else{
            SetError('Select the file first');
        }
    }
    const upfile=async(e)=>{
        e.preventDefault();
        if(file1 != null){
        const data1 = new FormData();
        data1.append('file',file1);
        const {data} = await axios.post('/test/testlist',data1,{
            onUploadProgress:ProgressEvent=>{
                setLo1(ProgressEvent.loaded / ProgressEvent.total*100);
            }
        });
        }
        else{
            SetError('Select the file first');
        }
    }
    const submit=async(e)=>{
        e.preventDefault();
        //console.log(e.target.test_start_date.value);
        var body={
            test_name:e.target.test_name.value,
            test_d_h:testdh,
            test_d_m:testdm,
            test_start_from_date:e.target.test_start_date.value,
            test_start_from_time:e.target.test_start_time.value,
            test_end_at_date:e.target.test_end_date.value,
            test_end_at_time:e.target.test_end_time.value,
            test_type:e.target.types.value,
            test_id:test_id
        }
        const {data} = await axios.post('/test/editdata',body);
        if(data.error != null){
            var dd = data.error;
            const dd1 = dd.toString();
            console.log(dd1);
            SetError(dd1);
            //console.log(data.error);
        }
        if(data.success != null){
            window.confirm('data uploaded succesfully');
            window.location.reload();
        }
    }
    return(
        <React.Fragment>
            <Header1/>
            <div className='container'>
                <div className='card my-5 shadow'>
                <div className='card-body'>
                    <div className='text-center'>
                        <div className='h4 mb-4'> Edit Test</div>
                    </div>
                <div id='error' style={{display:'none'}} className='alert alert-danger alert-dismissible'> <button onClick={()=>clear()} className='close' datadismiss='alert' aria-label='close'>&times;</button><strong>{message}</strong>
                </div>
                <form className='user' onSubmit={(e)=>submit(e)}>
                    <div className='form-group '>
                        <label>Test_Name</label>
                        <input required={true} value={testName} onChange={(e)=>setTestname(e.target.value)} className='form-control form-control-user w-25' name='test_name' placeholder='Enter Test-name'></input>
                    </div>
                    <div className='form-group '>
                        <label>Test_Duration:</label>
                        <div className='form-group row'>
                            <div className='col-lg-5'>
                                <label className=''>Hour:</label>
                                <input required={true} value={testdh} onChange={(e)=>setTestdh(e.target.value)} type='Number' className='form-control form-control-user w-50' name='hour'></input>
                            </div>
                            <div className='col-lg-5'>
                                <label className=''>Minutes:</label>
                                <input required={true} value={testdm} onChange={(e)=>setTestdm(e.target.value)} type='Number' className='form-control form-control-user w-50' name='min '></input>
                            </div>
                        </div>
                    </div>
                    <div className='row form-group'>
                    <div className='form-group col-lg-5'>
                        <label>test_start_from_date</label>
                        <input required={true} type='date' value={testst} onChange={(e)=>setTestst(e.target.value)} className='form-control form-control-user w-50' name='test_start_date' placeholder='Enter Test-name'></input>
                    </div>
                    <div className='form-group col-lg-5'>
                        <label>test_start_from_time</label>
                        <input required={true}  type='time'  value={teststt} onChange={(e)=>setTeststt(e.target.value)} className='form-control form-control-user w-50' name='test_start_time' placeholder='Enter Test-name'></input>
                    </div>
                    </div>
                    <div className='row form-group'>
                    <div className='form-group col-lg-5'>
                        <label>test_end_at_date</label>
                        <input required={true} value={testet} onChange={(e)=>setTestet(e.target.value)} type='date' className='form-control form-control-user w-50' name='test_end_date' placeholder='Enter Test-name'></input>
                    </div>
                    <div className='form-group col-lg-5'>
                        <label>test_end_at_time</label>
                        <input required={true} type='time' value={testett} onChange={(e)=>setTestett(e.target.value)} className='form-control form-control-user w-50' name='test_end_time' placeholder='Enter Test-name'></input>
                    </div>
                    </div>
                    <div className='form-group '>
                        <label>Test_Type</label>
                        <select id='sel' name='types' onChange={()=>check()}  className=' form-control form-control-user w-25'>
                            <option  value='Open' >open</option>
                            <option value='Closed'>closed</option>
                        </select>
                    </div>
                    <div id='close' style={{display:'none'}}  className=''>
                    <div className='form-group '>
                        <label>Allowed Users:</label>
                        <input  accept='.xlsx' type='file' onChange={(e)=>handle(e)} className='form-control form-control-user w-25' name='file'></input>
                        <button  onClick={(e)=>upfile1(e)} className='btn btn-info mt-3'>Upload</button>
                        <div className='progress w-25 mt-2 mb-2'>
                            <div className='progress-bar  progress-bar-striped  progress-bar-animated' role='progressbar' style={{width: `${loaded}%`}} aria-valuenow='55'
                            aria-valuemin='0' aria-valuemax='100'>{loaded}%</div>
                    </div>
                    </div>
                    </div>
                    
                    <div className='form-group '>
                        <label>Questions_List:</label>
                        <input required={true} type='file' accept='.xlsx' onChange={(e)=>handle1(e)} className='form-control form-control-user w-25' name='file1'></input>
                    </div>
                    <div className='progress w-25 mt-2 mb-2'>
                            <div className='progress-bar  progress-bar-striped  progress-bar-animated' role='progressbar' style={{width: `${loaded1}%`}} aria-valuenow='55'
                            aria-valuemin='0' aria-valuemax='100'>{loaded1}%</div>
                    </div>
                    <button onClick={(e)=>upfile(e)} className='btn btn-info mt-3'>Upload_List</button><hr></hr>
                    <input  className='btn  btn-outline-success' type='submit' name='submit'></input>
                </form>
                </div>
                </div>
            </div>
        </React.Fragment>
    );
}