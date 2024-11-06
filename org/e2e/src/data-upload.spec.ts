import { expect, Page, test } from '@playwright/test';
import * as path from 'node:path';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('');
});

test.afterAll(async () => {
  await page.close();
});

test('should login', async () => {
  const emailInput = page.locator("//input[@type='text']");
  await emailInput.fill(process.env['TEST_USERNAME']!);

  const passwordInput = page.locator("//input[@type='password']");
  await passwordInput.fill(process.env['TEST_PASSWORD']!);

  const submitButton = page.locator("//button[@type='submit']");
  await submitButton.click();

  const successAlert = page.locator("//div[contains(@class, 'alert-success')]");

  await expect(successAlert).toBeVisible();
  await expect(successAlert).toHaveClass(/opacity-100/);
  await expect(successAlert).toContainText('Inicio de sesión exitoso');

  await page.waitForTimeout(2500);

  await successAlert.click();
});

test('should upload files successfully', async () => {
  const fileUploadInput = page.locator("//input[@id='dropzone-file']");
  await fileUploadInput.setInputFiles([
    path.join(__dirname, 'files/ripsTest.xlsx'),
    path.join(__dirname, 'files/informeTest.xlsx'),
  ]);

  await page.route('*/**/data-upload', async (route) => {
    await route.fulfill({
      json: {
        status: 200,
        message: 'Datos insertados en la Base de Datos exitosamente',
      },
    });
  });

  const submitButton = page.getByRole('button', { name: /Enviar archivos/ });
  await submitButton.click();

  const successAlert = page.locator("//div[contains(@class, 'alert-success')]");

  await expect(successAlert).toBeVisible();
  await expect(successAlert).toHaveClass(/opacity-100/);
  await expect(successAlert).toContainText('Archivos enviados exitosamente');

  await page.waitForTimeout(2500);

  await successAlert.click();
});
