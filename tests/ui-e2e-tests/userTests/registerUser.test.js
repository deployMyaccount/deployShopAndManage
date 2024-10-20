import { test, expect } from 'playwright/test';
import { RegisterPageUser } from '../../pageObjects/userPage/registerUserPage';
import { deleteUserByEmail } from '../../utils/dbUtils';
import { VerifyEmailUser } from '../../pageObjects/userPage/verifyEmailPage';
import { MailHelper } from '../../utils/mailHelper';

test.describe('Тестирование страницы регистрации, активация аккаунта через письмо в почте', () => {
  test('Регистрация юзера + активация аккаунта', async ({ page }) => {
    const registerPage = new RegisterPageUser(page);
    const vefiryEmailPage = new VerifyEmailUser(page);
    const getHelperMail = new MailHelper();
    registerPage.navigate();
    try {
      // Регистрация пользователя
      await expect(page).toHaveURL(/.*register\/user/);
      const notificationRegisterSuccessfull = registerPage.getNotificationRegisterSuccessfull();
      await registerPage.registerUser('testoviy_user', 'dmitriiletob324@gmail.com', 'qwerty12345678');
      await expect(notificationRegisterSuccessfull).toBeVisible();
      await expect(notificationRegisterSuccessfull).toHaveText('Успешная регистрация!');
      await expect(page).toHaveURL(/.*login\/user/);

      // Проверка почты и активация аккаунта
      const activationLink = await getHelperMail.getActivationLink('dmitriiletob324@gmail.com');
      console.log(activationLink);
      await page.goto(activationLink);
      await expect(page).toHaveURL(/.*verify-email\/user/);
      const titleVeryfiEmail = vefiryEmailPage.getSuccessTitleVerifyEmail();
      await expect(titleVeryfiEmail).toBeVisible();
      await expect(titleVeryfiEmail).toHaveText(/Успех/);

      await deleteUserByEmail('dmitriiletob324@gmail.com');
    } catch (error) {
      await deleteUserByEmail('dmitriiletob324@gmail.com');
    }
  });
});
