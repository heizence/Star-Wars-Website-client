import { 
    requestNames, requestSpecificData, resetData, requestSearch, requestSignin, requestSignout 
} from '../reduxFiles/actionCreators'


export const mapStateToProps = (state) => {
    return {
        // names 
        names_data: state.fetchNames.data, // data
        names_isPending: state.fetchNames.isPending,   // is pending 
        names_error: state.fetchNames.error,   // has error

        // specific data
        specific_data: state.fetchSpecificData.data, // data
        specific_isPending: state.fetchSpecificData.isPending,   // is pending 
        specific_error: state.fetchSpecificData.error,   // has error

        text: state.searchData.text,    // search text
        isLoggedIn: state.handleUser.isLoggedIn, // is logged in
        user: state.handleUser.user,    // user information
    }
}
  
export const mapDispatchToProps = (dispatch) => {
    return {
        onRequestNames: (category) => dispatch(requestNames(category)),
        onRequestSpecificData: (category, name) => dispatch(requestSpecificData(category, name)),
        onSearchData: (text) => requestSearch(dispatch, text),
        onResetData: () => resetData(dispatch),
        onRequestSignin: (username) => requestSignin(username, dispatch),    
        onRequestSignout: () => requestSignout(dispatch) 
    }
}
