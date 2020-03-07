import axios from 'axios'
import { REQUEST_PEOPLE_PENDING, REQUEST_PEOPLE_SUCCESS, REQUEST_PEOPLE_FAILED } from './actions'

export const requestPeople = (dispatch) => {
    dispatch({ type: REQUEST_PEOPLE_PENDING })
    axios.get('https://swapi.co/api/people/?format=json')
    .then(res => {
        dispatch({ type: REQUEST_PEOPLE_SUCCESS , payload: res.data.results })
    })
    .catch(error => {
        dispatch({ type: REQUEST_PEOPLE_FAILED, payload: error })
    })
}
