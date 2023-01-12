
//------------------------------------
//-------------------------------------------------
import './Gall_Header_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";

import { connect } from 'react-redux';

import { setHistoryObj } from '../store/actions';



 class Gall_Header_comp extends React.Component {
  state = {
    ActiveHeaderObj:{
      project:"",
      issues:"",

    },
  };

  componentDidMount()
  {
var w = setInterval(() => {
  if (this.props.state.match.path) {
    this.ActivateHeaderTab(this.props.state.match.path.substring(1))
    window.clearInterval(w)
  }
}, 500);
    // this.ActivateHeaderTab(this.props.state.match.path.substring(1))
    // this.setState({

    // })
    // ActivateHeaderTab('/')
    // ActivateHeaderTab('/issues')

   // this.props.setHistoryObj(this.props.history)
   // console.log(this.props);
  }

  NavigateTo(endPoint)
  {
    this.ActivateHeaderTab(endPoint)
    this.props.state.history.push(`/${endPoint}`)

  }
  ResetTabsActivation()
  {
    var obj = this.state.ActiveHeaderObj;
    for (var key in obj) {
      obj[key] = ""
    }
    this.setState({
      ActiveHeaderObj:obj
    })
  }
  ActivateHeaderTab(ReqPath)
  {
      var obj = this.state.ActiveHeaderObj;
      /////////obj[ReqPath]= "-Active"
      obj[ReqPath]= ""
      for (var key in obj) {
        if (key != ReqPath) {
          obj[key] = ""
        }
      }
      this.setState({
        ActiveHeaderObj:obj
      })
    
  }

  render() {


    return (
      <>
          <nav class="navbar navbar-expand-sm bg-dark navbar-dark mainGallNav">
            <div class="container-fluid">
              <a target="_blank" class="navbar-brand gall-navbar-brand Aeonic-Bold" href="https://www.thegallium.com/">Gallium.</a>
              <div class="gal-nav-tabs-container">
                <div class={`gal-nav-tabs${this.state.ActiveHeaderObj.project} Aeonic`} href="#"  onClick={()=>{this.NavigateTo('project')}}>Projects</div>
                <div class="gall-navbar-sep"></div>
                <div class={`gal-nav-tabs${this.state.ActiveHeaderObj.issues} Aeonic`} href="#" onClick={()=>{this.NavigateTo('issues')}}>Issues</div>
                <div class="gall-navbar-sep"></div>
                <div class={`gal-nav-tabs${""} Aeonic`} href="#">Dashboard</div>
                <div class="gall-navbar-sep"></div>
                <div class={`gal-nav-tabs${""} Aeonic`} href="#">IOT</div>
              </div>
            </div>
          </nav>

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj})(Gall_Header_comp);





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