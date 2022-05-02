import React from 'react'
import Header from "../src/Components/Header"
import Info from "../src/Components/Info"
import {makeStyles} from "@material-ui/core"
import char from "../src/Assets/char.png"
import DepositWithdraw from './Components/DepositWithdraw'

function App() {

  const useStyles = makeStyles((theme)=> ({
    padding: {
      paddingBottom: 0,
    },
    container:{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing(5),
      paddingBottom: 150,

    },
    image:{
      width:"100px"
    }
  }))

  const classes = useStyles()

  return (
    <div className="container" style ={{height: "100vh"}}>
      <Header/>
        <div className={classes.container}>
          <img className={classes.image} src={char}/>
          <h2 className={classes.padding} >Charon Finance</h2>
          <img className={classes.image} src={char}/>
        </div>
          
      <Info/>
      <DepositWithdraw/>
      
    </div>
  );
}

export default App;
