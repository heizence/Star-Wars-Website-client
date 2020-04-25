import { 
    requestData, requestSearch, requestSignin, requestSignout, requestPageMove 
} from '../reduxFiles/actionCreators'

export const mapStateToProps = (state) => {
    return {
        isPending: state.fetchData.isPending,   // is pending 
        error: state.fetchData.error,   // has error

        // All data categories
        Character: state.fetchData.Character,
        Film: state.fetchData.Film,
        Planet: state.fetchData.Planet,
        Specie: state.fetchData.Specie,
        Starship: state.fetchData.Starship,
        Vehicle: state.fetchData.Vehicle,

        text: state.searchData.text,    // search text
        isLoggedIn: state.handleUser.isLoggedIn, // is logged in
    }
}
  
export const mapDispatchToProps = (dispatch) => {
    return {
        onRequestData: (category) => dispatch(requestData(category)),
        onSearchData: (text) => requestSearch(dispatch, text),
        onRequestSignin: (username) => requestSignin(username, dispatch),    
        onRequestSignout: () => requestSignout(dispatch),
        onRequestPageMove: (address) => requestPageMove(dispatch, address)
    }
}
