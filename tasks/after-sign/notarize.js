/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

const { notarize } = require('electron-notarize');

module.exports = async function(context) {
  const {
    electronPlatformName,
    appOutDir
  } = context;

  if (electronPlatformName !== 'darwin') {
    return;
  }

  const {
    APPLE_DEVELOPER_ID: appleId,
    APPLE_DEVELOPER_ID_PASSWORD: appleIdPassword
  } = process.env;

  // skip notarization if credentials weren't provided
  if (!appleId || !appleIdPassword) {
    console.log('  • skipping notarization due to missing credentials');

    return;
  }

  const {
    productFilename: appName,
    info: {
      config: {
        appId
      }
    }
  } = context.packager.appInfo;

  const appPath = `${appOutDir}/${appName}.app`;

  console.log(`  • notarizing app from path: ${appPath}`);

  return await notarize({
    appBundleId: appId,
    appPath,
    appleId,
    appleIdPassword
  });
};