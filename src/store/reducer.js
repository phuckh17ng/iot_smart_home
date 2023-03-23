import { SET_TODO_INPUT } from "./constants"

const initState = {
    todoInput: '',
    todoList: []
}

function reducer(state, action) {
    switch(action.type) {
        case SET_TODO_INPUT:
            return {
                ...state,
                todoInput: action.payload
            }
        //other cases for other actions
        default:
            throw new Error()
    }
}

export { initState }
export default reducer
