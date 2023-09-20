const initialState = {
    profile: null,
    profiles: null,
    loading: true,
    error: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    const { type, payload } = action;
    
    switch(type){
        case 'GET_PROFILE':
        case 'UPDATE_PROFILE':
        case 'SAVE_CONTACT':
        case 'TRANSFER_COIN':
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case 'GET_PROFILES':
        case 'FIND_PROFILE':
            return {
                ...state,
                profiles: payload,
                loading: false
            };
        case 'PROFILE_ERROR':
            return {
                ...state,
                error: payload,
                loading: false
            };
        case 'CLEAR_PROFILE':
            return {
                ...state,
                profile: null,
                loading: false
            };
        default:
            return state;
    }
}