
//------------------------------------
//-------------------------------------------------
import './Gall_Workorders_Info_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";

import { connect } from 'react-redux';

import { OnRevitElementSelected } from '../store/actions';


// import {bim_tree} from '../BIM_META_DATA'

 class Gall_Workorders_Info_comp extends React.Component {
  state = {

  
  };

  componentDidUpdate()
  {

  //  if (this.props.state.SelectedRevitElementId != this.state.lastSelectedElementId) {//changed
  //    if (this.props.state.SelectedRevitElementId == this.props.ElementId)
  //    {
  //      this.setState({
  //        selectionClass:'-selected',
  //        lastSelectedElementId:this.props.state.SelectedRevitElementId
  //      })

  //    }else
  //    {
  //      this.setState({
  //        selectionClass:'',
  //        lastSelectedElementId:this.props.state.SelectedRevitElementId
  //      })

  //    }

  //  }
  }
  componentDidMount()
  {
    //console.log("o");
  }
  ToggleVisability(e)
  {
    e.stopPropagation()
    if(this.state.visable)
    {
      //hide
      this.setState({
        visable:false,
        visabilityClass:"-slash"
      })
      this.HideElement();
      
    }else
    {
      //show
      this.setState({
        visable:true,
        visabilityClass:""
      })
      this.ShowElement();
    } 
  }

/////////////3D Viewer////////////////////
  HideElement(){}

  ShowElement(){}


  FocusAndSelectElement(){
    window._unityInstance.SendMessage('GameManager', 'JS_SelectAndFocusElement', this.props.state.selectedWorkorder.workorder_eid);
  }
/////////////////////////////////////////
  render() {

  
    return (
      <>
        <div className='gall-workorder-title'>Work Order Info</div>
        {
          this.props.state.selectedWorkorder.workorder_id == -1 ? (
            <>

            </>
          ):(
            <>
              <div className='gall-workorder-cell-A'>Work order ID: <span className='gall-workorder-orderid'>{this.props.state.selectedWorkorder.workorder_id}</span></div>
              <div className='gall-workorder-cell-B'>Owner Element: <span className='gall-workorder-element'>{this.props.state.selectedWorkorder.workorder_eid}</span></div>
              <div className='gall-workorder-cell-A'>Type: 
                <div>
                  <select class="form-select" disabled>
                    <option>{this.props.state.selectedWorkorder.workorder_type}</option>
                  </select>
                </div>
              </div>
              <div className='gall-workorder-cell-B'>Title: <div><input type="text" class="form-control" placeholder={this.props.state.selectedWorkorder.workorder_title} disabled/></div></div>
              <div className='gall-workorder-cell-A'>Discription: <div>
                <textarea class="form-control" rows="5" id="comment" name="text" value={this.props.state.selectedWorkorder.workorder_desc} disabled>                
                </textarea></div></div>
              <div className='gall-workorder-cell-B'>Assigned To: <div><input type="email" class="form-control" id="email" placeholder={this.props.state.selectedWorkorder.workorder_email} name="email" disabled/></div></div>
              <div className='gall-workorder-cell-A'><div className='gall-workorder-cell-submit-button-container'><button onClick={()=>{this.FocusAndSelectElement()}} type="button" class="btn btn-light">Focus</button></div></div>            
            </>
          )

        }
          
      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {OnRevitElementSelected})(Gall_Workorders_Info_comp);





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