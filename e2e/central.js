/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

const test = require('tape');
const wd = require('wd');

module.exports = function(driver, t) {
  t.test('Central screen is displayed with 2 tabs', async function(t) {
    t.ok(
      await driver.waitForElementByAndroidUIAutomator(
        'new UiSelector().text("Messages")',
        6000,
      ),
      'I see the Messages header in the Central screen',
    );
    await driver.sleep(6000);
    // Public tab
    t.ok(
      await driver.waitForElementByAndroidUIAutomator(
        'new UiSelector().textContains("No messages")',
        8000,
      ),
      'I see the Messages tab body with no messages',
    );
    t.ok(
      await driver.elementByAndroidUIAutomator(
        'new UiSelector().descriptionContains("Public Tab Button")',
      ),
      'I see Public tab button',
    );

    // Connections tab
    const connectionsTabButton = await driver.elementByAndroidUIAutomator(
      'new UiSelector().descriptionContains("Connections Tab Button")',
    );
    t.ok(connectionsTabButton, 'I see the Connections Tab button');
    await connectionsTabButton.tap();
    t.pass('I tap it');
    t.ok(
      await driver.elementByAndroidUIAutomator(
        'new UiSelector().text("Connections")',
      ),
      'I see the Connections header in the Central screen',
    );

    try {
      t.ok(
        await driver.elementByAndroidUIAutomator(
          'new UiSelector().textContains("No connections")',
        ),
        'I see Connections tab body with no connections',
      );
    } catch (err) {
      t.ok(
        await driver.elementByAndroidUIAutomator(
          'new UiSelector().textContains("Connecting")',
        ),
        'I see Connections tab body with no connections',
      );
    }

    const lanHelpButton = await driver.elementByAndroidUIAutomator(
      'new UiSelector().descriptionContains("Local Network Mode")',
    );
    t.ok(lanHelpButton, 'I see LAN mode icon');
    await lanHelpButton.tap();
    t.pass('I tap it');

    t.ok(
      await driver.waitForElementByAndroidUIAutomator(
        'new UiSelector().textContains("Connect with friends in the same Local Area Network")',
        6000,
      ),
      'I see a text explaining what LAN connectivity is',
    );

    await driver.back();
    t.pass('I press the (hardware) back button');

    // Back to Public tab
    const publicTabButton = await driver.elementByAndroidUIAutomator(
      'new UiSelector().descriptionContains("Public Tab Button")',
    );
    t.ok(publicTabButton, 'I see Public Tab button');
    await publicTabButton.tap();
    t.pass('I tap it');
    t.ok(
      await driver.waitForElementByAndroidUIAutomator(
        'new UiSelector().text("Messages")',
        8000,
      ),
      'I see the Messages header in the Central screen',
    );

    t.end();
  });
};
