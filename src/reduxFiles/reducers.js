import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, SEARCH, 
    LOGGING_IN, LOGGING_OUT, PAGE_MOVE, RESET_DATA
} from './actions'

const dataInitialState = {
    isPending: false,
    data: '',
    error: ''
}

const searchInitialState = {
    text: ''
}

const userInitialState = {
    isLoggedIn: false,
    user: '',
    token: '',
    pageBeforeLogIn: ''
}

export const fetchData = (state=dataInitialState, action={}) => {
    switch(action.type) {
        case REQUEST_PENDING:
            return {
                ...state,
                isPending: true,
                error: ''
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
        case RESET_DATA:
            return {
                ...state,
                data: ''
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
                user: action.payload.user,
                token: action.payload.token
            }
        case LOGGING_OUT:
            return {
                isLoggedIn: false,
                user: '',
                token: ''
            }
        case PAGE_MOVE:
            return {
                pageBeforeLogIn: action.payload
            }
        default:
            return state
    }
}
