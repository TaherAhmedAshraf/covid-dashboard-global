import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#4765F0',
    },
    secondary: {
      main: '#19857b',
    },
    warning:{
      main:"#CB7F2C"
    },
    error: {
      main: "#D13552",
    },
    background:{
      default:"#1A2649",
      paper:"#fafafa"
    },
    text:{
      primary:"#fff"
    }
  },
  typography:{
    fontFamily:"Rubik",
  }
});

export default theme;
