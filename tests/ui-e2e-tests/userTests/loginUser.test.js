import { expect,test } from "playwright/test";
import { LandingPage } from "../../pageObjects/landingPage";
import { ProfilePage } from "../../pageObjects/userPage/profilePage";

test('Вход юзера в систему', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const profilePage = new ProfilePage(page);
    await landingPage.navigate();
    await landingPage.loginUser('test-email@mail.ru', 'BETejEmm321');

    await expect(page).toHaveURL(/.*user\/all-product/);

    const balanceUser = profilePage.getBalance();
    await expect(balanceUser).toBeVisible();
    await expect(balanceUser).toContainText('Balance');
  });