const express = require('express');
const shell = require('shelljs');
const router = express.Router();
const cors = require('cors');

router.get('/status', cors(), (req, res, next) => {
  const stdout = shell.exec('sudo expressvpn status').stdout;
  const connected = stdout.length > 0 && !stdout.includes('Not connected');
  res.send({ expressvpn: { connected: connected } });
});

router.post('/connect', cors(), (req, res, next) => {
  const stdout = shell.exec('sudo expressvpn connect').stdout;
  console.log(">>>>> stdout: ", stdout);
  const succeeded = stdout.length > 0 && stdout.includes('Connected to');
  res.send({ expressvpn: { connected: succeeded } });
});

router.post('/disconnect', cors(), (req, res, next) => {
  const stdout = shell.exec('sudo expressvpn disconnect').stdout;
  const succeeded = stdout.length > 0 && stdout.includes('Disconnected.');
  res.send({ expressvpn: { connected: !succeeded } });
});

module.exports = router;
