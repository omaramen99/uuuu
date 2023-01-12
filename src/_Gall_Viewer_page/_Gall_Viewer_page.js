
//------------------------------------
//-------------------------------------------------
import './_Gall_Viewer_page.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import {OnRevitElementSelected, OnCreateWorkorder,OnViewerLoad,setHistoryObj,setMatchObj,OnToggleBrowserVisability,OnToggleWorkordersVisability,OnIssueViewInViewer } from '../store/actions';
import Gall_Left_Side_Menu_comp from '../Gall_Left_Side_Menu_comp/Gall_Left_Side_Menu_comp'
import Gall_Viewer_Tool_bar_comp from '../Gall_Viewer_Tool_bar_comp/Gall_Viewer_Tool_bar_comp'
import Gall_Issues_Menu_comp from '../Gall_Issues_Menu_comp/Gall_Issues_Menu_comp'
// import {nodemailer} from 'nodemailer'
import {Helmet} from "react-helmet";

import loadingGif from '../media/ss.gif';
//import createUnityInstance from '../UnityBuild/Build/23.loader'

 class _Gall_Viewer_page extends React.Component {
  state = {
  };
    
  componentWillUnmount()
  {
    window._unityInstance.Quit();
    this.props.OnToggleBrowserVisability(false)
    this.props.OnToggleWorkordersVisability(false)
    this.props.OnViewerLoad(false);
  }
  componentDidMount()
  {

    this.RecordHistory();
    // var test = document.getElementById("mydivvv")
    // test.addEventListener("mouseleave", function (event) {
    //   console.log("out")
    // }, false);
    // test.addEventListener("mouseover", function (event) {
    //   console.log("in")
    // }, false);
    
    // window.$(document).mousemove(function(){
    //   if(window.$("#mydivvv").length != 0){
    //     console.log("in")
    //  } else{
    //   console.log("out")
    //  }})

     document.getElementById("gall-tools-bar-container").onmouseenter = function() {
     try {
      window._unityInstance.SendMessage('GameManager', 'JS_SetAppDefaultFPS', '');
    } catch (error) {}
    }
    document.getElementById("unity-canvas").onmouseenter = function() {
      document.getElementById("unity-canvas").focus()
      try {
       window._unityInstance.SendMessage('GameManager', 'JS_SetAppDefaultFPS', '');
     } catch (error) {}
     }
     document.getElementById("unity-canvas").onmouseout  = function() {
      document.getElementById("mydivvvv").focus()
          try {
            window._unityInstance.SendMessage('GameManager', 'JS_SetAppFPS', 2);
          } catch (error) {}
    }
















    // setInterval(() => {
    //   if (document.activeElement === document.getElementById('unity-canvas')) {
    //     if (window.s == 0) {
    //       //alert("aa")
    //       window.s = 1;
    //       try {
            
    //         ////window._unityInstance.SendMessage('GameManager', 'unFreezeApp3', '');
    //         window._unityInstance.SendMessage('GameManager', 'JS_SetAppDefaultFPS', '');
    //       } catch (error) {}
    //     }
    //   }else
    //   {
    //     window.s = 0;
    //     try {          
    //       window._unityInstance.SendMessage('GameManager', 'JS_SetAppFPS', 1);
    //     } catch (error) {}
        
    //   }

    // }, 10);


    window.OnElementSelection = (ElementId) =>
    {
       //alert(ElementId);
       this.props.OnRevitElementSelected(ElementId)
    }
    window.OnAppLoad = (data) =>
    {
       //alert("Loaded");

       document.getElementById("ViewerLoadingContainer-backID").style.display = "none"
       document.getElementById("ViewerLoadingContainer-frontID").style.display = "none"
       this.AddInitialIssues();
       this.props.OnViewerLoad(true);
       window._unityInstance.SendMessage('GameManager', 'JS_HideIssues', '');
       if (this.props.state.IssueToView.workorderEID) {
        //alert("ON")
        this.props.OnToggleWorkordersVisability(true)
        //window._unityInstance.SendMessage('GameManager', 'JS_ShowIssues', '');
        //selectAndFocus
        window._unityInstance.SendMessage('GameManager', 'JS_SelectAndFocusElement', this.props.state.IssueToView.workorderEID);
        this.props.OnIssueViewInViewer({})
       }
      //EditViewer Resulotion   //affects the elements selection!
      //// var viewerCanvas = document.getElementById('unity-canvas')
      //// viewerCanvas.attributes['height'].value = window.innerHeight * 0.9
      //// viewerCanvas.attributes['width'].value = window.innerWidth * 0.9
    }

  }
  
  RecordHistory()
  {
    if (!this.props.state.history) {
     // alert('hi')
      
      this.props.setHistoryObj(this.props.history)
    }
    else{
     // alert('bye')
     // console.log(this.props);
    }
      this.props.setMatchObj(this.props.match)
  }
  AddInitialIssues()
  {
    var workorders = this.props.state.workorders;
    var isFirstRun = false
    if (workorders.length == 0) {
      isFirstRun = true
       workorders = [
        {
          id:'22d27baa-7ed9-46fd-a63a-a30b8d2d02d3',
          eid:'865793',
          type: '🔵 Normal',
          typeC: 'b',
          effect:'n',
          title:'Chiller working sound',
         desc:'noticed that the chillers fans makes high sound while rotating, need to be cleaned I think!',
         email:'omar.amen@thegallium.com',
         initDate:'11-5-2022 3:53 PM',
         notes:
         [
          {sender:"Project Admin",date:"11-9-2022 4:00 PM",msg:"there is something stuck in the cooling fan"},
          {sender:"Project Admin",date:"11-13-2022 1:16 PM",msg:"Need to call the vendor for some information!"},
         ]
        },
        {
          id:'445d2998-caf8-4c50-b426-c73603563bac',
          eid:'856140',
          type: '🔴 Danger',
          typeC: 'r',
          effect:'n',
          title:'Water Leakage',
         desc:'there is a water leakage comes out of the pipe, need an urgent action!',
         email:'mohamed.fawzy@thegallium.com',
         initDate:'12-25-2022 11:01 AM',
         notes:
         [
          {sender:"Project Admin",date:"12-25-2022 11:30 AM",msg:"the leackage affected the electrical connections!"},
         ]
        },
        {
          id:'bd057825-2fa3-48b7-bf9b-0e3cb7fa9642',
          eid:'852995',
          type: '🟡 Warning',
          typeC: 'y',
          effect:'n',
          title:'VAV unstable flow',
         desc:'this VAV needs maintenance to justify the output flow rate.',
         email:'mohamed.fawzy@thegallium.com',
         initDate:'1-2-2023 5:16 PM',
         notes:
         [
          
         ]
        },
      ]
    }
      for (let i = 0; i < workorders.length; i++) {
        //select
        window._unityInstance.SendMessage('GameManager', 'JS_SelectElement', workorders[i].eid);
        //assign
        window._unityInstance.SendMessage('GameManager', 'JS_CreateIssueOnElement', `${workorders[i].id},${workorders[i].typeC},${workorders[i].effect}`);
      }
      if (isFirstRun) {
        this.props.OnCreateWorkorder([...this.props.state.workorders, ...workorders])
      }
      //unselectall
      window._unityInstance.SendMessage('GameManager', 'JS_UnselectAllElements', '');
  }

  AddIssue()
  {
    if (this.props.state.SelectedRevitElementId != "-1") {
      var form = document.getElementById("gall-workorder-creation-form");
      if(form.checkValidity() === true)
      {
        let currentDate = new Date();
        var workorder = 
        {
          id:this.props.state.workorderID,
          eid:this.props.state.SelectedRevitElementId,
          type: document.getElementById('gall-workorder-creation-type').value,
          effect:document.getElementById('gall-workorder-creation-effect').value,
          title:document.getElementById('gall-workorder-creation-title').value,
         desc:document.getElementById('gall-workorder-creation-desc').value,
         email:document.getElementById('gall-workorder-creation-email').value,
         initDate:`${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString([], {hour: '2-digit',minute: '2-digit',hour12: true})}`,
         notes: [],
        }
        var x = "g"
        if (workorder.type == "🔴 Danger") {
          x = "r"
        }else if (workorder.type == "🟡 Warning") {
          x = "y"
        }else if (workorder.type == "🔵 Normal") {
          x = "b"
        }

        var e = "n"
        if (workorder.effect == "💦 Water") {
          e = "w"
        }else if (workorder.effect == "🔥 Fire") {
          e = "f"
        }else if (workorder.effect == "🌫️ Smoke") {
          e = "s"
        }else if (workorder.effect == "⚡ Electricity") {
          e = "e"
        }
        workorder.typeC = x
        workorder.effect = e
        //create viewer issue
        window._unityInstance.SendMessage('GameManager', 'JS_CreateIssueOnElement', `${workorder.id},${x},${e}`);


        //reset input
        document.getElementById('gall-workorder-creation-type').value = "🔴 Danger"
        document.getElementById('gall-workorder-creation-effect').value = "🚫 Default"
        document.getElementById('gall-workorder-creation-title').value = ""
        document.getElementById('gall-workorder-creation-desc').value = ""
        document.getElementById('gall-workorder-creation-email').value = ""
        
   
        //close modal
        document.getElementById('ssddaa').click();


        //sendMail
        /////////////////
        var msg = `<div style='box-sizing:border-box;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:130%;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important'><table style='background-color:#f9f9f9;border-collapse:collapse;border-spacing:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:130%;margin:0;padding:0;text-align:left;vertical-align:top;width:100%'bgcolor='#f9f9f9'><tr align='left'style='padding:0;text-align:left;vertical-align:top'><td align='center'style='border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:130%;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'valign='top'><center style='min-width:580px;width:100%'><table style='background-color:#fff;border-collapse:collapse;border-spacing:0;border-radius:5px;margin:50px;padding:0;text-align:inherit;vertical-align:top;width:580px;border:1px solid #000'align='center'bgcolor='#ffffff'><tr align='left'style='padding:0;text-align:left;vertical-align:top'><td align='left'style='border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:130%;margin:0;padding:35px 40px 30px;text-align:left;vertical-align:top;word-wrap:break-word'valign='top'><div><a href='#'style='color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:130%;margin:0;padding:0;text-align:left;text-decoration:none'target='_blank'><img data-bit='iit'src='https://images.squarespace-cdn.com/content/v1/632347690b03536cc07b8bba/efa1a4de-d70f-4eda-86bd-e0b998b712c3/Gallium+Presentation-01.png?format=1500w'style='border:none;clear:both;display:block;max-width:100%;outline:0;text-decoration:none;width:auto'width='600'></a></div><p align='center'style='color:#666;font-family:Helvetica,Arial,sans-serif;font-size:30px;font-weight:400;line-height:130%;margin:0 0 40px;padding:0;text-align:center'>Admin Has Assigned Work Order<p align='left'style='color:#666;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;line-height:130%;margin:0 0 10px;padding:0;text-align:left'>${workorder.title}<p align='left'style='color:#666;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;line-height:130%;margin:0 0 30px;padding:0;text-align:left'>${workorder.desc}<p align='left'style='color:#666;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;line-height:130%;margin:0 0 10px;padding:0;text-align:left'>${workorder.type}<div><table style='border-collapse:collapse;border-spacing:0;margin:0 auto 16px;padding:0;text-align:center!important;vertical-align:top;width:auto'align='center'><tr align='left'style='padding:0;text-align:left;vertical-align:top'><td align='left'style='border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:130%;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'valign='top'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top'><tr align='left'style='padding:0;text-align:left;vertical-align:top'><td align='left'style='background-color:transparent;border:1px none rgba(0,0,0,.2);border-collapse:collapse!important;border-radius:3px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:100%;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'valign='top'bgcolor='transparent'><a href='${window.origin}/issues'style='background-color:#5b50d6;border:2px solid #5b50d6;border-radius:3px;color:#fff;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;line-height:130%;margin:0 0 8px;padding:12px 35px;text-align:left;text-decoration:none'target='_blank'>Navigate to workorder</a></table></table></div></table></center></table></div>`
        var data = JSON.stringify({
          "to": workorder.email,
          "subject": `${"Gallium FM workorder"}`,
          "html": msg
        });
        var config = {
          method: 'post',
          url: 'https://be-gall-1-9-2023.onrender.com/api/sendmailto',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

        //store in store
        /////////////////
        this.props.OnCreateWorkorder([...this.props.state.workorders, workorder])
      }else
      {
        form.classList.add('was-validated');
      }
      
    }
  }



  render() {


    return (
      <>
      <div className='aaasssddd'>
        <Gall_Issues_Menu_comp/>
        <Gall_Left_Side_Menu_comp/>
        <Gall_Viewer_Tool_bar_comp/>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Open modal</button>
      </div>

{/* <!-- The Modal --> */}
<div class="modal modal-fade" id="myModal">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content gall-workorder-creation-modal-content">

      {/* <!-- Modal Header --> */}
      {/* <div class="modal-header">
        <h4 class="modal-title">Modal Heading</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div> */}

      {/* <!-- Modal body --> */}
      <div class="modal-body gall-workorder-creation-modal-body">
        
        <div className='gall-workorder-creation-title'>Create Work Order</div>
        <div className='gall-workorder-creation-cell-A'>Work order ID: <span className='gall-workorder-creation-orderid'>{this.props.state.workorderID}</span></div>
        <div className='gall-workorder-creation-cell-B'>element ID: <span className='gall-workorder-creation-element'>{this.props.state.SelectedRevitElementId}</span></div>
        <div className='gall-workorder-creation-cell-A'>
          <div className='row'>
          <div className='col-6'>
            Type: 
            <div>
              <select id='gall-workorder-creation-type' class="form-select">
                <option>🔴 Danger</option>
                <option>🟡 Warning</option>
                <option>🔵 Normal</option>
              </select>
            </div>
          </div>
          <div className='col-6'>
            Effect: 
            <div>
              <select id='gall-workorder-creation-effect' class="form-select">
                <option>🚫 Default</option>
                <option>💦 Water</option>
                <option>🔥 Fire</option>
                <option>🌫️ Smoke</option>
                <option>⚡ Electricity</option>
                
              </select>
            </div>
          </div>
          </div>
        </div>

        <form action="" id='gall-workorder-creation-form' class="needs-validation" novalidate>
          <div className='gall-workorder-creation-cell-B'>Title: <div><input id='gall-workorder-creation-title' type="text" class="form-control" placeholder="Normal input" required/></div></div>
          <div className='gall-workorder-creation-cell-A'>Discription: <div><textarea id='gall-workorder-creation-desc' class="form-control" rows="5"  name="text" required></textarea></div></div>
          <div className='gall-workorder-creation-cell-B'>Assigned To: <div><input id='gall-workorder-creation-email' type="email" class="form-control"  placeholder="Enter email" name="email" required/></div></div>
          <div className='gall-workorder-creation-cell-A'><div className='gall-workorder-creation-cell-submit-button-container'><button type="button" class="btn btn-light" onClick={() => {this.AddIssue()}}>Create Work Order</button></div></div>
        </form>


      </div>
      <button type="button" id='ssddaa' class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      {/* <!-- Modal footer --> */}
      {/* <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div> */}

    </div>
  </div>
</div>






        <div className='ViewerContainer'>
            <div id="unity-container" class="unity-desktop">
              <canvas tabindex="1" id="unity-canvas" width="640" height="480"></canvas>
            </div>
        </div>
        <div className={`ViewerLoadingContainer-back `} id="ViewerLoadingContainer-backID"></div>
        <div className={`ViewerLoadingContainer-front `} id="ViewerLoadingContainer-frontID">
          {/* <img src="https://media.giphy.com/media/FmcNeI0PnsAKs/giphy.gif"></img> */}

          <img  src={loadingGif}></img>

          
        </div>
        


        <Helmet>
          <script>{`

          
            var _unityInstance = ""; 
            var canvas = document.querySelector("#unity-canvas");
            var buildUrl = "Build";
            var config = {
              dataUrl: buildUrl + "/23.data",
              frameworkUrl: buildUrl + "/23.framework.js",
              codeUrl: buildUrl + "/23.wasm",
              streamingAssetsUrl: "StreamingAssets",
              companyName: "DefaultCompany",
              productName: "FM-BIM-Viewer",
              productVersion: "0.1",
            };
  
              createUnityInstance(canvas, config, (progress) => {
              }).then((unityInstance) => {
                _unityInstance = unityInstance;
              }).catch((message) => {
                //alert(message);
              });


        `}</script>
        </Helmet>
      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {OnRevitElementSelected,OnCreateWorkorder,OnViewerLoad,setHistoryObj,setMatchObj,OnToggleBrowserVisability,OnToggleWorkordersVisability,OnIssueViewInViewer})(_Gall_Viewer_page);





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