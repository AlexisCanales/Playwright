// @ts-check
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

//test.only('test form demoQA', async ({ page }) => { //con only se ejecuta solo los que tienen only
  test('test form demoQA', async ({ page }) => {
  // aumentar timeout máximo a 60 segundos
  test.setTimeout(60000);

  await page.goto('https://demoqa.com/automation-practice-form');

  // ampliar ventana
  await page.setViewportSize({ width: 1280, height: 720 });

  // llenar formulario
  await page.fill('#firstName', 'Juan');
  await page.fill('#lastName', 'Perez');
  await page.fill('#userEmail', 'juan@example.com');
  await page.click('input[name="gender"][value="Male"]');
  await page.fill('#userNumber', '1234567890');
  await page.fill('#dateOfBirthInput', '10 May 1990');
  await page.press('#dateOfBirthInput', 'Enter');
  await page.click('label[for="hobbies-checkbox-1"]');
  await page.setInputFiles('#uploadPicture', 'tests/resources/foto.png');
  await page.fill('#currentAddress', '123 Main St, Anytown, USA');

  // seleccionar estado y ciudad
  await page.locator('#state').click();
  await page.locator('#react-select-3-option-0').click();
  await page.locator('#city').click();
  await page.locator('#react-select-4-option-0').click();
  await page.click('#submit');

  // --- Timestamp en formato DDMMYYYY_HHMMSS ---
  const now = new Date();

  /**
   * @param {number} n
   * @returns {string}
   */
  const pad = (n) => n.toString().padStart(2, '0');

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  const timestamp = `${day}${month}${year}_${hours}${minutes}${seconds}`;
  console.log(timestamp); // Ejemplo: 24032026_213145

  // --- Crear carpeta screenshots si no existe ---
  const dir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const screenshotPath = path.join(dir, `screenshot-${timestamp}.png`);

  // tomar screenshot
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot guardado en: ${screenshotPath}`);

  // espera de 2 segundos
  await page.waitForTimeout(2000);
});


//test2
test('test2 form demoQA', async ({ page }) => {
  // aumentar timeout máximo a 60 segundos
  test.setTimeout(60000);

  await page.goto('https://demoqa.com/automation-practice-form');

  // ampliar ventana
  await page.setViewportSize({ width: 1280, height: 720 });

  // llenar formulario
  await page.fill('#firstName', 'BBB');
  await page.fill('#lastName', 'BBBB');
  await page.fill('#userEmail', 'juanB@example.com');
  await page.click('input[name="gender"][value="Male"]');
  await page.fill('#userNumber', '1234567890');
  await page.fill('#dateOfBirthInput', '10 May 1990');
  await page.press('#dateOfBirthInput', 'Enter');
  await page.click('label[for="hobbies-checkbox-1"]');
  await page.setInputFiles('#uploadPicture', 'tests/resources/foto.png');
  await page.fill('#currentAddress', 'bbbbbbbb');

  // seleccionar estado y ciudad
  await page.locator('#state').click();
  await page.locator('#react-select-3-option-0').click();
  await page.locator('#city').click();
  await page.locator('#react-select-4-option-0').click();
  await page.click('#submit');

  // --- Timestamp en formato DDMMYYYY_HHMMSS ---
  const now = new Date();

  /**
   * @param {number} n
   * @returns {string}
   */
  const pad = (n) => n.toString().padStart(2, '0');

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  const timestamp = `${day}${month}${year}_${hours}${minutes}${seconds}`;
  console.log(timestamp); // Ejemplo: 24032026_213145

  // --- Crear carpeta screenshots si no existe ---
  const dir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const screenshotPath = path.join(dir, `screenshotB-${timestamp}.png`);

  // tomar screenshot
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot guardado en: ${screenshotPath}`);

  // espera de 2 segundos
  await page.waitForTimeout(2000);
});
