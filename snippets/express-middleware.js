const express = require('express');
const path = require('path');

/**
 * Express middleware to trap credential stuffers and scanner bots.
 */
function lamerScarerMiddleware(options = {}) {
  const trapRoutes = options.routes || [
    '/admin',
    '/admin/login',
    '/administrator',
    '/wp-admin',
    '/wp-login.php',
    '/phpmyadmin'
  ];

  const staticDir = options.staticDir || path.join(__dirname, '../templates/vanilla');

  return function (req, res, next) {
    const cleanPath = req.path.toLowerCase().replace(/\/$/, '');
    if (trapRoutes.includes(cleanPath)) {
      return res.sendFile(path.join(staticDir, 'index.html'));
    }
    next();
  };
}

module.exports = lamerScarerMiddleware;
