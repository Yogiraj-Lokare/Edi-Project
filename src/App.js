import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Question from './components/Question';
import Footer from './components/Footer';
import { connect, useSelector } from 'react-redux';
import { loadData, setTokenHeader } from './redux/actions';
import { useParams } from 'react-router-dom';
function App(props) {
    const [select,setSelect] = useState(1);
    const Modify=(value)=>{
      setSelect(value);
    }
    if(localStorage.getItem('jwt')){
        setTokenHeader(localStorage.getItem('jwt'));
    }
    const testName = useParams();
    const {loading,LegalAccess} = useSelector(state=>state.reducer_main_test);
    useEffect(()=>{
        props.loadData(testName.id);
    },[]);
    const selectedQuestionStyle={
        backgroundColor:'rgb(20, 98, 243)',
        color:'white',
    }
    const answerdQuestionStyle={
        backgroundColor: 'rgb(5, 146, 36)',
        color:'white'
    }
    return (loading? <div>Loading...</div>:
        !LegalAccess ? <div>Illegal Access</div>:(
      <React.Fragment>
        <div className='container1'>
        <Navbar />
        <div className="main">
        <div className='list'>
                {props.list.map(Question=>{
                    var tooltip=`question no. ${Question.number}`;
                    if(Question.number == select){
                        return(
                            <button style={selectedQuestionStyle} data-toggle="tooltip" title={tooltip} id={Question._id} onClick={()=>Modify(Question.number)} key={Question._id} className="qbtn" >{Question.number}</button>
                        )
                    }
                    if(props.answers[Question.number-1] != 0){                        
                        return <button data-toggle="tooltip" title={tooltip} style={answerdQuestionStyle} id={Question._id} onClick={()=>Modify(Question.number)} key={Question._id} className="qbtn" >{Question.number}</button>
                    }
                    return <button data-toggle="tooltip" title={tooltip} id={Question._id} onClick={()=>Modify(Question.number)} key={Question._id} className="qbtn" >{Question.number}</button>
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
        loadData: (name)=> {dispatch(loadData(name)) }  
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
