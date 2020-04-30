<template>
    <div 
        class="body-day-column no-select" 
        :style="'height: calc(100% - ' + (incrementHeight + paddingPixels) + 'px);'" 
    >
        <div 
            @mousedown="beginSelect($event, user.id)"
            :ref="'selectAnchor' + user.id" 
            class="body-day-user-column no-select"
            v-for="user in users"
            :key="user.id"
        >
            <div 
                :class="hour.onHour ? 'day-increment on-hour' : 'day-increment'" 
                v-for="hour in hours" 
                :key=hour.time 
                :style="'height: ' + incrementHeight + 'px;'"
            >
            </div>
            <div 
                v-if="mouseDown"
                :style="selectionBoxStyling"
                class="selectBox"
            >
            </div>
        </div>

        <div class="events-column no-select">
            <div 
                class="events-users-column" 
                v-for="user in users"
                :key="user.id"
            >
                <calendar-event
                    v-for="event in filterEventsToDateAndUser(user.id)"
                    @mousedown.stop="$emit('event-click', event)"
                    :event=event
                    :day=day
                    :hours=hours
                    :pixelsPerMinute=pixelsPerMinute()
                    :key="event.id"
                />
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import CalendarEvent from './CalendarEvent.vue';

export default {
    components: {CalendarEvent},
    props: ['hours', 'incrementSize', 'incrementHeight', 'users', 'events', 'day', 'calendarHeight', 'paddingPixels'],
    data: () => ({
        'mouseDown': false,
        'selectBoxStyle': '',
        'startPoint': {},
        'endPoint': {},
        'clickedUser': 0,
        'activeRef': {},
        'selectedTimes': [],
    }),
    watch: {
        selectedTimes (val, oldVal) {
            // Add class to those that we need to
            var addClass = val.filter(x => !oldVal.includes(x));
            addClass.forEach(function (el) {
                el.classList.add('calendar-selected');
            });

            // Remove class from those that we need to
            var removeClass = oldVal.filter(x => !val.includes(x));
            removeClass.forEach(function (el) {
                el.classList.remove('calendar-selected');
            });
        }
    },
    methods: {
        pixelsPerMinute: function () {
            var numberOfMinutes = moment.duration(moment(this.hours[this.hours.length - 1].time, 'Hm').diff(moment(this.hours[0].time, 'Hm'))).asMinutes(); 
            return (this.calendarHeight / numberOfMinutes).toPrecision(15);
        },

        filterEventsToDateAndUser: function (userID) {
            // If we have a userID match & the day is the same, allow the event
            return this.events.filter(event => event.user_id === userID && moment(event.start).isSame(this.day, 'day') )
        },

        beginSelect: function (event, id) {
            this.mouseDown = true;
            this.activeRef = this.$refs['selectAnchor' + id][0];
            this.startPoint = {
                x: event.pageX,
                y: event.pageY
            };
            window.addEventListener('mousemove', this.mouseMove)
            window.addEventListener('mouseup', this.mouseUp)
        },

        mouseMove: function (event) {
            if (this.mouseDown) {
                this.endPoint = {
                    x: event.pageX,
                    y: event.pageY
                }

                this.selectedTimes = Array.from(this.activeRef.children).filter((item) => {
                    return this.isItemSelected(item.$el || item)
                });
            }
        },

        isItemSelected (el) {
            if (el.classList.contains('day-increment')) {
            const boxA = this.selectionBox
            const boxB = {
                top: el.offsetTop,
                left: el.offsetLeft,
                width: el.clientWidth,
                height: el.clientHeight
            }
                return !!(
                    boxA.left <= boxB.left + boxB.width &&
                    boxA.left + boxA.width >= boxB.left &&
                    boxA.top <= boxB.top + boxB.height &&
                    boxA.top + boxA.height >= boxB.top
                )
            }
            return false
        },

        mouseUp: function (event) {
            // Remove event listeners
            window.removeEventListener('mousemove', this.mouseMove)
            window.removeEventListener('mouseup', this.mouseUp)

            // Emit currently selected list
            this.$emit('times-selected', this.selectedTimeRange());

            // Reset state
            this.mouseDown = false;
            this.startPoint = null;
            this.endPoint = null;
            this.selectedTimes = [];
        },

        getScroll : function () {
            return {
                x: this.activeRef.scrollLeft || document.body.scrollLeft || document.documentElement.scrollLeft,
                y: this.activeRef.scrollTop || document.body.scrollTop || document.documentElement.scrollTop
            }
        },

        selectedTimeRange () {
            // Get number of minutes since opening for the beginning and end of the selected times
            var startTime = this.selectedTimes[0].offsetTop / this.pixelsPerMinute();  
            var endTime = (this.selectedTimes[this.selectedTimes.length -1].offsetTop + this.incrementHeight) / this.pixelsPerMinute();

            // Convert them to reasonable hour / seconds
            startTime = moment(this.hours[0].moment).add(startTime, 'minutes');
            endTime = moment(this.hours[0].moment).add(endTime, 'minutes');

            // Turn them into fully qualified Y-m-d H:m moment objects
            startTime = moment(this.day).hour(startTime.hour()).minute(startTime.minute());
            endTime = moment(this.day).hour(endTime.hour()).minute(endTime.minute());

            return {
                startTime: startTime,
                endTime: endTime,
            }
        },
    },
    computed: {
        selectionBox () {
            if (!this.mouseDown) return {}
            const clientRect = this.activeRef.getBoundingClientRect()
            const scroll = this.getScroll()

            // Calculate the actual values for the current mouse cursor
            var left = Math.min(this.startPoint.x, this.endPoint.x) - clientRect.left - scroll.x + this.activeRef.offsetLeft;
            var width = Math.abs(this.startPoint.x - this.endPoint.x);
            var top = Math.min(this.startPoint.y, this.endPoint.y) - clientRect.top - scroll.y;
            var height = Math.abs(this.startPoint.y - this.endPoint.y);

            // Make sure the box does not escape the current element on the left X axis
            if (left < this.activeRef.offsetLeft) {
                left = this.activeRef.offsetLeft;
                width = this.startPoint.x - clientRect.left - scroll.x;
            }

            // Make sure the box does not escape the current element on the right X axis
            if (width + left > this.activeRef.offsetLeft + this.activeRef.offsetWidth) {
                width = this.activeRef.offsetLeft + this.activeRef.offsetWidth - left;
            }

            // Make sure the box does not escape the current element on the top Y axis
            if (Math.abs(top) !== top) {
                top = this.activeRef.offsetTop;
                height = this.startPoint.y - clientRect.top - scroll.y;
            }

            // Make sure the box does not escape the current element on the bottom Y axis
            if (top + height > this.activeRef.offsetTop + this.activeRef.offsetHeight) {
                height = this.activeRef.offsetTop + this.activeRef.offsetHeight - top;
            }

            // Calculate max values so the box cannot extend past the current element
            return {
                left,
                top,
                width,
                height
            }
        },

        selectionBoxStyling () {
            if (!this.mouseDown || !this.startPoint || !this.endPoint) {
                return { background: 'black' }
            }
            const {left, top, width, height} = this.selectionBox;
            return {
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`
            }
        }
    }
}
</script>
<style>
    .selectBox { 
        background-color: rgba(212, 212, 212, 0.5);
        border: 1px solid #8b8b8b;
        position: absolute;
        z-index: 49;
    }

    .no-select {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; 
    }

    .calendar-selected {
        background-color: #f5f5f5;
    }

    .body-day-column {
        border-right: #b9b9b9 1px solid;
        flex: 1;
        width: 0;
        top: 0;
        position: relative;
        display: flex;
        flex-direction: row;
    }

    .body-day-user-column {
        flex: 1;
        border-left: 1px solid #e0e0e0;
        z-index: 30;
    }

    .body-day-user-column:first-of-type {
        border-left: none !important;
    }

    .events-column {
        display: flex;
        flex: 1;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .events-users-column {
        flex: 1;
        width: 100%;
    }

    .day-increment.on-hour:before {
        border-top: 1px solid rgba(0, 0, 0, 0) ;
        box-shadow: 0 -1px 0 #e0e0e0;
        content: "";
        display: block;
        height: 1px;
    }
    .day-increment.on-hour:last-of-type::before {
        border-top: 1px solid rgba(0, 0, 0, 0) ;
        box-shadow: 0 -1px 0 #b9b9b9;
        content: "";
        display: block;
        height: 1px;
    }

    .day-increment { 
        z-index: 50;
    }

    .day-increment.on-hour:first-of-type::before {
        border-top: none;
        box-shadow: none;
    }
</style>