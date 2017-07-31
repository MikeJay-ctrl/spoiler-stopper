import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {lightBlue700, lightBlue300 , teal600, teal300, blueGrey300, cyan300} from 'material-ui/styles/colors';



export default getMuiTheme({
	"palette": {
      "black": "#000",
      "white": "#fff",
      "transparent": "rgba(0, 0, 0, 0)",
      "fullBlack": "rgba(0, 0, 0, 1)",
      "darkBlack": "rgba(0, 0, 0, 0.87)",
      "lightBlack": "rgba(0, 0, 0, 0.54)",
      "minBlack": "rgba(0, 0, 0, 0.26)",
      "faintBlack": "rgba(0, 0, 0, 0.12)",
      "fullWhite": "rgba(255, 255, 255, 1)",
      "darkWhite": "rgba(255, 255, 255, 0.87)",
      "lightWhite": "rgba(255, 255, 255, 0.54)",
      "primary1Color": lightBlue700,
      "primary2Color": lightBlue300,
      "primery3Color": blueGrey300,
 	  "accent1Color": teal600,
      "accent2Color": teal300,
      "accent3Color": cyan300
  },
  "raisedButton": {
      "primaryColor": '#F44336',
      "primaryTextColor": "#FFFFFF",
      "secondaryColor": '#4CAF50',
      "secondaryTextColor": '#FFFFFF'
    }

});

