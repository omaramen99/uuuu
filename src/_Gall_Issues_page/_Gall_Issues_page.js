
//------------------------------------
//-------------------------------------------------
import './_Gall_Issues_page.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import {OnRevitElementSelected, OnCreateWorkorder,OnViewerLoad,setHistoryObj,setMatchObj,OnIssueViewInViewer } from '../store/actions';
//var json2xls = require('json2xls');
import xlsx from "json-as-xlsx"

//import createUnityInstance from '../UnityBuild/Build/23.loader'

 class _Gall_Issues_page extends React.Component {
  state = {
    workorders:"",

    workorderTitle:"",
    workorderDesc:"",
    workorderID:"",
    workorderEID:"",
    workorderEmail:"",
    workorderType:"",
    workorderNotes:"",

    messagesPanelOpened : false,
  };
    
  componentDidMount()
  {

    this.AddInitialIssues()
    this.RecordHistory()

    var xx = []
    setTimeout(() => {
      for (let i = this.props.state.workorders.length-1; i >= 0; i--) {
        xx = [...xx,
          <div class="row gal-issues-page-tableRow" onClick={(e)=>{this.OpenIssueModal(this.props.state.workorders[i])}} >
          <div class="col-6 gal-issues-page-issueTitle-cell">{this.props.state.workorders[i].title}</div>
          <div class="col-3 gal-issues-page-issueType-cell"><div class={`gal-issues-page-issueType-cell-capsule gal-issues-page-issueType-cell-capsule-${this.props.state.workorders[i].typeC}`}></div></div>
          <div class="col-3 gal-issues-page-assignTo-cell">{this.props.state.workorders[i].email}</div>
        </div>
        ]
      }
      this.setState({
        workorders:xx
      })
      
    }, 100);
  }

  RecordHistory()
  {
    if (!this.props.state.history) {
      this.props.setHistoryObj(this.props.history)
    }
      this.props.setMatchObj(this.props.match)
  }

  OpenIssueModal(workorder)
  {
var notesElements = []
    for (let i = 0; i < workorder.notes.length; i++) {
      notesElements = [...notesElements,
        <div className='messageElementContainer'>
        <div className='messageElement'>
            <div className='messageSenderName'>{workorder.notes[i].sender}</div>
            <div className='messageDate'>{workorder.notes[i].date}</div>
            <div className='messageContent'>{workorder.notes[i].msg}</div>
        </div>
      </div>
      ]
      
    }

    this.setState({    
    workorderTitle:workorder.title,
    workorderDesc:workorder.desc,
    workorderID:workorder.id,
    workorderEID:workorder.eid,
    workorderEmail:workorder.email,
    workorderType:workorder.type,
    workorderInitiation:workorder.initDate,
    workorderClosure:workorder.closeDate||false,
    workorderNotes: notesElements
  })

    new window.bootstrap.Modal(document.getElementById('myWorkorderModal'), {}).show() 
    var elem = document.getElementById('oldMessagesContainer');
    setTimeout(() => {
      //console.log(elem.scrollHeight);
      elem.scrollTop = elem.scrollHeight;
      
    }, 10);
    this.CloseMessagesPanel()
  }

  ViewIssueInViewer()
  {
    //SAVE_ISSUE_DATA
    this.props.OnIssueViewInViewer({

      workorderTitle:this.state.workorderTitle,
      workorderDesc:this.state.workorderDesc,
      workorderID:this.state.workorderID,
      workorderEID:this.state.workorderEID,
      workorderEmail:this.state.workorderEmail,
      workorderType:this.state.workorderType,

    })

    //CLOSE_THE_MODAL
    document.getElementById('IssueModalCloseButton').click();

    //NAVIGATE_TO_PROJECT_PAGE
    this.props.state.history.push('/project')

  }
  MarkAsCompleted()
  {
    var id = this.state.workorderID;
    var wkds = [...this.props.state.workorders]
    
    for (let i = 0; i < wkds.length; i++) {
      if (wkds[i].id == id) {
        wkds[i].type = "🟢 Completed"
        wkds[i].typeC = "g"
        wkds[i].effect = "n"
        let currentDate = new Date();
        wkds[i].closeDate = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString([], {hour: '2-digit',minute: '2-digit',hour12: true})}`
        this.props.OnCreateWorkorder(wkds)
        break;
      }
      
    } 


    //CLOSE_THE_MODAL
    document.getElementById('IssueModalCloseButton').click();
    this.props.state.history.push('/404')
    setTimeout(() => {
      
      this.props.state.history.push('/issues')
    }, 1);
  }

  AddInitialIssues()
  {
    var workorders = this.props.state.workorders;
    if (workorders.length == 0) {
 
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
        this.props.OnCreateWorkorder([...this.props.state.workorders, ...workorders])
      
    }
  }

   ExportAndDownloadWorkordersReport  ()  {

    let DATA = 
    [
      {
        sheet: "Workorders",
        columns: [
          { label: "Initiation date", value: (row) => (row.initDate) },
          { label: "Closed date", value: (row) => (row.closeDate || "notClosed") },
          { label: "Title", value: (row) => (row.title) },
          { label: "Workorder ID", value: (row) => (row.id) },
          { label: "Element ID", value: (row) => (row.eid) },
          { label: "Type", value: (row) => (row.type.substring(3)) },
          { label: "Assigned to", value: (row) => (row.email) },
          { label: "Description", value: (row) => (row.desc) },
        ],
        content: [...this.props.state.workorders].reverse(),
      }
    ]
    let currentDate = new Date();
    let settings = {
      fileName: `GalliumFM_Workorders_Report (${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString([], {hour: '2-digit',minute: '2-digit',hour12: true})})`,
    }

    xlsx(DATA, settings)

  }

  SendMessage()
  {
    var msgInputEle = document.getElementById('messageInput');
    if (msgInputEle.value != "") {
      let currentDate = new Date();
      var msg = `${msgInputEle.value}`;
      msgInputEle.value = "";
      //addToGlobalWorkorderMsgs
      var oldWorkorders = this.props.state.workorders;
      for (let i = 0; i < oldWorkorders.length; i++) {
        if(oldWorkorders[i].id == this.state.workorderID)
        {
          oldWorkorders[i].notes.push({
            sender:'Project Admin',
            date:`${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString([], {hour: '2-digit',minute: '2-digit',hour12: true})}`,
            msg
          })
          this.props.OnCreateWorkorder(oldWorkorders)
          break;
        }
      }
      


      //addToStateWorkorderMsgs
      this.setState({
        workorderNotes:[...this.state.workorderNotes, 
          <div className='messageElementContainer'>
          <div className='messageElement'>
              <div className='messageSenderName'>{"Project Admin"}</div>
              <div className='messageDate'>{`${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString([], {hour: '2-digit',minute: '2-digit',hour12: true})}`}</div>
              <div className='messageContent'>{msg}</div>
          </div>
        </div>
        ]
      })

      //ScrollDown

      var elem = document.getElementById('oldMessagesContainer');
      setTimeout(() => {
        
        elem.scrollTop = elem.scrollHeight;
      }, 10);


    }
  }
  OpenMessagesPanel()
  {
      this.setState({
        messagesPanelOpened:true
      })
      document.getElementById("NotesContainer").style.height = "275px"  
  }
  CloseMessagesPanel()
  {
    this.setState({
      messagesPanelOpened:false
    })
    document.getElementById("NotesContainer").style.height = "0px"
  }
  ToggleMessagesPanel()
  {
    if (this.state.messagesPanelOpened) {
      this.CloseMessagesPanel()
    }else
    {
        this.OpenMessagesPanel();
    }
  }

  render() {


    return (
      <>
      <div class=" gal-issues-page-container">
      <button type="button" class="btn btn-outline-success" onClick={()=>{this.ExportAndDownloadWorkordersReport()}}>Export workorders report <i class="fa-solid fa-file-excel"></i></button>


        <div class="row gal-issues-page-tableHeader">
          <div class="col-6 gal-issues-page-issueTitle">Issue Title</div>
          <div class="col-3 gal-issues-page-issueType">Issue Type</div>
          <div class="col-3 gal-issues-page-assignTo">Assigned To</div>
        </div>
        <div class="issues-Container">
          {this.state.workorders}
        </div>

        </div>

        <div class="modal fade" id="myWorkorderModal">
        <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">


        {/* <!-- <div class="modal-header">
        <h4 class="modal-title">Modal Heading</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div> --> */}


        <div class="modal-body">
        <div class="container gal-issue-detail-modal-container">
        <div class="row">
          <div class="col-4 gal-issue-field-title">Workorder ID</div>
          <div class="col-8 gal-issue-field-value">{this.state.workorderID}</div>
        </div>
        <div class="row"><div class="col-12 gal-issue-detail-modal-sep"></div></div>
        <div class="row">
          <div class="col-4 gal-issue-field-title">Element ID</div>
          <div class="col-8 gal-issue-field-value">{this.state.workorderEID}</div>
        </div>
        <div class="row"><div class="col-12 gal-issue-detail-modal-sep"></div></div>
        <div class="row">
          <div class="col-4 gal-issue-field-title">Title</div>
          <div class="col-8 gal-issue-field-value">{this.state.workorderTitle}</div>
        </div>
        <div class="row"><div class="col-12 gal-issue-detail-modal-sep"></div></div>
        <div class="row">
          <div class="col-4 gal-issue-field-title">Description</div>
          <div class="col-8 gal-issue-field-value">{this.state.workorderDesc}</div>
        </div>
        <div class="row"><div class="col-12 gal-issue-detail-modal-sep"></div></div>

        <div class="row">
          <div class="col-4 gal-issue-field-title">Type</div>
          <div class="col-8 gal-issue-field-value">{this.state.workorderType}</div>
        </div>
        <div class="row"><div class="col-12 gal-issue-detail-modal-sep"></div></div>
        <div class="row">
          <div class="col-4 gal-issue-field-title">E-mail</div>
          <div class="col-8 gal-issue-field-value">{this.state.workorderEmail}</div>
        </div>
        <div class="row"><div class="col-12 gal-issue-detail-modal-sep"></div></div>
        <div class="row">
          <div class="col-4 gal-issue-field-title">Initiated at</div>
          <div class="col-8 gal-issue-field-value">{this.state.workorderInitiation}</div>
        </div>
        <div class="row"><div class="col-12 gal-issue-detail-modal-sep"></div></div>
        {this.state.workorderClosure?
      (
      <>
        <div class="row">
        <div class="col-4 gal-issue-field-title">Closed at</div>
        <div class="col-8 gal-issue-field-value">{this.state.workorderClosure}</div>
        </div>
        <div class="row"><div class="col-12 gal-issue-detail-modal-sep"></div></div>
      </>
      )
      
      :("")
      }


        <div id='NotesContainer' className={`NotesContainer`}>

            <div class="row">
            <div class="col-4 gal-issue-field-title">Notes:</div>
            </div>
            <div id='oldMessagesContainer' class="row oldMessagesContainer">

          {this.state.workorderNotes}




            </div>
            <div class="row sendMessageContainer">
            <input type="text" id='messageInput' class="form-control messageInput" placeholder="Enter new workorder note"/>
            <div className='sendMessageBtn' onClick={()=>{this.SendMessage()}}><i class="fa-solid fa-comment"></i></div>
            </div>
            <div class="row"><div class="col-12 gal-issue-detail-modal-sep"></div></div>
        </div>

        <div class="row">
          <div class="gal-issue-detail-modal-buttons-container">
            <div className='OpenMessagesBtn' onClick={()=>{this.ToggleMessagesPanel()}}><i class="fa-solid fa-message"></i></div>
            <button type="button" class="btn btn-primary" onClick={()=>{this.ViewIssueInViewer()}}>Show in viewer</button>
            <button type="button" class="btn btn-success" onClick={()=>{this.MarkAsCompleted()}}>Mark as completed</button>
          </div>
        </div>
        </div>


        </div>


        <button id='IssueModalCloseButton' type="button" class="btn btn-danger hiddenButton" data-bs-dismiss="modal"></button>
        {/* <div class="modal-footer">
        </div> */}

        </div>
        </div>
        </div>


      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {OnRevitElementSelected,OnCreateWorkorder,OnViewerLoad,setHistoryObj,setMatchObj,OnIssueViewInViewer})(_Gall_Issues_page);