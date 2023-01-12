
//------------------------------------
//-------------------------------------------------
import './Gall_Left_Side_Menu_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";

import { connect } from 'react-redux';

import Gall_Elements_Tree_comp from '../Gall_Elements_Tree_comp/Gall_Elements_Tree_comp'
import {bim_data} from '../BIM_META_DATA'

 class Gall_Left_Side_Menu_comp extends React.Component {
  state = {
    propertiesMenuVisability : false,
    lastSelectedElementId : "",
    selectedElementProps : [],
    isVisable: false,
    visabilityClass:'hiddenItem',
  };

 
//   <div className='gall-left-side-menu-data-container-Properties-Parameter-Group-Card'>
//   <div className='gall-left-side-menu-data-container-Properties-Parameter-Group-Header'>{}</div>
//   <div className='container'>{}


//       <div className='gall-left-side-menu-data-container-Properties-Parameter-Container row'>
//           <div className='gall-left-side-menu-data-container-Properties-Parameter-Name col-6'>{}</div>
//           <div className='gall-left-side-menu-data-container-Properties-Parameter-Value col-6'>{}</div>
//       </div>


//   </div>
// </div>



  componentDidUpdate()
  {

    if (this.props.state.browserVisability != this.state.isVisable) {
      //Change Visability
      if (this.state.isVisable) {
        //hide
        this.setState({
          visabilityClass:'hiddenItem',
          isVisable:this.props.state.browserVisability
        })
      }else{
        //show
        this.setState({
          visabilityClass:'',
          isVisable:this.props.state.browserVisability
        })
      }
    }


    if (this.props.state.SelectedRevitElementId != this.state.lastSelectedElementId) {
    if("-1" != this.props.state.SelectedRevitElementId)
    {
      this.setState({lastSelectedElementId : this.props.state.SelectedRevitElementId})
      var elementParameterGroups = bim_data.e.find(e => e.i == this.props.state.SelectedRevitElementId).g.sort((a, b) => {
             if (a.n < b.n) {
                 return -1;
             }
             if (a.n > b.n) {
                 return 1;
             }
             return 0;
         });

      var AllGroups = []
      for (let i = 0; i < elementParameterGroups.length; i++) {
        var AllParameters = []
        for (let j = 0; j < elementParameterGroups[i].p.length; j++) {
          AllParameters = [...AllParameters,
            <div className='gall-left-side-menu-data-container-Properties-Parameter-Container row'>
                <div data-bs-toggle="tooltip" data-bs-placement="top" title={elementParameterGroups[i].p[j].n} className='gall-left-side-menu-data-container-Properties-Parameter-Name col-6 unselectable'>{elementParameterGroups[i].p[j].n}</div>
                <div onClick={(e) => {
                  navigator.clipboard.writeText(e.target.innerText == "-" ? "":e.target.innerText);
                }} data-bs-toggle="tooltip" data-bs-placement="top" title={elementParameterGroups[i].p[j].v == null || elementParameterGroups[i].p[j].v == "" || elementParameterGroups[i].p[j].v == " " ? "<empty>":elementParameterGroups[i].p[j].v} className='gall-left-side-menu-data-container-Properties-Parameter-Value col-6 unselectable'>{elementParameterGroups[i].p[j].v == null || elementParameterGroups[i].p[j].v == "" || elementParameterGroups[i].p[j].v == " " ? "-":elementParameterGroups[i].p[j].v}</div>
            </div>
          ]
          
        }
       var g =  <div kay={i} className='gall-left-side-menu-data-container-Properties-Parameter-Group-Card'>
                  <div className='gall-left-side-menu-data-container-Properties-Parameter-Group-Header unselectable'>{this.HandleParameterGroupName(elementParameterGroups[i].n)}</div>
                  <div className='container'>{AllParameters}</div>
                </div>
      AllGroups = [...AllGroups, g]
        
      }
      this.setState({
        selectedElementProps : AllGroups
      })
      this.UpdateTooltips();


    }










      
    }
  }
  HandleParameterGroupName(name)
  {
    if (name =="INVALID") {
      return "General";
    }else
    {
      
      return name.replace("PG_", "").replace("_", " ").toLowerCase().split(' ').map((s) => { if(s.charAt(0)!=="'") return s.charAt(0).toUpperCase() + s.substring(1)
      else return s.charAt(0)+s.charAt(1).toUpperCase() + s.substring(2)}).join(' ');
    }
  }
  UpdateTooltips()
  {
    setTimeout(() => {
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl)
      })
    }, 500);
  }
  componentDidMount()
  {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new window.bootstrap.Tooltip(tooltipTriggerEl)
    })

    this.dragElement(document.getElementById("mydivvv"),document.getElementById("draggableSpot"));
  }


   dragElement(elmnt,draggingEle) {
    
    var Pelmnt = elmnt.parentElement;
    var dragMouseDown = (e) => {
      //e = e || window.event;
     // e.preventDefault();
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
      //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
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
      document.getElementById("gall-left-side-menu-data-container-Properties-id").style.width = "0";
      this.setState({
        propertiesMenuVisability : false
      })
    } else {
      document.getElementById("gall-left-side-menu-data-container-Properties-id").style.width = "370px";
      this.setState({
        propertiesMenuVisability : true
      })
    }
  }


  render() {


    return (
      <>

      <div class={`gall-left-side-menu-container ${this.state.visabilityClass}`} id='mydivvv'>
            <div class="gall-left-side-menu-upperControl-A-drag" id='draggableSpot'></div>
          <div class="gall-left-side-menu-upperControl">
            <div class="gall-left-side-menu-upperControl-A">
              <div class="gall-left-side-menu-upperControl-A-search">Search</div>
              <div class="gall-left-side-menu-upperControl-A-sep"></div>
              <div class="gall-left-side-menu-upperControl-A-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            </div>
            <div class="gall-left-side-menu-upperControl-sep"></div>
            <div class="gall-left-side-menu-upperControl-B container-fluid">
              <div class="row gall-left-side-menu-upperControl-B-row">
                <div class={`gall-left-side-menu-upperControl-B-Button-Selected col-6`}>Elements</div>
                <div class={`gall-left-side-menu-upperControl-B-Button${(!this.state.propertiesMenuVisability)?(""):("-Active")} col-6`}  onClick={() =>{this.TogglePropertiesMenuVisability()}}>Properties</div>
              </div>
            </div>
          </div>
          <div class="gall-left-side-menu-data-container-Elements">
            <Gall_Elements_Tree_comp/>
          </div>
          <div class="gall-left-side-menu-data-container-Properties" id='gall-left-side-menu-data-container-Properties-id'>
          {this.state.selectedElementProps}



          </div>
      </div>


      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {})(Gall_Left_Side_Menu_comp);





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