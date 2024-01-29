const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 13000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blockchain_db');

const alertSchema = new mongoose.Schema({
  address: { type: String, required: true },
  thresholdAmount: { type: Number, required: true }
});

const Alert = mongoose.model('Alert', alertSchema);


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

    const alerts = await Alert.find({ address });

    const responseData = { address, ethBalance, erc20TokenBalances, transactions, alerts };
    res.json(responseData);
  } catch (error) {
    console.error(`Error fetching address details for ${address}:`, error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/alerts', async (req, res) => {
  const { address, thresholdAmount, notificationMethods } = req.body;

  try {
    console.log(`Setting up alert for address: ${address}, Threshold: ${thresholdAmount}`);

    const existingAlert = await Alert.findOne({ address });

    if (existingAlert) {
      console.log(`Alert already exists for address: ${address}`);
      res.status(400).json({ error: 'Alert already exists for this address' });
    } else {
      const newAlert = new Alert({ address, thresholdAmount, notificationMethods });
      await newAlert.save();

      console.log(`Alert set up successfully for address: ${address}`);
      res.json({ success: true, message: 'Alert set up successfully' });
    }
  } catch (error) {
  //  console.error(`Error setting up alert for ${address}:`, error.message);
    res.status(500).json({ error: `Error setting up alert for ${address}:` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});