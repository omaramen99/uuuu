
export default (state = {


    history:false,
    match:{},
    SelectedRevitElementId:"",
    workorderID:"",
    workorders:[],
    loaded:false,
    selectedWorkorder:{workorder_id:'-1'},
    browserVisability:false,
    workordersVisability:false,
    IssueToView:{}


}, action) => {
    
    switch (action.type) {
      
        case 'SET_HISTORY_OBJ':
            return {
                 ...state,
                 history : action.payload,
            };
        case 'SET_MATCH_OBJ':
          return {
               ...state,
               match : action.payload,
            };
        
          case 'ON_REVIT_ELEMENT_SELECTED':
               return {
                    ...state,
                    SelectedRevitElementId : action.payload,
               }; 
          case 'ON_WORKORDER_CREATION_FORM_OPENED':
               return {
                    ...state,
                    workorderID : action.payload,
               }; 
          case 'ON_CREATING_WORKORDER':
               return {
                    ...state,
                    workorders : action.payload,
               }; 
          case 'ON_VIEWER_LOAD':
               return {
                    ...state,
                    loaded : action.payload,
               };
          case 'ON_WORKORDER_SELECTION':
               return {
                    ...state,
                    selectedWorkorder : action.payload,
               };
          case 'ON_TOGGLE_BROWSER_VISABILITY':
               return {
                    ...state,
                    browserVisability : action.payload,
               };
          case 'ON_TOGGLE_WORKORDERS_VISABILITY':
               return {
                    ...state,
                    workordersVisability : action.payload,
               };
          case 'ON_ISSUE_VIEW_IN_VIEWER':
               return {
                    ...state,
                    IssueToView : action.payload,
               };

               
               

          
        
            

        default:
            return state;
    }


}