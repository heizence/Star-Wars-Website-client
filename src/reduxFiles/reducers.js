import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, 
    SEARCH, LOGGING_IN, LOGGING_OUT, PAGE_MOVE
} from './actions'

const dataInitialState = {
    isPending: true,
    error: '',
    // All category data
    Character: '',
    Film: '',
    Planet: '',
    Specie: '',
    Starship: '',
    Vehicle: '',
}

const searchInitialState = {
    text: ''
}

const loginStatus = {
    isLoggedIn: ''
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
                [action.category]: action.payload
            }
        case REQUEST_FAILED:
            return {
                ...state,
                isPending: false,
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

export const handleUser = (state=loginStatus, action={}) => {
    switch(action.type) {
        case LOGGING_IN:
            // For user authentication
            sessionStorage.setItem('token', action.payload.token)
            sessionStorage.setItem('email', action.payload.user.email)
            sessionStorage.setItem('username', action.payload.user.username)
            
            return {
                isLoggedIn: true
            }

        case LOGGING_OUT:
            sessionStorage.clear()
            return {
                isLoggedIn: false
            }
        case PAGE_MOVE:
            sessionStorage.setItem('currentPage', action.payload)
            return state
            
        default:
            return state
    }
}
