import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED, 
    REQUEST_URL_PENDING, REQUEST_URL_SUCCESS, REQUEST_URL_FAILED, SEARCH } from './actions'

const dataInitialState = {
    isPending: false,
    data: [],
    error: '',
    temp: []
}

const searchInitialState = {
    text: ''
}

const allUrlInitialState = {
    isPending: false,
    url: {
        people: [],
        vehicles: [],
        planets: [],
        starships: [],
        species: [],
        films: []
    },
    error: ''
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

export const fetchAllURL = (state=allUrlInitialState, action={}) => {
    switch(action.type) {
        case REQUEST_URL_PENDING:
            return {
                ...state,
                isPending: true
            }
        case REQUEST_URL_SUCCESS:       
            //console.log('reducer에서 확인 : ', action.category, action.payload)  
            
            let nameAndUrl = {}
            for (let i=0; i<action.payload.length; i++) {
                nameAndUrl[action.payload[i].url] = action.payload[i].name || action.payload[i].title
            }   
            
            return {
                ...state,
                isPending: false,
                url: {
                    ...state.url,
                    [action.category] : nameAndUrl
                }
            }
        case REQUEST_URL_FAILED:
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
