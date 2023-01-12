
//------------------------------------
//-------------------------------------------------
import './Gall_Elements_Tree_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";

import { connect } from 'react-redux';


import Gall_Project_Cell_comp from '../Gall_Project_Cell_comp/Gall_Project_Cell_comp'
//import {bim_tree} from '../BIM_META_DATA'
 class Gall_Elements_Tree_comp extends React.Component {
  state = {

  };

  componentDidMount()
  {


  }


  render() {

  
    return (
      <>
        <table class="table table-dark table-striped">
          <tbody>
            <Gall_Project_Cell_comp/>
          </tbody>
        </table>   
      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {})(Gall_Elements_Tree_comp);





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