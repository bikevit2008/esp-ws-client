import { SET_COLOR } from '../constants/ColorPicker'

export function setColor(color) {
  return {
    type: SET_COLOR,
    payload: color
  }

}
