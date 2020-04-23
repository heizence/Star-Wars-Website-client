import { NAME_REQUEST_PENDING, NAME_REQUEST_SUCCESS, NAME_REQUEST_FAILED, SEARCH, 
    DATA_REQUEST_PENDING, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILED, 
    LOGGING_IN, LOGGING_OUT, RESET_DATA
} from './actions'

const namesInitialState = {
    isPending: true,
    data: '',
    error: ''
}

const specificDataInitialState = {
    isPending: true,
    data: '',
    error: ''
}

const searchInitialState = {
    text: ''
}

const userInitialState = {
    isLoggedIn: false,
    user: ''
}

export const fetchNames = (state=namesInitialState, action={}) => {
    switch(action.type) {
        case NAME_REQUEST_PENDING:
            return {
                ...state,
                isPending: true,
                error: ''
            }
        case NAME_REQUEST_SUCCESS:            
            return {
                ...state,
                isPending: false,
                data: action.payload
            }
        case NAME_REQUEST_FAILED:
            return {
                ...state,
                isPending: false,
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

export const fetchSpecificData = (state=specificDataInitialState, action={}) => {
    switch(action.type) {
        case DATA_REQUEST_PENDING:
            return {
                ...state,
                isPending: true,
                error: ''
            }
        case DATA_REQUEST_SUCCESS:            
            return {
                ...state,
                isPending: false,
                data: action.payload
            }
        case DATA_REQUEST_FAILED:
            return {
                ...state,
                isPending: false,
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
            sessionStorage.setItem('token', action.payload.token)
            return {
                isLoggedIn: true,
                user: action.payload.user
            }
        case LOGGING_OUT:
            sessionStorage.clear()
            return {
                isLoggedIn: false,
                user: ''
            }
        default:
            return state
    }
}
