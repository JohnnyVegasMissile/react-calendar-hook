# react-calendar-hook
Hook to build custom calendar with react

##Example
```
import { useCalendar } from '@johnnymissile/react-calendar-hook'

const App = () => {
    const [selected, setSelected] = useState([new Date()])
    const {
        goPrevMonth,
        goNextMonth,
        goNextYear,
        goPrevYear,
        currentMonth,
        currentYear,
        currentMonthDays,
        goToCurrentMonth,
    } = useCalendar({
        selected,
        disabled: [],
    })

    const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

    const handleDateCLick = (day, month, year) => {
        let copySelected = [...selected]

        const indexMatchingDate = selected.findIndex(
            (date) =>
                date.getDate() === day &&
                date.getMonth() === month &&
                date.getFullYear() === year
        )

        if (indexMatchingDate === -1) {
            copySelected.push(new Date(year, month, day))
        } else {
            copySelected.splice(indexMatchingDate, 1)
        }

        setSelected(copySelected)
    }

    const cancel = () => {
        goToCurrentMonth()
        setSelected([])
    }

    const validate = () => {
        goToCurrentMonth()
        setSelected([])
    }

    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 1,
                backgroundColor: 'red',
                height: 400,
                width: 300,
                top: 115,
                textAlign: 'center',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p onClick={goPrevYear}>{'<<'}</p>
                <p onClick={goPrevMonth}>{'<'}</p>
                <p onClick={goToCurrentMonth}>{`${
                    currentMonth + 1
                } ${currentYear}`}</p>
                <p onClick={goNextMonth}>{'>'}</p>
                <p onClick={goNextYear}>{'>>'}</p>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                }}
            >
                {[
                    ...days.map((day, i) => <p>{day}</p>),
                    ...currentMonthDays.prev.map((day, index) => (
                        <p style={{ color: '#ccc' }}>{/*day.date*/}</p>
                    )),
                    ...currentMonthDays.current.map((day, index) => (
                        <p
                            style={{
                                backgroundColor: day.selected
                                    ? '#0000FF'
                                    : null,
                                color: day.selected ? '#FFF' : '#000',
                            }}
                            onClick={() =>
                                handleDateCLick(
                                    day.date,
                                    currentMonth,
                                    currentYear
                                )
                            }
                        >
                            {day.date}
                        </p>
                    )),
                    ...currentMonthDays.next.map((day, index) => (
                        <p style={{ color: '#ccc' }}>{day.date}</p>
                    )),
                ]}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <p onClick={cancel}>Cancel</p>
                <p onClick={validate}>Validate</p>
            </div>
        </div>
    )
}

```
