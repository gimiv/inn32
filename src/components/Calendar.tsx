import { useState } from 'react'
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    isBefore,
    startOfToday,
    getDay,
    isWithinInterval
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
    checkIn: Date | null
    checkOut: Date | null
    onChange: (dates: { checkIn: Date | null; checkOut: Date | null }) => void
}

export function Calendar({ checkIn, checkOut, onChange }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [hoverDate, setHoverDate] = useState<Date | null>(null)

    const today = startOfToday()

    // Left Calendar (Current Month)
    const leftMonth = currentMonth
    const leftMonthStart = startOfMonth(leftMonth)
    const leftMonthEnd = endOfMonth(leftMonthStart)
    const leftDays = eachDayOfInterval({ start: leftMonthStart, end: leftMonthEnd })
    const leftStartDay = getDay(leftMonthStart)

    const getPadding = (dayIndex: number) => {
        if (dayIndex === 0) return 6
        return dayIndex - 1
    }
    const leftPadding = Array.from({ length: getPadding(leftStartDay) })

    // Right Calendar (Next Month)
    const rightMonth = addMonths(currentMonth, 1)
    const rightMonthStart = startOfMonth(rightMonth)
    const rightMonthEnd = endOfMonth(rightMonthStart)
    const rightDays = eachDayOfInterval({ start: rightMonthStart, end: rightMonthEnd })
    const rightStartDay = getDay(rightMonthStart)
    const rightPadding = Array.from({ length: getPadding(rightStartDay) })

    const handleDateClick = (date: Date) => {
        if (isBefore(date, today)) return

        if (!checkIn || (checkIn && checkOut)) {
            // Start new selection
            onChange({ checkIn: date, checkOut: null })
        } else {
            // Complete selection
            if (isBefore(date, checkIn)) {
                // If clicking before check-in, set as new start date
                onChange({ checkIn: date, checkOut: null })
            } else if (isSameDay(date, checkIn)) {
                // Deselect if clicking same day
                onChange({ checkIn: null, checkOut: null })
            } else {
                // Valid end date
                onChange({ checkIn, checkOut: date })
            }
        }
    }

    const isSelected = (date: Date) => {
        return (checkIn && isSameDay(date, checkIn)) || (checkOut && isSameDay(date, checkOut))
    }

    const isInRange = (date: Date) => {
        if (checkIn && checkOut) {
            return isWithinInterval(date, { start: checkIn, end: checkOut })
        }
        if (checkIn && hoverDate && isBefore(checkIn, hoverDate)) {
            return isWithinInterval(date, { start: checkIn, end: hoverDate })
        }
        return false
    }

    const isRangeStart = (date: Date) => checkIn && isSameDay(date, checkIn)
    const isRangeEnd = (date: Date) => {
        if (checkOut && isSameDay(date, checkOut)) return true
        if (!checkOut && checkIn && hoverDate && isSameDay(date, hoverDate) && isBefore(checkIn, hoverDate)) return true
        return false
    }

    const renderMonth = (monthDate: Date, days: Date[], padding: any[]) => (
        <div className="flex-1">
            <div className="text-center font-bold text-gray-900 mb-4 capitalize">
                {format(monthDate, 'MMMM yyyy')}
            </div>

            <div className="grid grid-cols-7 mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider py-1">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
                {padding.map((_, i) => (
                    <div key={`padding-${i}`} />
                ))}

                {days.map((date) => {
                    const disabled = isBefore(date, today)
                    const selected = isSelected(date)
                    const inRange = isInRange(date)
                    const rangeStart = isRangeStart(date)
                    const rangeEnd = isRangeEnd(date)

                    return (
                        <div
                            key={date.toISOString()}
                            className="relative py-0.5"
                            onMouseEnter={() => setHoverDate(date)}
                            onMouseLeave={() => setHoverDate(null)}
                        >
                            {/* Range Background Connector */}
                            {inRange && (
                                <div
                                    className={`absolute inset-y-0.5 bg-blue-50
                                    ${rangeStart ? 'left-1/2 rounded-l-full' : 'left-0'}
                                    ${rangeEnd ? 'right-1/2 rounded-r-full' : 'right-0'}
                                    `}
                                />
                            )}

                            <button
                                onClick={() => handleDateClick(date)}
                                disabled={disabled}
                                className={`
                                  relative z-10 w-9 h-9 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all
                                  ${disabled
                                        ? 'text-gray-300 cursor-not-allowed decoration-slice'
                                        : 'cursor-pointer hover:bg-gray-100'
                                    }
                                  ${selected ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' : 'text-gray-700'}
                                  ${!selected && !disabled && isToday(date) ? 'ring-1 ring-blue-600 text-blue-600 font-bold' : ''}
                                  ${!selected && inRange ? 'text-blue-700 font-semibold' : ''}
                                `}
                            >
                                {format(date, 'd')}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )

    return (
        <div className="w-full bg-white select-none relative">
            {/* Left Arrow */}
            <div className="absolute top-0 left-2 z-20">
                <button
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    disabled={isBefore(endOfMonth(subMonths(currentMonth, 1)), today)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>

            {/* Right Arrow */}
            <div className="absolute top-0 right-2 z-20">
                <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Side-by-Side Calendars */}
            <div className="flex flex-col md:flex-row gap-8 relative px-2 py-2">
                {renderMonth(leftMonth, leftDays, leftPadding)}
                <div className="hidden md:block w-px bg-gray-100 self-stretch mx-auto" />
                {renderMonth(rightMonth, rightDays, rightPadding)}
            </div>
        </div>
    )
}
