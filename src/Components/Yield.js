import React from 'react'
import {makeStyles, Box} from "@material-ui/core"

const useStyles = makeStyles((theme)=> ({
    padding:{
        padding:15,
    },
    container:{
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        gap: theme.spacing(1),
        flexDirection:"column",
        paddingTop:35,

    },

}))


const Yield = () => {

    const classes = useStyles()

    return (

        <Box className={classes.container}  >

            <h4>DeFi Yield: 2,4%</h4>
            <h4>Investments: 8%</h4>

        </Box>


    )


}

export default Yield