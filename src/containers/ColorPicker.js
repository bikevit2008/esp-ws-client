import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ColorPicker from '../components/ColorPicker'

import {wsSend}  from '../actions/webSocket'
import { setColor }  from '../actions/colorPicker'


function mapStateToProps(state) {
    return {
        color: state.colorPicker.color
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ wsSend, setColor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)