import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#546e7a',
      light: '#819ca9',
      dark: '#29434e'
    },
    secondary: {
      main: '#616161',
      light: '#8e8e8e',
      dark: '#373737'
    }
  }
})

export default theme