import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, SEARCH, 
    LOGGING_IN, LOGGING_OUT, PAGE_MOVE
} from './actions'

const dataInitialState = {
    isPending: false,
    data: [],
    error: ''
}

const searchInitialState = {
    text: ''
}

const userInitialState = {
    isLoggedIn: false,
    username: '',
    pageBeforeLogIn: ''
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

export const handleUser = (state=userInitialState, action={}) => {
    switch(action.type) {
        case LOGGING_IN:
            return {
                isLoggedIn: true,
                username: action.payload
            }
        case LOGGING_OUT:
            return {
                isLoggedIn: false
            }
        case PAGE_MOVE:
            return {
                pageBeforeLogIn: action.payload
            }
        default:
            return state
    }
}
