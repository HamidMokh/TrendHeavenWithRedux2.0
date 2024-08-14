// 1. export and determine initial state
// 2. export and determine categoriesReducer


export const CATEGORIES_INITIAL_STATE = {
    categoriesMap: {},
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) =>{
    const {type, payload} = action

    switch(type){
        case 'SET_CATEGORIES_MAP':
            return {...state, categories: payload};
        default: 
            return state;
    }
    
}

//> next import this to the root reducer