require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "https://polygon-mumbai"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        mumbai: {
            url: MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 80001,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: already placed by hardhat.
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: {
            polygonMumbai: POLYGONSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "BNB",
    },
}
task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})
