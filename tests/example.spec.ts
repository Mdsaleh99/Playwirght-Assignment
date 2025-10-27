import { test, expect } from "@playwright/test";

test("Automation Exercise - Simple Version", async ({ page }) => {
  await page.goto("https://automationexercise.com");

  await expect(
    page.getByRole("heading", { name: "AutomationExercise" })
  ).toBeVisible();

  await page.waitForSelector(".productinfo", { timeout: 10000 });

  await page.locator(".productinfo").first().hover();

  await page.locator(".productinfo .add-to-cart").first().click();

  await page.waitForSelector(".modal-content", { timeout: 5000 });
  await page.locator('.modal-content a[href="/view_cart"]').click();

  await page.waitForURL("**/view_cart");
  await expect(page.locator("#cart_info_table")).toBeVisible();

  await page.locator(".btn.btn-default.check_out").click();
  await page.waitForTimeout(1000);
  await page.locator('.text-center a[href="/login"]').click();

  // STEP 5: Login if needed
  const currentUrl = page.url();

  if (currentUrl.includes("/login")) {
    await page
      .getByPlaceholder("Email Address").first()
      .fill("playwrighttest@example.com");
    await page.getByPlaceholder("Password").fill("GFXbtcVV@57kPSH");
    await page.getByRole("button", { name: "login" }).click();

    await page.waitForURL("**/", { timeout: 10000 });

    await page.goto("https://automationexercise.com/view_cart");

    await page.locator(".btn.btn-default.check_out").click();
  }

  await page.waitForURL("**/checkout", { timeout: 10000 });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await page.waitForTimeout(1000);

  const placeOrderBtn = page.locator('a[href="/payment"]');
  await placeOrderBtn.waitFor({ state: "visible", timeout: 10000 });
  await placeOrderBtn.click();


  await page.waitForURL("**/payment", { timeout: 10000 });

  await page.fill('input[name="name_on_card"]', "Playwright Tester");
  await page.fill('input[name="card_number"]', "4111111111111111");
  await page.fill('input[name="cvc"]', "123");
  await page.fill('input[name="expiry_month"]', "12");
  await page.fill('input[name="expiry_year"]', "2028");


  await page.screenshot({
    path: "screenshots/checkout-card-details.png",
    fullPage: true,
  });

});
