import React, {useState} from "react"
import { makeStyles, Box, Button, Input } from "@material-ui/core"
import {ethers} from "ethers"
import custodianJSON from "../Contracts/custodian.json"
import repaymentJSON from "../Contracts/repaymentPool.json"
import lpTokenJSON from '../Contracts/lpToken.json'


const custodianAddress = "0x69E1249F42Df316baefd152adFA9D73EBA40A6EB"
const repaymentPoolAddress = "0x0152173DE05a4851f19385e58D0603Fb6d90E09A"
const lpTokenAddress = "0x5caaC954968E770D3690e85CC9784d667D3B656F"
const usdc_address_rinkeby = "0xb18d016cdd2d9439a19f15633005a6b2cd6aa774"

const tokenAbi = ['function transfer(address,uint256) external',
    'function balanceOf(address) external view returns(uint256)',
    'function approve(address,uint256) external']

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const custodianContract = new ethers.Contract(custodianAddress, custodianJSON.abi, signer)  
const repaymentContract = new ethers.Contract(repaymentPoolAddress, repaymentJSON.abi, signer) 
const lpTokenContract = new ethers.Contract(lpTokenAddress, lpTokenJSON.abi, signer) 
const usdcContract = new ethers.Contract(usdc_address_rinkeby, tokenAbi, signer)


const useStyles = makeStyles((theme)=> ({
    padding:{
        padding:15,
    },
    container:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(18),
        paddingTop: 20,
        paddingLeft: "",
    },
    buttonColor: {
        backgroundColor: "#80cbc4",
    },
    text:{
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        gap: theme.spacing(1),
        flexDirection:"column",
        paddingTop:15,

    },
    whiteUnderline: {
        '&:before': {
          borderColor: 'white', 

        },
        width:"120px"

      }

}))

const DepositWithdraw = () => {

    const classes = useStyles()

    const[depositAmount, setDepositAmount] = useState("")
    const[withdrawAmount, setWithdrawAmount] = useState("")

    const newDeposit = (e) =>{
        console.log(e.target.value);
        setDepositAmount(e.target.value)
    }

    const newWithdrawal = (e) => {
        console.log(e.target.value);
        setWithdrawAmount(e.target.value)
    }

    const deposit = async() => {
        const amountAsWei = ethers.utils.parseUnits(depositAmount, 6)
        console.log(amountAsWei);
        alert("Please approve Charon Contract to spend your USDC")
        let tx1 = await usdcContract.approve(custodianAddress, amountAsWei)
        await tx1.wait()

        alert("Please confirm deposit in the pool")

        let tx2 = await custodianContract.deposit(amountAsWei, await signer.getAddress())
        await tx2.wait()

        console.log("Successful Deposit");
        alert("Successful Deposit !")
        

    }

    const withdraw = async() => {
        const amountAsWei = ethers.utils.parseUnits(withdrawAmount, 6)
        console.log(amountAsWei);
        let lpAmount = await custodianContract.convertUsdcToLp(amountAsWei)
        alert("Please approve Charon Contract to access your LP tokens")
        let tx1 = await lpTokenContract.approve(custodianAddress, lpAmount)
        await tx1.wait()
        alert("Please confirm withdrawal")
        let tx2 = await custodianContract.redeem(lpAmount)
        await tx2.wait()

        alert("Successful Withdrawal !")
        
    }


    return(

        <Box width={"45%"} className={classes.container}>
            <Box className={classes.text} >
                <Button onClick={deposit} style={{ "min-height": "15px", width: "100px" }} className={classes.buttonColor}>
                    Hop On !
                </Button>
                <Input onChange={newDeposit} className={classes.whiteUnderline} inputProps={{min: 0, style: { textAlign: 'center', color: 'lightgrey', fontSize: "15px" }, placeholder: "USDC Amount"}}/>

            </Box>
            <Box className={classes.text}>
                <Button onClick={withdraw} style={{ "min-height": "15px", width: "100px" }} className={classes.buttonColor}>
                    Hop Off ...
                </Button>
                <Input onChange={newWithdrawal} className={classes.whiteUnderline} inputProps={{min: 0, style: { textAlign: 'center', color: 'lightgrey', fontSize: "15px" }, placeholder: "USDC Amount"}}/>
            </Box>
        </Box>


    )


}

export default DepositWithdraw