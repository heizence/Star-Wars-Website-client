import { REQUEST_PEOPLE_PENDING, REQUEST_PEOPLE_SUCCESS, REQUEST_PEOPLE_FAILED } from './actions'
// import { combineRecucers } from 'redux'

const peopleInitialState = {
    isPending: false,
    people: [],
    error: ''
}

export const getPeople = (state=peopleInitialState, action={}) => {
    switch(action.type) {
        case REQUEST_PEOPLE_PENDING:
            return {
                ...state,
                isPending: true
            }
        case REQUEST_PEOPLE_SUCCESS:
            return {
                ...state,
                people: action.payload
            }
        case REQUEST_PEOPLE_FAILED:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
