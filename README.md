# Домашнее задание ШРИ: Автотесты

## Легенда

Однажды, во время очередной виртуальной прогулки по интернету, кот Шрикс наткнулся на рекламу интернет-магазина зоотоваров. В его глазах загорелся огонек, ведь на сайте красовалась фотография великолепной когтеточки, о которой он давно мечтал.
Шрикс был не просто котом, а котом-разработчиком. Поэтому он знал, что прежде чем купить товар, нужно написать тесты. 
С энтузиазмом Шрикс принялся за работу, стуча лапками по клавиатуре и мурлыкая от азарта. Но есть проблема, у Шрикса лапки, поэтому ему нужна помощь.

## автотесты
Для тестирования были использованы модульные и интеграционные тесты. 
Интеграционные сервера проверяли API, ответ от сервера, а также работу некоторых элементов, имитируя действия пользователя.


## Запуск тестов
Подготовка:
```sh
# установите зависимости
npm ci

# соберите клиентский код приложения
npm run build

# запустите сервер
npm start
```

Запуск тестов:
- Модульные тесты: `$env:BUG_ID ='2'; npm run test`
- Интеграционные: `npx testplane`, в файле `settings.ts` можно задать номер бага для проверки

