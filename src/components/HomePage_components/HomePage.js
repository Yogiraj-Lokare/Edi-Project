import React, { useState} from 'react';
import {  useHistory, NavLink } from 'react-router-dom';
import "../styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Navbar} from 'react-bootstrap';
import { LoginForm } from './loginForm';
import { RegisterForm } from './registerForm';
import { useDispatch } from 'react-redux';
import { logout ,setTokenHeader} from '../../redux/actions';

export default function HomePage(){
    const name = localStorage.getItem('username');
    var loggedIn = false;
        if(name != null){
            loggedIn=true;
        }
    if(localStorage.getItem('jwt')){
        setTokenHeader(localStorage.getItem('jwt'));
    }
    const dispatch = useDispatch();
    /*const [value,setvalue] = useState('');
    const [message,setmessage] = useState('');*/
    const [show ,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [option, setOption] = useState(1);
    const opt1=()=>{setOption(1);}
    const opt2=()=>{setOption(2);}  
    const handleShow = () => setShow(true);
    const history = useHistory();
    const loggout=()=>{
        dispatch(logout());
        history.push('/');
    }
    return(
        <div className='maiin'>
            {loggedIn ? (
                <nav className='navbar navbar-expand-lg shadow static-top mb-4 navbar-light bg-white '>
                <a className='navbar-brand' href='#'>{name}</a>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#
               navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false'
               aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse ml-md-3' id='navbarSupportedContent'>
                <ul className='navbar-nav mr-auto'>
                <li className='nav-item '>
                <NavLink  to='/testcode' className='nav-link ' >Search</NavLink>
                </li>
                <li className='nav-item'>
                <NavLink  to='/giventests' className='nav-link' >Given-tests</NavLink>
                </li>
                <li className='nav-item'>
                <NavLink  to='/mytests' className='nav-link' >Conducted-tests</NavLink>
                </li>
                <li className='nav-item'>
                <NavLink  to='/create' className='nav-link' >Create-Test</NavLink>
                </li>
                </ul>
                <button  onClick={()=>loggout()} className=' btn btn-outline-danger my-2 my-sm-0'>
                     Logout
                </button>
                </div>
               </nav>
              
            ):(
                <Navbar expand='lg' variant='light' bg='white' className=' shadow static-top flex-row justify-content-between mb-4'>
                <a className='navbar-brand' href='#'>TestIt</a>
                <Button variant="primary" onClick={handleShow} className=''>
                        Sign-In
                </Button>
                </Navbar>
            )}
            
            <Modal show={show} onHide={handleClose} className=''>
                <Modal.Header  closeButton>
                    <Modal.Title  >Sign_In</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div>
                        <div className='d-flex justify-content-between'>
                        <Button  className='w-100 ml-0 rounded-0 ' onClick={()=>opt1()} >Login</Button>
                        <Button  className='w-100 rounded-0 ' onClick={()=>opt2()} >Register</Button>
                        </div>
                        <div>
                           {option == 1 ? (<LoginForm/>):(<RegisterForm/>)}
                        </div>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
        </Modal>
        </div> 
    );
}
/*const mapStateToProps=(state)=>{
    return {
        list:state.reducer.list,
        answers:state.reducer.answers,
        remain:state.reducer.remain
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      decrementRemain: ()=> { dispatch(decrementRemain()) },
      incrementRemain: ()=> { dispatch(incrementRemain()) }  
    }
}
*/
//export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
            /*<main className='main-home'>
                <Link to='/sample'>Sample Test</Link>
            </main>*/
            /*<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            </nav>*/
            /*<Navbar expand='lg' variant='light' bg='white' className=' shadow static-top flex-row justify-content-between mb-4'>
                <div className='navbar-brand'>{name}</div>
                <div>
                <ul className='nav nav-tabs'>
                <li className='nav-item'>
                    <a className='nav-link active' href='#!'>Active</a>
                    </li>
            <li className='nav-item'>
            <a className='nav-link' href='#!'>Link</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link disabled' href='#!'>Disabled</a>
                </li>
                </ul>
                </div>
                <Button variant="primary" onClick={()=>loggout()} className=''>
                     Logout
                </Button>
                </Navbar>*/
                /*
                <div className='container21'>
            <div className='p11'>
            <form action='#' className='frm' onSubmit={(e)=>do1(e)} >
                    <input type='text' name='asd' value={value} onChange={(e)=>chanfe(e)} className='inp' id='inp1' placeholder='Enter test code'></input>
            </form>
            <button className='ben' onClick={()=>submitHandler()}> Go</button>
            </div>
            {message}
            <div className='crt'>
                <Link to='/create' >Create your own Test</Link>
            </div>
        </div>
                 */