# Проект 8: Место (Гараж Ferrari) REFACTORING

* created class Section

* [ссылка на проект](https://pavel-khokhlov.github.io/mesto/)

### Обзор
Создан профиль человека, основавший компанию Ferrari
Профиль можно редактировать, изменять имя и должность

Добавлены места и люди из истории компании

### Технологии
В проекте были использовы HTML CSS, применены технологии адаптивной и резиновой верстки. Так же использован JavaScript для работы с Popup. Использоаны функции работы с массивом, функции добавление удаления элементов страницы. Добавлены функции проверки форм.
Создана папка SCRIPTS, в ней 5 файла
* data.js - массив первых шести мест
* params.js - база переменных
* card.js - class Card
* formValidator.js - class FormValidator
* index.js - все остальное

Работает на большешстве устройств.
**Основные точки проверки при размерах экрана**
* 320px 
* 1280px

**Добавить при необходимости**


**Figma**

* [Ссылка на макет в Figma / спринт 4](https://www.figma.com/file/StZjf8HnoeLdiXS7dYrLAh/JavaScript.-Sprint-4)

* [Ссылка на макет в Figma / спринт 5](https://www.figma.com/file/nlYpT4VhFiwimn2YlncrcF/JavaScript.-Sprint-5?node-id=0%3A1)

* [Ссылка на макет в Figma / спринт 6](https://www.figma.com/file/XNaGNEZD5NEjeyJzAT4gMb/JavaScript.-Sprint-6?node-id=0%3A1)

### спринт 7

Создание классов Card и FormValidator
Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
принимает в конструктор её данные и селектор её template-элемента;
содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
содержит приватные методы для каждого обработчика;
содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
Для каждой карточки создайте экземпляр класса Card.
Создайте класс FormValidator, который настраивает валидацию полей формы:
принимает в конструктор объект настроек с селекторами и классами формы;
принимает вторым параметром элемент той формы, которая валидируется;
имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
имеет один публичный метод enableValidation, который включает валидацию формы.
Для каждой проверяемой формы создайте экземпляр класса FormValidator.

**Картинки**

На странице присутствуют 6 карточек с фотографиями. Снимки и названия мест вы можете выбрать сами.

Картинки [оптимизированы в программе](XnViewer), удклены методанные, чтобы сайт загружался быстрее.
