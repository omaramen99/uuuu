
//------------------------------------
//-------------------------------------------------
//import './Home_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";




import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj } from '../store/actions';
 class Home_comp extends React.Component {
  state = {

  };
  // constructor(props)
  // {
   
  //   super(props);
  //   this.state={
  //     complete : ""
  //   };
  // }
  componentDidMount()
  {
    window.location.pathname = "/project"

  }

  RecordHistory()
  {
    if (!this.props.state.history) {
      
      this.props.setHistoryObj(this.props.history)
    }
    else{
      
     // console.log(this.props);
    }
    this.props.setMatchObj(this.props.match)
  }


  render() {
    return (
      <>
      
      

     
      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj})(Home_comp);





// //------------------------------------
// //-------------------------------------------------
// import './Header_comp.css';
// //import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
// import ReactDOM from "react-dom";
// import React from "react";

// export default class Header_comp extends React.Component {
//   state = {

//   };
//   // constructor(props)
//   // {
   
//   //   super(props);
//   //   this.state={
//   //     complete : ""
//   //   };
//   // }


//   render() {
//     return (
//       <>

//       </>
//     );
//   }

  
// }