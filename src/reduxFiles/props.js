import { 
    requestData, resetData, requestSearch, requestSignin, requestSignout 
} from '../reduxFiles/actionCreators'


export const mapStateToProps = (state) => {
    return {
        data: state.fetchData.data, // names data or specific data
        isPending: state.fetchData.isPending,   // is pending 
        error: state.fetchData.error,   // has error
        text: state.searchData.text,    // search text
        isLoggedIn: state.handleUser.isLoggedIn, // is logged in
        user: state.handleUser.user,    // user information
    }
}
  
export const mapDispatchToProps = (dispatch) => {
    return {
        onRequestData: (category, method, name) => dispatch(requestData(category, method, name)),
        onSearchData: (text) => requestSearch(dispatch, text),
        onResetData: () => resetData(dispatch),
        onRequestSignin: (username) => requestSignin(username, dispatch),    
        onRequestSignout: () => requestSignout(dispatch) 
    }
}
