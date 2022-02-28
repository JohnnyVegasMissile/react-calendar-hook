import { useState, useEffect } from 'react'

const getDaysInMonth = (month, year) => {
    let date = new Date(year, month, 1)
    let days = []
    while (date.getMonth() === month) {
        days.push({ day: date.getDay(), date: date.getDate() })
        date.setDate(date.getDate() + 1)
    }
    return days
}

const getLastDaysPrevMonth = (month, year, nbDays) => {
    let date = new Date(year, month, 1)
    date.setDate(date.getDate() - 1)

    let days = []
    let i = 0
    while (i < nbDays) {
        days.push({ day: date.getDay(), date: date.getDate() })
        date.setDate(date.getDate() - 1)
        i++
    }

    return days.reverse()
}

const calcCalendarPage = (month, year) => {
    const nbDays = getDaysInMonth(month, year)
    const firstDay = nbDays[0]
    const lastDay = nbDays[nbDays.length - 1]
    let prev = getLastDaysPrevMonth(month, year, firstDay.day)
    if (prev.length === 7) prev = []

    let next = []
    const nextMonth = new Date(year, month, lastDay.date + 1)

    var times = 35 - (prev.length + nbDays.length)
    for (let i = 0; i < times; i++) {
        next.push({ day: nextMonth.getDay(), date: nextMonth.getDate() })
        nextMonth.setDate(nextMonth.getDate() + 1)
    }
    if (next.length === 7) next = []

    return {
        prev,
        current: nbDays,
        next,
    }
}

const applySelected = (
    selected,
    currentMonthDays,
    currentMonth,
    currentYear
) => {
    let copyCurrentMonthDays = { ...currentMonthDays }

    const currentSelected = selected.filter(
        (date) =>
            date.getFullYear() === currentYear &&
            date.getMonth() === currentMonth
    )

    copyCurrentMonthDays.current = copyCurrentMonthDays.current.map((day) => ({
        ...day,
        selected:
            currentSelected.findIndex(
                (e) =>
                    e.getDate() === day.date &&
                    e.getMonth() === currentMonth &&
                    e.getFullYear() === currentYear
            ) !== -1,
    }))

    return copyCurrentMonthDays
}

const useCalendar = ({
    selected = [],
    disabled = [],
    defaultDate = new Date(),
}) => {
    const [currentMonth, setCurrentMonth] = useState(defaultDate.getMonth())
    const [currentYear, setCurrentYear] = useState(defaultDate.getFullYear())
    const [currentMonthDays, setCurrentMonthDays] = useState(
        calcCalendarPage(defaultDate.getMonth(), defaultDate.getFullYear())
    )

    useEffect(() => {
        setCurrentMonthDays(
            applySelected(selected, currentMonthDays, currentMonth, currentYear)
        )
    }, [selected])

    const modifyPage = (month, year) => {
        setCurrentMonthDays(
            applySelected(selected, calcCalendarPage(month, year), month, year)
        )
        setCurrentMonth(month)
        setCurrentYear(year)
    }

    return {
        goPrevMonth: () => {
            if (currentMonth === 0) {
                modifyPage(11, currentYear - 1)
            } else {
                modifyPage(currentMonth - 1, currentYear)
            }
        },
        goNextMonth: () => {
            if (currentMonth === 11) {
                modifyPage(0, currentYear + 1)
            } else {
                modifyPage(currentMonth + 1, currentYear)
            }
        },
        goNextYear: () => modifyPage(currentMonth, currentYear + 1),
        goPrevYear: () => modifyPage(currentMonth, currentYear - 1),
        currentMonthDays,
        currentMonth,
        currentYear,
        goToCurrentMonth: () =>
            modifyPage(defaultDate.getMonth(), defaultDate.getFullYear()),
    }
}

export { useCalendar }