import { expect,test } from "playwright/test";
import { LandingPage } from "../../pageObjects/landingPage";
import { DashboardPage } from "../../pageObjects/adminPage/dashboardPage";

test('Вход администратора в систему', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const dashboardPage = new DashboardPage(page);
    await landingPage.navigate();
    await landingPage.loginAdmin('test-email@mail.ru', 'BETejEmm321');

    await expect(page).toHaveURL(/.*dashboard\/admin/);

    const btnLogout = dashboardPage.getLogoutBtn();
    await expect(btnLogout).toBeVisible();
  });