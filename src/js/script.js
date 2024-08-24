'use strict';

const daysNames = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

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

    const firstDayNumber = daysNames.indexOf(firstDayName);
    let daysCells = emptyCells(firstDayNumber);

    const lastDate = new Date(thisYear, thisMonth + 1, 0);
    const lastDay = lastDate.getDate();

    const padMonth = String(thisMonth + 1).padStart(2, '0');
    for (let i = 1; i <= lastDay; i++) {
        const padDay = String(i).padStart(2, '0');

        const cell = `<div class="cell" data-date="${padDay}.${padMonth}.${thisYear}">${i}</div>`;
        daysCells.push(cell);
    }

    const totalCells = daysCells.length <= 35 ? 35 : 42;
    const emptyDaysLeft = totalCells - daysCells.length;
    const lastEmptyCells = emptyCells(emptyDaysLeft);
    daysCells = [...daysCells, ...lastEmptyCells];

    const calendar = document.querySelector('.calendar');
    calendar.querySelectorAll('.cell').forEach(cell => cell.remove());

    calendar.insertAdjacentHTML('beforeend', daysCells.join(''));

    const calendarHeader = document.querySelector('.calendar-header');
    calendarHeader.innerText = `${thisMonthName} ${thisYear}`;

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
