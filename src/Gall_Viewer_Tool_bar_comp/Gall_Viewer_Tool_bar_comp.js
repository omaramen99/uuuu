
//------------------------------------
//-------------------------------------------------
import './Gall_Viewer_Tool_bar_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";

import { connect } from 'react-redux';

import { OnWorkorderCreationFormOpened,OnToggleBrowserVisability,OnToggleWorkordersVisability } from '../store/actions';



import imgSrc1 from '../media/A.png';
import imgSrc2 from '../media/B.png';
import imgSrc3 from '../media/C.png';
import imgSrc4 from '../media/D.png';

import imgSrc5 from '../media/E.png';
import imgSrc6 from '../media/F.png';
import imgSrc7 from '../media/G.png';

import imgSrc8 from '../media/H.png';
import imgSrc9 from '../media/I.png';
import imgSrc10 from '../media/J.png';
import imgSrc11 from '../media/K.png';

 class Gall_Viewer_Tool_bar_comp extends React.Component {
  state = {
    buttonA_active:false,
    buttonB_active:false,
    buttonC_active:false,
    buttonD_active:false,
    buttonE_active:false,
    buttonF_active:false,
    buttonG_active:false,
    buttonH_active:false,
    buttonI_active:false,
    buttonJ_active:false,
    buttonK_active:false,
  };

  componentDidMount()
  {
   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
   var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
     return new window.bootstrap.Tooltip(tooltipTriggerEl)
   })

  }
ToggleBoolState(stateName,forceBool)
{
  var s = {}
  if (forceBool != null) {
    s[stateName] = forceBool;
  }else
  {
    s[stateName] = !this.state[stateName];
  }
  this.setState(s);

}
HomeView()
{
  window._unityInstance.SendMessage('GameManager', 'JS_HomeView', "");
}
FocusSelected()
{
  window._unityInstance.SendMessage('GameManager', 'JS_FocusSelectedElement', "");
}



ToggleSectionBox()
{
  window._unityInstance.SendMessage('GameManager', 'JS_ToggleCrossSectionBox', "");
  this.ToggleBoolState('buttonE_active')
  this.ToggleBoolState('buttonF_active',!this.state.buttonE_active)
}

ToggleSectionBox_Visability()
{
  window._unityInstance.SendMessage('GameManager', 'JS_ToggleCrossSectionBoxVisability', "");
  this.ToggleBoolState('buttonF_active')
}

ResetToggleSectionBox()
{
  window._unityInstance.SendMessage('GameManager', 'JS_ResetCrossSectionBox', "");
}

ToggleGridsFull()
{
  window._unityInstance.SendMessage('GameManager', 'JS_ToggleGridsFull', "");
  this.ToggleBoolState('buttonH_active')
  if (this.state.buttonI_active && !this.state.buttonH_active) {
    this.ToggleBoolState('buttonI_active', false)
  }
}
ToggleGridsMini()
{
  window._unityInstance.SendMessage('GameManager', 'JS_ToggleGridsMini', "");
  this.ToggleBoolState('buttonI_active')
  if (this.state.buttonH_active && !this.state.buttonI_active) {
    this.ToggleBoolState('buttonH_active', false)
  }
}
AddIssue()
{
  var d = []
  window._unityInstance.SendMessage('GameManager', 'JS_CreateIssueOnElement', 'asfagaga,y,w');
}
OpenWorkorderCreationModal()
{
  if (this.props.state.SelectedRevitElementId != "-1" && this.props.state.SelectedRevitElementId != "") 
  {
   new window.bootstrap.Modal(document.getElementById('myModal'), {}).show()
   //workorderID
   //crypto.randomUUID();
   this.props.OnWorkorderCreationFormOpened(crypto.randomUUID());
  }
}

ToggleBrowserVisability()
{
  this.props.OnToggleBrowserVisability(!this.props.state.browserVisability)
  this.ToggleBoolState('buttonJ_active')
}
ToggleWorkordersVisability()
{
  this.props.OnToggleWorkordersVisability(!this.props.state.workordersVisability)
  this.ToggleBoolState('buttonK_active')
}
  render() {

  
    return (
      <>
      <div class="gall-tools-bar-container-container">

        <div id='gall-tools-bar-container' class="gall-tools-bar-container">

          <div onClick={() => {this.HomeView()}} class={`gall-tools-bar-tab`} data-bs-toggle="tooltip" title="home view">
            <img src={imgSrc1} alt=""/>
          </div>
          <div onClick={() => {this.FocusSelected()}} class={`gall-tools-bar-tab`} data-bs-toggle="tooltip" title="focus element">
            <img src={imgSrc2} alt=""/>
          </div>
          <div class={`gall-tools-bar-tab${this.state.buttonC_active?("-active"):("")}`} data-bs-toggle="tooltip" title="measure">
            <img src={imgSrc3} alt=""/>
          </div>
          <div onClick={() => {this.ToggleGridsMini()}} class={`gall-tools-bar-tab`} data-bs-toggle="tooltip" title="grids">
            <img src={imgSrc9} alt=""/>
          </div>
          <div onClick={() => {this.ToggleBrowserVisability()}} class={`gall-tools-bar-tab`} data-bs-toggle="tooltip" title="project browser">
            <img src={imgSrc10} alt=""/>
          </div>

          <div class="gall-tools-bar-sep"></div>

          <div onClick={() => {this.ToggleSectionBox()}} class={`gall-tools-bar-tab`} data-bs-toggle="tooltip" title="section box">
            <img src={imgSrc5} alt=""/>
          </div>
          <div onClick={() => {this.ToggleSectionBox_Visability()}} class={`gall-tools-bar-tab`} data-bs-toggle="tooltip" title="section box visability">
            <img src={imgSrc6} alt=""/>
          </div>
          <div onClick={() => {this.ResetToggleSectionBox()}} class={`gall-tools-bar-tab`} data-bs-toggle="tooltip" title="reset section box">
            <img src={imgSrc7} alt=""/>
          </div>

          <div class="gall-tools-bar-sep"></div>

          <div class={`gall-tools-bar-tab${this.state.buttonD_active?("-active"):("")}`}  onClick={() => {this.OpenWorkorderCreationModal();}} data-bs-toggle="tooltip" title="add issue">
            <img src={imgSrc4} alt=""/>
          </div>
          <div onClick={() => {this.ToggleWorkordersVisability()}} class={`gall-tools-bar-tab`} data-bs-toggle="tooltip" title="issues window">
            <img src={imgSrc11} alt=""/>
          </div>

        </div>

      </div>

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {OnWorkorderCreationFormOpened,OnToggleBrowserVisability,OnToggleWorkordersVisability})(Gall_Viewer_Tool_bar_comp);





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