const express = require('express');
const shell = require('shelljs');
const router = express.Router();

router.get('/status', (req, res, next) => {
  const stdout = shell.exec('sudo expressvpn status').stdout;
  const connected = stdout.length > 0 && !stdout.includes('Not connected');
  res.send({ expressvpn: { connected: connected } });
});

router.post('/connect', (req, res, next) => {
  const stdout = shell.exec('sudo expressvpn connect').stdout;
  const succeeded = stdout.length > 0 && stdout.includes('Connected to');
  res.send({ expressvpn: { connected: succeeded } });
});

router.post('/disconnect', (req, res, next) => {
  const stdout = shell.exec('sudo expressvpn disconnect').stdout;
  const succeeded = stdout.length > 0 && stdout.includes('Disconnected.');
  res.send({ expressvpn: { connected: !succeeded } });
});

module.exports = router;
