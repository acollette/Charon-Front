import React, {useEffect, useState} from "react"
import {makeStyles, Box} from "@material-ui/core"
import {ethers} from "ethers"
import custodianJSON from "../Contracts/custodian.json"
import repaymentJSON from "../Contracts/repaymentPool.json"
import lpTokenJSON from '../Contracts/lpToken.json'

const custodianAddress = "0x69E1249F42Df316baefd152adFA9D73EBA40A6EB"
const repaymentPoolAddress = "0x0152173DE05a4851f19385e58D0603Fb6d90E09A"
const lpTokenAddress = "0x5caaC954968E770D3690e85CC9784d667D3B656F"

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const custodianContract = new ethers.Contract(custodianAddress, custodianJSON.abi, signer)  
const repaymentContract = new ethers.Contract(repaymentPoolAddress, repaymentJSON.abi, signer) 
const lpTokenContract = new ethers.Contract(lpTokenAddress, lpTokenJSON.abi, signer) 




const useStyles = makeStyles((theme)=> ({
    padding:{
        padding:15,
    },
    container:{
        display: "flex",
        alignItems: "left",
        justifyContent: "left",
        gap: theme.spacing(0),
    },
    terminal:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 7,

    }

}))





const PoolInfo = () => {

    const [defiBalance, setDefiBalance] = useState("")
    const [investedBalance, setInvestedBalance] = useState("")
    const [userBalance, setUserBalance] = useState ("")
    const [transited, setTransited] = useState ("")

    const classes = useStyles()

    const getBalances = async () => {
        const fetchDefiBalance = await custodianContract.defiBalance()
        setDefiBalance(Math.round(ethers.utils.formatUnits(fetchDefiBalance, 6)))

        const fetchInvestedBalance = await custodianContract.investedBalance()
        setInvestedBalance(Math.round(ethers.utils.formatUnits(fetchInvestedBalance,6)))
        
        
        const userLpBalance = await lpTokenContract.balanceOf(await signer.getAddress())
        console.log(await signer.getAddress());
        const lpToUsdc = await custodianContract.convertLpToUsdc(userLpBalance)
        setUserBalance(Math.round(ethers.utils.formatUnits(lpToUsdc,6)))

        const invested = Math.round(ethers.utils.formatUnits(fetchInvestedBalance,6))
        const defi = Math.round(ethers.utils.formatUnits(fetchDefiBalance, 6))
        const total = invested + defi
        console.log(total);
        console.log((invested/total)*100)
        setTransited(Math.round((invested/total)*100))

    }
    

    
    useEffect(()=>{
        getBalances()

    }, [])
    

    return(
        <Box width={"45%"}>
        
            <h3 className={classes.terminal}>Terminal 1</h3>
            <div className={classes.container}>
                <Box border={2} width={"50%"} borderColor={"white"}>
                    <h4 className={classes.padding}>Loading Dock: {defiBalance} USDC</h4>
                    <h4 className={classes.padding}>Total Crossed: {investedBalance} USDC</h4>
                </Box>
                <Box border={2} width={"50%"} borderColor={'white'}>
                    <h4 className={classes.padding}> Transited: {transited} %</h4>
                    <h4 className={classes.padding}>My stake: {userBalance} USDC</h4>
                </Box>

            </div>
            
           
        </Box>
    )


}

export default PoolInfo