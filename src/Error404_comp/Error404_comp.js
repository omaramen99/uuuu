
//------------------------------------
//-------------------------------------------------
import './Error404_comp.css';

//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';

import ReactDOM from "react-dom";
import React from "react";
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj } from '../store/actions';

 class Error404_comp extends React.Component {
  state = {
    // skillImgMain : _400x500Skill,
    // title: 'My Skills',
    // details: 'Select a skill to see details',
    // DetailsBtn : true

  };

  componentDidMount()
  {
    this.RecordHistory();
//console.log(this.props.state.history);
//console.log(this.props);

  }

  RecordHistory()
  {
    if (!this.props.state.history) {
      
      this.props.setHistoryObj(this.props.history)
    }
    else{
      
      //console.log(this.props);
    }
    this.props.setMatchObj(this.props.match)
  }
  // constructor(props)
  // {
   
  //   super(props);
  //   this.state={
  //     complete : ""
  //   };
  // }


goToProject()
{
  this.props.state.history.push(`/project`)
}

  render() {


    return (
      <>
{/* <Header_comp /> */}
<div className='errorCont'>

<img class="error" onClick={()=>{this.goToProject()}} src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif" alt=""/>
</div>

                   

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj})(Error404_comp);




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