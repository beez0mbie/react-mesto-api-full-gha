[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд


## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Ссылка на репозиторий
[express-mesto-gha](https://github.com/beez0mbie/express-mesto-gha)

## PS
- Что бы пройти гит тесты нужно корсы разрешать всем
- а еще продакшн поднять с со всеми разрешенными корсами, дождаться как пройдут тесты и потом вернуть настройку для массива allowCors с флагом проставления куки
- Не забывать каждый раз рестартить сервер ! pm2 stop all, pm2 start all
