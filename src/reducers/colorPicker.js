import { SET_COLOR } from '../constants/ColorPicker'

const initialState = {
    color: [0, 0, 0]
}

export default function inputImageState(state = initialState, action) {

    switch (action.type) {
        case SET_COLOR:
            return { ...state, color: action.payload }

        default:
            return state;
    }

}