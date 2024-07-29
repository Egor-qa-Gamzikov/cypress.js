describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/'); // Зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяем цвет кнопки

         cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
         cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
         cy.get('#loginButton').click(); // Нажал войти

         cy.get('#message').contains('Авторизация прошла успешно'); // Проверяю, что вижу текст
         cy.get('#message').should('be.visible'); // Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя
     })

     it('Верный логин и НЕ верный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяем цвет кнопки

        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio8'); // Ввели неверный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#message').contains('Такого логина или пароля нет'); // Проверяю, что вижу текст
        cy.get('#message').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя
    })

    it('Восстановление пароля', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').click(); // Нажал забыли пароль
        

        cy.get('#mailForgot').type('german@dolnikov.com'); // Ввели НЕ верный логин
        cy.get('#restoreEmailButton').click(); // Отправить код

        cy.get('#message').contains('Успешно отправили пароль на e-mail'); // Проверяю, что вижу текст
        cy.get('#message').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя
    })


    it('Проверка, что в логине есть @', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяем цвет кнопки

        cy.get('#mail').type('germandolnikov.ru'); // Ввели логин без @
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#message').contains('Нужно исправить проблему валидации'); // Проверяю, что вижу текст
        cy.get('#message').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя
    })

    
    it('Проверка, НЕ верный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяем цвет кнопки

        cy.get('#mail').type('german@dolniko.ru'); // Ввели НЕ верный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#message').contains('Такого логина или пароля нет'); // Проверяю, что вижу текст
        cy.get('#message').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя
    })


    it('Приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяем цвет кнопки

        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели НЕ верный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#message').contains('Такого логина или пароля нет'); // Проверяю, что вижу текст
        cy.get('#message').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя
    })
 })


 describe('Покупка аватара', function () {                               // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[type="email"]').type('USER');      // вводим логин
         cy.get('input[type="password"]').type('USER');    // вводим пароль
         cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
         cy.wait(500);




         cy.get('.header__btns > [href="/shop"]').click();               // нажимаем кнопку Магазин
         cy.wait(500);



         cy.get('.available > button').first().click();                  // кликаем по кнопке Купить у первого доступного аватара
         cy.wait(500);



         cy.get('.credit').type('4620869113632996');                     // вводим номер карты
         cy.wait(500);
         cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
         cy.wait(500);
         cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
         cy.wait(500);
         cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
         cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
     });
 });
 