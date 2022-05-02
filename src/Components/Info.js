import React from "react"
import {makeStyles} from "@material-ui/core"
import PoolInfo from "../Components/PoolInfo"
import Yield from "../Components/Yield"

const useStyles = makeStyles((theme)=> ({
    padding:{
        padding:15,
    },
    container:{
        display: "flex",
        alignItems: "left",
        justifyContent: "left",
        gap: theme.spacing(10),
    },

}))


const Info = () => {

    const classes = useStyles()

    return(
        <>
            <div className={classes.container}>
                <PoolInfo/>
                <Yield/>
                
            </div>
               
        </>
    )
}

export default Info