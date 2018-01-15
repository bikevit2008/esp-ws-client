import React, { Component } from 'react'
import { HuePicker } from 'react-color'
import {Paper} from 'material-ui'
import {MuiThemeProvider} from 'material-ui/styles'


const style = {
    marginTop: 15,
    padding: 15,
    width: '100%'
};



export default class ColorControl extends Component {

    onColorChanged(e) {
        e = e.rgb
        let color = [e.r, e.g, e.b]
        console.log(color)
        this.props.setColor(e)
        this.sendChangeColor(color)
    }
    sendChangeColor(color){
        let msg = {method: 'changeColorAll', color: color}
        let jsonMsg = JSON.stringify(msg)

        this.props.wsSend(jsonMsg)
    }

    render() {
        const {color} = this.props
        return (
            <MuiThemeProvider>
                <Paper style={style} zDepth={1}>
                    <HuePicker
                        color={color}
                        onChangeComplete={::this.onColorChanged}
                        width='100%'
                    />
                </Paper>
            </MuiThemeProvider>
        )
    }
}


