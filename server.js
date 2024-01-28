const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 13000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blockchain_db');

app.get('/address/:address', async (req, res) => {
    const { address } = req.params;
  
    try {
      const etherscanAPIKey = 'R73UPDEYY8WSN3SND5WFE2SUPPD66SWQKE';
  
      const ethBalanceUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${etherscanAPIKey}`;
      const ethBalanceResponse = await axios.get(ethBalanceUrl);
      const ethBalance = ethBalanceResponse.data.result;
  
      const erc20TokenApiUrl = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=${address}&tag=latest&apikey=${etherscanAPIKey}`;
      const erc20TokenResponse = await axios.get(erc20TokenApiUrl);
      const erc20TokenBalances = erc20TokenResponse.data;
  
      const transactionApiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanAPIKey}`;
      const transactionResponse = await axios.get(transactionApiUrl);
      const transactions = transactionResponse.data.result;
      const responseData = { address, ethBalance, erc20TokenBalances, transactions};
  
  
      res.json(responseData);
    } catch (error) {
      console.error(`Error fetching address details for ${address}:`, error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });