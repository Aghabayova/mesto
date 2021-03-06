# Проект 9: Место

### Обзор
Данная проектная работа имеет своей целью применить полученные знания из теории обучения основам программирования языком JavaScript на практике. Этот сайт верстался на основе макета из Фигмы. 

## Функциональность сайта: 

* использование семантических тегов;
* возможность ввести свои данные (имя, вид деятельности);
* удаление и добавление изображений; 
* сайт адаптирован к разным расширениям экрана. 

## Основными задачами обучения этого проекта являются:

* первое знакомство со скриптовым языком программирования JavaScript.
* понятия базовых типов данных в языке, операторы, выражения, работа с переменными JS и их типами и тд.
* изучение технологии ООП
* также изучить следующие шаги по овладению Гитом и Вебпак
* работа с API


## Технологии исползованные при верстке сайта: 

* HTML
* CSS
* Flex
* Grid Layout
* Отзывчивый и адаптивный дизайн от 320px до 1200px
* Nested BEM
* Java Script
* OOP
* JavaScript разбит на модули
* WebPack
* API

### При помощи JavaScript реализованы:
* форма для редактирования профиля пользователя;
* форма для дополнения изображений; 
* добавление основных изображений на сайт из массива через шаблон;
* добавление картинок пользователя;
* удаление изображений; 
* лайки изображениям; 
* валидация всех форм с использованием стандартных браузерных текстов ошибок;
* улучшена UX при работе с попапами;
* закрытие попапа нажатием на Esc;
* закрытие попапа кликом на оверлей.
* формла для добавления нового аватара;
* форма для подтверждения удаления карточки;
* счетчик лайков.

### При помощи API на сервер посылаются разного типа запросы для того чтобы получать данные с него, посылать новые данные, удалять элементы, ставить лайки, открывать формы итд.    



* [Ссылка на макет 1 в Figma](https://www.figma.com/file/StZjf8HnoeLdiXS7dYrLAh/JavaScript.-Sprint-4)
* [Ссылка на макет 2 в Figma](https://www.figma.com/file/nlYpT4VhFiwimn2YlncrcF/JavaScript.-Sprint-5)
* [Ссылка на макет 3 в Figma](https://www.figma.com/file/XNaGNEZD5NEjeyJzAT4gMb/JavaScript.-Sprint-6)
* [Ссылка на макет 4 в Figma](https://www.figma.com/file/hhhIavVTeuilfPPZ6sbifl/JavaScript.-Sprint-9)



1. Для установки, запустите клонирование репозитория:
    ```
    git clone https://github.com/Aghabayova/mesto.git
    ```

2. В терминале запускаем NPM
    ```
    npm install
    ```

3. После успешной установки станут доступны команды 

    3.1 Поднимаем локальный сервер
    ```
    npm run dev
    ```

    3.2 Сборку для продакшен
    ```
    npm run buid
    ```