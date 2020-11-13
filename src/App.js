import React, { Component,useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Question from './components/Question';
import Footer from './components/Footer';
import { connect, useSelector } from 'react-redux';
import { loadData, setTokenHeader } from './redux/actions';
import store from './redux/store';
function App(props) {
    const [select,setSelect] = useState(1);
    const Modify=(value)=>{
      setSelect(value);
    }
    if(localStorage.getItem('jwt')){
        setTokenHeader(localStorage.getItem('jwt'));
    }
    const {loading,error} = useSelector(state=>state.reducer_main_test);
    useEffect(()=>{
        //props.loadData();
        console.log(store.getState());
    },[]);
    const sylee={
        backgroundColor:'rgb(20, 98, 243)',
        color:'white',
    }
    const sd2={
        backgroundColor: 'rgb(5, 146, 36)',
        color:'white'
    }
    return (loading? <div>Loading...</div>:
        error?<div>{error}</div>:(
      <React.Fragment>
        <div className='container1'>
        <Navbar />
        <div className="main">
        <div className='list'>
                {props.list.map(co=>{
                    var tos=`question no. ${co.number}`;
                    if(co.number == select){
                        return(
                            <button style={sylee} data-toggle="tooltip" title={tos} id={co._id} onClick={()=>Modify(co.number)} key={co._id} className="qbtn" >{co.number}</button>
                        )
                    }
                    if(props.answers[co.number-1] != 0){                        
                        return <button data-toggle="tooltip" title={tos} style={sd2} id={co._id} onClick={()=>Modify(co.number)} key={co._id} className="qbtn" >{co.number}</button>
                    }
                    return <button data-toggle="tooltip" title={tos} id={co._id} onClick={()=>Modify(co.number)} key={co._id} className="qbtn" >{co.number}</button>
                    })} 
                </div>   
            <Question select={select} Next={Modify}/>
        </div>
        <Footer/>
        </div>
        </React.Fragment>)
    );
}
const mapStateToProps=(state)=>{
    return {
        list:state.reducer_main_test.list,
        answers:state.reducer_main_test.answers
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: ()=> {dispatch(loadData()) }  
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
