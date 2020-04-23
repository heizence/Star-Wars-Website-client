// Fetch names request
export const NAME_REQUEST_PENDING = 'NAME_REQUEST_PENDING'
export const NAME_REQUEST_SUCCESS = 'NAME_REQUEST_SUCCESS'
export const NAME_REQUEST_FAILED = 'NAME_REQUEST_FAILED'

// Fetch data request
export const DATA_REQUEST_PENDING = 'DATA_REQUEST_PENDING'
export const DATA_REQUEST_SUCCESS = 'DATA_REQUEST_SUCCESS'
export const DATA_REQUEST_FAILED = 'DATA_REQUEST_FAILED'

/* Reset data when go back to main page 
to prevent previous data from remaining and being rendered when moved to category page. */
export const RESET_DATA = 'RESET_DATA'

// search
export const SEARCH = 'SEARCH'

// user login/logout
export const LOGGING_IN = 'LOGGING_IN'
export const LOGGING_OUT = 'LOGGING_OUT'

/* Save page address that visited just before login 
to move to that page when logged in. */
export const PAGE_MOVE = 'PAGE_MOVE'    
