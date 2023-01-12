
//------------------------------------
//-------------------------------------------------
import './Gall_Issues_Menu_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";

import { connect } from 'react-redux';

import { OnWorkorderSelection } from '../store/actions';

import Gall_Workorders_Info_comp from '../Gall_Workorders_Info_comp/Gall_Workorders_Info_comp'
import Gall_Workorder_comp from '../Gall_Workorder_comp/Gall_Workorder_comp'


 class Gall_Issues_Menu_comp extends React.Component {
  state = {
    propertiesMenuVisability : false,
    lastSelectedElementId : "",
    selectedElementProps : [],
    workorderComponents : [],
    isViewerLoaded:false,
    lastWorkordersCount:0,
    isVisable: false,
    visabilityClass:'hiddenItem',
  };






  componentDidUpdate()
  {

    if (this.props.state.workordersVisability != this.state.isVisable) {
      //Change Visability
      if (this.state.isVisable) {
        //hide
        this.setState({
          visabilityClass:'hiddenItem',
          isVisable:this.props.state.workordersVisability
        })
        window._unityInstance.SendMessage('GameManager', 'JS_HideIssues', '');
      }else{
        //show
        this.setState({
          visabilityClass:'',
          isVisable:this.props.state.workordersVisability
        })
        window._unityInstance.SendMessage('GameManager', 'JS_ShowIssues', '');
      }
    }





    if (this.props.state.loaded) {
      if (!this.state.isViewerLoaded) {
       // alert("aa")
        this.setState({isViewerLoaded:true});
        //first time
        var workorderComponents = []
        console.log(this.props.state.workorders.length);
        for (let i = this.props.state.workorders.length-1; i >= 0; i--) {
          workorderComponents = [...workorderComponents, 
            <Gall_Workorder_comp key={this.props.state.workorders[i].id} issueId={this.props.state.workorders[i].id}/>
          ]
          
        }
    this.setState({
      lastWorkordersCount : this.props.state.workorders.length,
      workorderComponents
    })

      } else {
        //other mods
        if (this.props.state.workorders.length != this.state.lastWorkordersCount) {
          var workorderComponents = []
          console.log(this.props.state.workorders.length);
          for (let i = this.props.state.workorders.length-1; i >=0; i--) {
            workorderComponents = [...workorderComponents, 
              <Gall_Workorder_comp key={this.props.state.workorders[i].id} issueId={this.props.state.workorders[i].id}/>
            ]
            
          }
      this.setState({
        lastWorkordersCount : this.props.state.workorders.length,
        workorderComponents
      })
        }
      }
    }
  }







  componentDidMount()
  {
    
    this.dragElement(document.getElementById("mydivvvv"),document.getElementById("draggableSpott"));
  }

   dragElement(elmnt,draggingEle) {
    var Pelmnt = elmnt.parentElement;
  
    var dragMouseDown = (e) => {
      //e = e || window.event;
      //e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    var elementDrag = (e) => {
      //e = e || window.event;
      //e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:

      elmnt.style.top = ((elmnt.offsetTop - pos2) > Pelmnt.offsetTop) && (elmnt.offsetTop + elmnt.offsetHeight - pos2 < Pelmnt.offsetTop + Pelmnt.offsetHeight) ? (elmnt.offsetTop - pos2) + "px" : (elmnt.offsetTop) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1 > Pelmnt.offsetLeft) && (elmnt.offsetLeft + elmnt.offsetWidth - pos1 < Pelmnt.offsetLeft + Pelmnt.offsetWidth) ? (elmnt.offsetLeft - pos1) + "px" : elmnt.offsetLeft+"px";
    }
  
    var closeDragElement = () => {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }



    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (draggingEle) {
      // if present, the header is where you move the DIV from:
      draggingEle.onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  }

  TogglePropertiesMenuVisability()
  {
    if (this.state.propertiesMenuVisability) {
      document.getElementById("gall-issues-menu-data-container-Properties-id").style.width = "0";
      document.getElementById("gall-issues-menu-data-container-Properties-id").style.left = "-3px";
      this.setState({
        propertiesMenuVisability : false
      })
    } else {
      document.getElementById("gall-issues-menu-data-container-Properties-id").style.width = "370px";
      document.getElementById("gall-issues-menu-data-container-Properties-id").style.left = "-83%";
      this.setState({
        propertiesMenuVisability : true
      })
    }
  }

  UnselectAllIssues(e)
  {
    this.props.OnWorkorderSelection({workorder_id:'-1'})
  }

  render() {


    return (
      <>

      <div class={`gall-issues-menu-container ${this.state.visabilityClass}`} id='mydivvvv'>
          <div class="gall-issues-menu-upperControl-A-drag" id='draggableSpott'></div>
          <div class="gall-issues-menu-upperControl">
            <div class="gall-issues-menu-upperControl-A">
              <div class="gall-issues-menu-title">Work Order</div>

            </div>
            <div class="gall-issues-menu-upperControl-sep"></div>
            <div class="gall-issues-menu-upperControl-B container-fluid">
              <div class="row gall-issues-menu-upperControl-B-row">
                <div class={`gall-issues-menu-upperControl-B-Button${(!this.state.propertiesMenuVisability)?(""):("-Active")} col-6`}  onClick={() =>{this.TogglePropertiesMenuVisability()}}>Details</div>
                <div class="gall-issues-menu-upperControl-B-Button-Selected col-6">Orders list</div>
              </div>
            </div>
          </div>
          <div onClick={(e) => {this.UnselectAllIssues(e)}} class="gall-issues-menu-data-container-Elements">
            {this.state.workorderComponents}

          <br></br>
          </div>
          <div class="gall-issues-menu-data-container-Properties gall-workorder-modal-content" id='gall-issues-menu-data-container-Properties-id'>
            

        <Gall_Workorders_Info_comp/>



          </div>
      </div>


      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {OnWorkorderSelection})(Gall_Issues_Menu_comp);





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