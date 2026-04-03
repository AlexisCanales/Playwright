// @ts-check
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Rellena con cero a la izquierda si el número es menor a 10
 * @param {number} n
 * @returns {string}
 */
function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

/**
 * Guarda un screenshot con timestamp y nombre dinámico
 * @param {import('@playwright/test').Page} page
 * @param {string} baseName Nombre base del archivo (ej: "slider", "combobox")
 */
async function takeScreenshot(page, baseName) {
  // --- Timestamp en formato DDMMYYYY_HHMMSS ---
  const now = new Date();

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  const timestamp = `${day}${month}${year}_${hours}${minutes}${seconds}`;

  // --- Crear carpeta screenshots si no existe ---
  const dir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const screenshotPath = path.join(dir, `screenshot-${baseName}-${timestamp}.png`);

  // tomar screenshot
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot guardado en: ${screenshotPath}`);
}

// --- Test Slider ---
test('test slider demoQA', async ({ page }) => {
  // Aumentar timeout para entornos lentos como CI
  test.setTimeout(60000);

  await page.goto('https://demoqa.com/slider');

  // 1. Localizar el slider
  const slider = page.locator('input.range-slider'); // Selector más específico para DemoQA

  // 2. Accion: Llenar el valor
  await slider.fill('80');

  // 3. VALIDACIÓN ROBUSTA (Web-First Assertion)
  // En lugar de getAttribute + expect manual, usamos toHaveValue.
  // Esto reintentará automáticamente si el valor no cambia al instante.
  await expect(slider).toHaveValue('80');

  // Opcional: Validar que el cuadro de texto al lado también cambió a 80
  const sliderValueInput = page.locator('#sliderValue');
  await expect(sliderValueInput).toHaveValue('80');

  // 4. Captura y espera
  await takeScreenshot(page, 'slider');

  // Nota: El waitForTimeout es útil para ver el resultado en local, 
  // pero en GitHub Actions solo hace que el test sea más lento. 
  // Podrías quitarlo o dejarlo bajo (500ms).
  await page.waitForTimeout(1000);
});


// --- Test Combobox ---
test('test combobox demoQA', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://demoqa.com/select-menu');
  await page.setViewportSize({ width: 1280, height: 720 });

  //combobox1
  await page.locator('#withOptGroup').click();
  await page.getByText('Group 1, option 1').click();
  await expect(page.locator('#withOptGroup')).toContainText('Group 1, option 1');

  //combobox2
  await page.locator('#selectOne').click();
  await page.getByText('Mr.').click();
  await expect(page.locator('#selectOne')).toContainText('Mr.');

  //combobox3
  await page.selectOption('#oldSelectMenu', { label: 'Purple' });
  const oldValue = await page.locator('#oldSelectMenu').inputValue();
  expect(oldValue).toBe('4');

  //combobox4 (multi-select), combobox react , con id dinamico
  // 4. Multiselect drop down (Evitando IDs dinámicos)

  // 4. Multiselect drop down (Evitando IDs dinámicos)

  // Seleccionar opción Green
  await page.locator('#react-select-4-input').fill('Green');
  await page.keyboard.press('Enter');

  // Seleccionar opción Blue
  await page.locator('#react-select-4-input').fill('Blue');
  await page.keyboard.press('Enter');

  // Verificar que ambas opciones aparecen como seleccionadas
  const selectedText = await page.locator('#selectMenuContainer').innerText();
  expect(selectedText).toContain('Green');
  expect(selectedText).toContain('Blue');

  await page.keyboard.press('Escape');


  // Combobox5 - Standard Multi Select
  const carsSelect = page.locator('#cars');

  // Hacer scroll hasta el elemento
  await carsSelect.scrollIntoViewIfNeeded();

  // Seleccionar opciones
  await page.selectOption('#cars', ['volvo', 'audi']);

  // Verificar valores seleccionados
  await expect(carsSelect).toHaveValues(['volvo', 'audi']);

  // Tomar screenshot
  await takeScreenshot(page, 'combobox');
  await page.waitForTimeout(2000);



});