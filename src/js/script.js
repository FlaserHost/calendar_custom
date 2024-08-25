'use strict';

const calendarWrapper = document.querySelector('.header-wrapper');
const calendarHeader = document.querySelector('.calendar-header');
const calendar = document.querySelector('.calendar');

const daysNames = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
const celebrations = [
    '01.01.2024',
    '02.01.2024',
    '03.01.2024',
    '04.01.2024',
    '05.01.2024',
    '06.01.2024',
    '07.01.2024',
    '08.01.2024',
    '23.02.2024',
    '24.02.2024',
    '25.02.2024',
    '08.03.2024',
    '09.03.2024',
    '10.03.2024',
    '29.04.2024',
    '30.04.2024',
    '01.05.2024',
    '09.05.2024',
    '10.05.2024',
    '11.05.2024',
    '12.05.2024',
    '12.06.2024',
    '03.11.2024',
    '04.11.2024',
];

const seasons = {
    winter: ['декабрь', 'январь', 'февраль'],
    spring: ['март', 'апрель', 'май'],
    summer: ['июнь', 'июль', 'август'],
    autumn: ['сентябрь', 'октябрь', 'ноябрь']
};

const seasonsColors = Object.keys(seasons);

const emptyCells = size => Array(size).fill(`<div class="cell"></div>`);

const currentDate = new Date().toLocaleDateString();

const calendarRender = (year = 0, month = 0) => {
    const date = (!year && !month) ? new Date() : new Date(year, month, 1);
    const thisYear = date.getFullYear();
    let thisMonth = date.getMonth();

    const firstDate = new Date(thisYear, thisMonth, 1);
    const firstDayName = firstDate.toLocaleDateString('ru-RU', {
        weekday: 'long'
    });

    const thisMonthName = date.toLocaleDateString('ru-RU', {
       month: 'long'
    });

    for (let key in seasons) {
        if (seasons[key].includes(thisMonthName)) {
            calendarWrapper.className = `header-wrapper ${key}`;
            break;
        }
    }

    calendarHeader.innerText = `${thisMonthName} ${thisYear}`;

    const firstDayNumber = daysNames.indexOf(firstDayName);
    let daysCells = emptyCells(firstDayNumber);

    const lastDate = new Date(thisYear, thisMonth + 1, 0);
    const lastDay = lastDate.getDate();

    const padMonth = String(thisMonth + 1).padStart(2, '0');
    for (let i = 1; i <= lastDay; i++) {
        const padDay = String(i).padStart(2, '0');
        const localDate = `${padDay}.${padMonth}.${thisYear}`;
        const celebration = celebrations.includes(localDate) ? 'celebration' : '';

        const cell = `<div class="cell ${celebration}" data-date="${localDate}">${i}</div>`;
        daysCells.push(cell);
    }

    const totalCells = daysCells.length <= 35 ? 35 : 42;
    const emptyDaysLeft = totalCells - daysCells.length;
    const lastEmptyCells = emptyCells(emptyDaysLeft);
    daysCells = [...daysCells, ...lastEmptyCells];

    calendar.querySelectorAll('.cell').forEach(cell => cell.remove());
    calendar.insertAdjacentHTML('beforeend', daysCells.join(''));

    const currentDay = calendar.querySelector(`.cell[data-date="${currentDate}"]`);
    if (currentDay) {
        currentDay.classList.add('current-day');
    }

    return [thisYear, thisMonth];
}

document.addEventListener('DOMContentLoaded', () => {
    let [year, month] = calendarRender();

    const directions = {
        prev: () => {
            if (month !== 0) {
                month--;
            } else {
                month = 11;
                year--;
            }

            calendarRender(year, month);
        },
        next: () => {
            if (month !== 11) {
                month++;
            } else {
                month = 0;
                year++;
            }

            calendarRender(year, month);
        }
    };

    const directionBtns = document.querySelectorAll('.direction-btn');
    directionBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const direction = e.target.dataset.direction;
            directions[direction]();
        });
    });
});
