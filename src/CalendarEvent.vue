<template>
    <div class="body-day-user-event-relative">
        <div class="body-day-user-event" :style="'top: ' + calculateEventOffset() + 'px; height: ' + calculateEventHeight() + 'px; background-color: ' + event.color + ';'">
            <div class="body-day-user-event-text">
                <div class="body-day-user-event-name">{{event.name}}</div>
                <div class="body-day-user-event-timings"> {{generatePrettyTimings(event)}} </div>
                <div class="body-day-user-event-description-text">{{event.description}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props: ['event', 'pixelsPerMinute', 'day', 'hours', 'eventTimeFormat'],
    methods: {
        generatePrettyTimings: function () {
            if (this.eventTimeFormat) {
                var format = this.eventTimeFormat
            } else {
                var format = 'h:mm';
            }
            return moment(this.event.start).format(format) + ' - ' + moment(this.event.end).format(format);
        },

        calculateEventOffset: function () {
            var minutesSinceOpening = moment.duration(moment(this.event.start).diff(moment(this.day.format('Y-M-D') + ' ' + this.hours[0].time, 'Y-M-D Hm'))).asMinutes(); 
            return minutesSinceOpening * this.pixelsPerMinute;
        },

        calculateEventHeight: function () {
            var eventLength = moment.duration(moment(this.event.end).diff(moment(this.event.start))).asMinutes(); 
            return (eventLength * this.pixelsPerMinute).toPrecision(15);
        },
    }
}
</script>

<style>
    .body-day-user-event-relative {
        position: relative;
    }

    .body-day-user-event-name {
        font-weight: 700;
    }

    .body-day-user-event-timings {
        margin-top: 3px;
    }

    .body-day-user-event-description-text {
        font-size: 12px;
        margin-top: 8px;
    }

    .body-day-user-event-text {
        padding: 8px;
        color: white;    
    }

    .body-day-user-event {
        width: calc(100% - 1px);
        background-color: black;
        flex: 1;
        margin-right: 0.125px;
        margin-left: 0.125px;
        position: absolute;
        border-radius: 4px;
        z-index: 50;
    }
</style>