
//------------------------------------
//-------------------------------------------------
import './Gall_Project_Cell_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";
import { connect } from 'react-redux';

import Gall_Category_Cell_comp from '../Gall_Category_Cell_comp/Gall_Category_Cell_comp'
import {bim_tree} from '../BIM_META_DATA'

 class Gall_Project_Cell_comp extends React.Component {
  state = {
    expandedFlag : false,
    visable:true,
    visabilityClass:"",
    ElementsCells:[],
    ElementsCellsContainer:[],
    expanded:false,
    arrowStateClass:"right"
  };

  componentDidMount()
  {

    this.ToggleChilds();

  }

  ToggleChilds()
  {
    if(this.state.expanded)
    {
      //shrink
      this.setState({
        expanded:false,
        arrowStateClass:"right"
      })
      this.Shrink();
      
    }else
    {
      //expand
      this.setState({
        expanded:true,
        arrowStateClass:"down"
      })
      this.Expand();
    }
  }
  Expand()
  {

    if (!this.state.expandedFlag) {
      let Cat = bim_tree.c.find(cat => cat.n == this.props.CategoryName)
      //let Fam = Cat.f.find(fam => fam.n == this.props.FamilyName)
      ////let Typ = Fam.t.find(typ => typ.i == this.props.TypeId)
      let Categories = [];
      for (let i = 0; i < bim_tree.c.length; i++) {
        Categories = [...Categories, 
          <Gall_Category_Cell_comp key={i} CategoryName={bim_tree.c[i].n}/>
        ]
      }
      this.setState({
        expandedFlag : true,
        ElementsCellsContainer:Categories,
        ElementsCells:Categories
      })

    }else
    {
      this.setState({
        ElementsCells:this.state.ElementsCellsContainer
      })
    }
  }
  Shrink()
  {
    this.setState({
      ElementsCellsContainer:this.state.ElementsCells,
      ElementsCells:[]
    })
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
      this.HideTypes();
      
    }else
    {
      //show
      this.setState({
        visable:true,
        visabilityClass:""
      })
      this.ShowTypes();
    }
  }

/////////////3D Viewer////////////////////
HideTypes(){}

ShowTypes(){}


/////////////////////////////////////////
  render() {

  
    return (
      <>


        {/* <tr>
          <td onClick={()=>{this.ToggleChilds()}} class="gall-table-cell-cat">
            <i class={`fa-solid fa-caret-${this.state.arrowStateClass} gall-elements-list-dropdown-arrow`}></i><div class="gall-elements-list-cell-text">{this.props.CategoryName}</div><div onClick={(e) => {this.ToggleVisability(e)}} class="gall-elements-list-cell-side-buttons"><i class={`fa-solid fa-eye${this.state.visabilityClass}`}></i></div>
            </td>
        </tr> */}



        <tr>
          <td onClick={()=>{this.ToggleChilds()}} class="gall-table-cell-prj">
            <i class={`fa-solid fa-caret-${this.state.arrowStateClass} gall-elements-list-dropdown-arrow`}></i><div class="gall-elements-list-cell-text">{bim_tree.n + ".rvt"}</div><div onClick={(e) => {this.ToggleVisability(e)}} class="gall-elements-list-cell-side-buttons"><i class={`fa-solid fa-eye${this.state.visabilityClass}`}></i></div>
            </td>
        </tr>



          {this.state.ElementsCells}


      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {})(Gall_Project_Cell_comp);





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