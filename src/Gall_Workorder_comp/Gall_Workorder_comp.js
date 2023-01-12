
//------------------------------------
//-------------------------------------------------
import './Gall_Workorder_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";

import { connect } from 'react-redux';

import { OnWorkorderSelection } from '../store/actions';



 class Gall_Workorder_comp extends React.Component {
  state = {
    workorder_id:'',
    workorder_eid:'',
    workorder_title:'',
    workorder_desc:'',
    workorder_email:'',
    workorder_type:'',
    workorder_typeC:'',
    workorder_select:'',

    isSelected:false,
  };

  componentDidMount()
  {
   var workorder_DATA = this.props.state.workorders.find(x => x.id === this.props.issueId)
   this.setState({
    workorder_id:workorder_DATA.id,
    workorder_eid:workorder_DATA.eid,
    workorder_title:workorder_DATA.title,
    workorder_desc:workorder_DATA.desc,
    workorder_email:workorder_DATA.email,
    workorder_type:workorder_DATA.type,
    workorder_typeC:workorder_DATA.typeC,
   })

  }

  componentDidUpdate()
  {

    if (this.props.state.selectedWorkorder.workorder_id == this.state.workorder_id) {
      if (!this.state.isSelected) {
       // alert('a')
        this.setState({
          workorder_select:'-selected',
          isSelected:true,
        })
      }
    }else
    {
      if (this.state.isSelected) {
       // alert('b')
        this.setState({
          workorder_select:'',
          isSelected:false,
        })
      }
    }


  }

  SelectIssue(e)
  {
    //console.log(this.state);
    e.stopPropagation();
    this.props.OnWorkorderSelection({
      workorder_id: this.state.workorder_id,
      workorder_eid: this.state.workorder_eid,
      workorder_title: this.state.workorder_title,
      workorder_desc: this.state.workorder_desc,
      workorder_email: this.state.workorder_email,
      workorder_type: this.state.workorder_type,
      workorder_typeC: this.state.workorder_typeC,
    })
  }

  render() {


    return (
      <>
          <div onClick={(e)=>{this.SelectIssue(e)}} className={`gal-workorder-card-container${this.state.workorder_select}`}>
          <div className={`gal-workorder-card-color issue-${this.state.workorder_typeC}`}></div>
            <div className='gal-workorder-card-title'>{this.state.workorder_title}</div>
            <div className='gal-workorder-card-id'>{this.props.issueId}</div> 
          </div>
      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {OnWorkorderSelection})(Gall_Workorder_comp);





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