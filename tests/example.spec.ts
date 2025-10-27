import { test, expect } from "@playwright/test";

test("Automation Exercise - Simple Version", async ({ page }) => {
  await page.goto("https://automationexercise.com");

  await expect(
    page.getByRole("heading", { name: "AutomationExercise" })
  ).toBeVisible();

  // await page.getByRole("link", { name: "Add to cart" }).first().hover();

  // await page.locator(".productinfo").first().hover();

  const firstProduct = page.locator(".productinfo").first();
  await firstProduct.hover();
  await firstProduct.getByText("Add to cart").click();

   const modal = page.locator(".modal-content");
  //  await expect(modal).toBeVisible({ timeout: 5000 });
  modal.getByRole("link", { name: "View Cart" }).click()

  await page.waitForURL("**/view_cart");
  await expect(page.locator("#cart_info_table")).toBeVisible();

  // await page.locator(".btn.btn-default.check_out").click();
  const checkoutBtn = page.getByText("Proceed To Checkout");
  await expect(checkoutBtn).toBeVisible();
  await checkoutBtn.click();

  await page.waitForTimeout(1000);
  // await page.locator('.text-center a[href="/login"]').click();
  await page.getByText("Register / Login").last().click();
  

  const currentUrl = page.url();

  if (currentUrl.includes("/login")) {
    await page
      .getByPlaceholder("Email Address").first()
      .fill("playwrighttest@example.com");
    await page.getByPlaceholder("Password").fill("GFXbtcVV@57kPSH");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page).toHaveURL("https://automationexercise.com/");
    await page.goto("https://automationexercise.com/view_cart");

    // await page.locator(".btn.btn-default.check_out").click();
    const checkoutBtn = page.getByText("Proceed To Checkout");
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();
  }

  await page.waitForURL("**/checkout", { timeout: 10000 });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await page.waitForTimeout(1000);

  // const placeOrderBtn = page.locator('a[href="/payment"]');
  // await placeOrderBtn.waitFor({ state: "visible", timeout: 10000 });
  // await placeOrderBtn.click();

   const placeOrderBtn = page.getByText('Place Order');
   await placeOrderBtn.waitFor({ state: "visible", timeout: 10000 });
   await placeOrderBtn.click();

  await page.waitForURL("**/payment", { timeout: 10000 });

  await page.fill('input[name="name_on_card"]', "Playwright Tester");
  await page.fill('input[name="card_number"]', "4111111111111111");
  await page.getByPlaceholder("ex. 311").fill("123");
  await page.getByPlaceholder("MM").fill("12");
  await page.getByPlaceholder("YYYY").fill("2028");


  await page.screenshot({
    path: "screenshots/checkout-card-details.png",
    fullPage: true,
  });

});
