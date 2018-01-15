import React, { Component } from 'react'


import Indicator from './Indicator'


import {MuiThemeProvider} from 'material-ui/styles'
import {AppBar} from 'material-ui'
import ColorPicker from '../containers/ColorPicker'


export default class App extends Component {

    render() {
        const titleBar = 'Подсветка'
        return (
        <div>
            <MuiThemeProvider>
                <AppBar showMenuIconButton={false} title={titleBar} iconElementRight={<Indicator/>} iconStyleRight={{margin: 0, padding:23}} />
            </MuiThemeProvider>
            <ColorPicker/>
        </div>
        )
  }
}


