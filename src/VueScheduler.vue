<template>
    <div class="calendar" ref="calendar">
            <calendar-head
                :days=days
                :headerHeight=headerHeight
                :users=users
            />
            <div class="calendar-body">
                <hour-column
                    :hours=hours
                    :paddingPixels=paddingPixels
                    :incrementHeight=incrementHeight
                    :headerHeight=headerHeight
                />

                <day-increment
                    v-on:event-click=eventClick
                    v-on:times-selected=timesSelected
                    v-for="(day, index) in days"
                    :key="`day-${index}`"
                    :day=day
                    :hours=hours
                    :users=users
                    :incrementHeight=incrementHeight
                    :events=events
                    :paddingPixels=paddingPixels
                    :calendarHeight="$refs.calendar.clientHeight - (headerHeight + paddingPixels + incrementHeight)"
                    :incrementSize=incrementSize
                    :eventTimeFormat=eventTimeFormat
                />
            </div>
    </div>
</template>

<style>
    .calendar {
        flex: 1 1 60%;
        display: flex;
        position: relative;
        flex-direction: column;
    }

    .calendar-body {
        display: flex;
        flex: 1;
    }
</style>

<script>
import moment from 'moment';
import HourColumn from './HourColumn.vue';
import CalendarHead from './CalendarHead.vue';
import DayIncrement from './DayIncrement.vue';

export default {
    name: 'VueScheduler',
    components: {HourColumn, CalendarHead, DayIncrement},
    props: ['openingTimes', 'events', 'format', 'startDate', 'users', 'options'],
    data: () => ({
        'incrementHeight': 30,
        'paddingPixels': 10,
        'hours': [],
        'days': [],
        'now': moment(),
        'headerHeight': 110,
        'incrementSize': 15,
        'eventTimeFormat': 'hh:mm',
        'weekDays': [1, 5],
        'outputFormat': null,
    }),
    mounted() {
        // Init options
        this.setOptions();
        // Set the hours to be rendered
        this.setHours();
        // Check the size of the element & how large a single increment should be in pixels
        this.setIncrementHeight();
        // Calculate which days of the week to render
        this.setDays();
    },
    watch: {
        format: function (val, old) {
            if (val !== old && (val === 'week' || val === 'day')) {
                this.days = [];
                this.setDays();
            }
        }
    },
    methods:{
        setOptions: function () {
            Object.keys(this.options).forEach((name) => {
                this[name] = this.options[name];
            });
        },

        setIncrementHeight: function () {
            // Add +1 when calculating because the header needs to be included
            this.incrementHeight = Math.floor((this.$refs.calendar.clientHeight - this.headerHeight) / this.hours.length);
            this.paddingPixels = (this.$refs.calendar.clientHeight - this.headerHeight) % this.hours.length;
        },

        setHours: function() {
            // Set the hours between the opening and closing hour
            if (this.openingTimes.format) {
                var format = this.openingTimes.format;
            } else {
                format = "Hm";
            }
            var currentIncrement = moment(this.openingTimes.open, format); 
            var closeTime = moment(this.openingTimes.close, format);

            // While the current increment is before the closetime
            while (moment(currentIncrement).isSameOrBefore(closeTime)) {
                var onHour = moment(currentIncrement).format('HHmm').substr(2, 4) === '00' ? true : false;

                // Push the time object with the absolute time & pretty time
                this.hours.push({
                    time: moment(currentIncrement).format('HHmm'),
                    prettyTime: onHour ? moment(currentIncrement).format('h A') : '',
                    onHour: onHour,
                    moment: currentIncrement,
                });

                // Increment
                currentIncrement = moment(currentIncrement).add(this.incrementSize, 'minutes'); 
            }
        },

        setDays: function() {
            if (this.format == 'week') {
                // Get the first and last day of a given week
                var startOfWeek = moment(this.startDate).day(this.weekDays[0]);
                var endOfWeek = startOfWeek.clone().day(this.weekDays[1]);

                // Iterate adding a day at a time
                while(!startOfWeek.isAfter(endOfWeek)) {
                    this.days.push(startOfWeek.clone());
                    startOfWeek.add(1 , 'days');
                }   
            } else if (this.format == 'day') {
                this.days.push(moment(this.startDate));
            }
        },

        eventClick: function (event) {
            this.$emit('event-click', event);
        },

        timesSelected: function (times) {
            if (this.outputFormat) {
                times = {
                    start: times.start.format(this.outputFormat),
                    end: times.end.format(this.outputFormat)
                }
            }
            this.$emit('times-selected', times);
        },
    }
}
</script>
