import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, SEARCH
} from './actions'

const dataInitialState = {
    isPending: false,
    data: [],
    error: ''
}

const searchInitialState = {
    text: ''
}

export const fetchData = (state=dataInitialState, action={}) => {
    switch(action.type) {
        case REQUEST_PENDING:
            return {
                ...state,
                isPending: true
            }
        case REQUEST_SUCCESS:            
            return {
                ...state,
                isPending: false,
                data: action.payload
            }
        case REQUEST_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export const searchData = (state=searchInitialState, action={}) => {
    switch(action.type) {
        case SEARCH:
            return {
                text: action.payload
            }
        default:
            return state
    }
} 
