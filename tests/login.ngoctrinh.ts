import test, { expect } from "@playwright/test";

test("user login", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium");

  await page.goto("https://the-internet.herokuapp.com/two_factor");
  await page.locator("#username").fill("tomsmith");
  await page.locator("#password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Next" }).click();

  const otp = await page.locator("#otp-code").innerText();
  await page.locator("#code").fill(otp);
  await page.getByRole("button", { name: "Verify" }).click();

  await expect(page).toHaveURL(/two_factor\/secure/);
  await expect(page.getByRole("heading", { name: "Secure Area" })).toBeVisible();

  //   await page.pause();
  await page.waitForTimeout(3000);
});
