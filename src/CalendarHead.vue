 <template>      
    <div class="calendar-head" :style="'height:' + headerHeight  + 'px'">
        <div class="days-row">
            <div class="day-column-header"  :style="'height:' + headerHeight + 'px'"> </div>
            <div class="day-column" v-for="(day, index) in days" :key="`day-${index}`">
                <div class="day-column-weekday">
                    {{day.format('ddd')}}
                </div>

                <div  class="day-column-day">
                    <button :class="day.isSame(now, 'day') ? 'day-column-button day-column-button-today' : 'day-column-button'" >
                        <span class="day-column-button-content" >{{day.format('D')}}</span>
                    </button>
                </div>

                <div class="day-column-fill"> 
                    <div class="day-column-user" v-for="user in users" :key="user.id">
                        <div class="day-column-user-content"> {{user.initials}} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['users', 'days', 'headerHeight'],
    data: () => ({
            'now': moment(),
    }),
}
</script>

<style>
    .day-column-fill {
        height: calc(100% - 76px);
        display: flex;
        align-items: center;
    }
    
    .day-column-fill .day-column-user:last-of-type {
        border-right: none !important;
    }

    .day-column-user {
        flex: 1;
        text-align: center;
        border-right: #b9b9b9 1px solid;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .day-column-user-content {
        flex: 1;
        text-align: center;
    }

    .day-column-button {
            height: 56px;
            border-radius: 50%;
            width: 56px;
            align-items: center;
            display: inline-flex;
            flex: 0 0 auto;
            font-weight: 500;
            letter-spacing: 0.0892857143em;
            justify-content: center;
            outline: 0;
            position: relative;
            text-decoration: none;
            text-indent: 0.0892857143em;
            text-transform: uppercase;
            transition-duration: 0.28s;
            transition-property: box-shadow, transform, opacity;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            cursor: default;
    }
    .day-column-button-today {
        background-color: #f5f5f5;
    }

    .day-column-button-content {
            align-items: center;
            color: inherit;
            display: flex;
            flex: 1 0 auto;
            justify-content: inherit;
            line-height: normal;
            position: relative;
    }

    .calendar-head {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 100%;
        width: 100%
    }

    .day-column-weekday {
        color: rgba(0, 0, 0, 0.38);
        user-select: none;
        padding: 3px 0px 0px 0px;
        font-size: 11px;
        text-align: center;
        text-transform: uppercase;
    }

    .day-column-day {
        user-select: none;
        padding: 0px 0px 3px 0px;
        text-align: center;
        font-size:18px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.78);
    }

    .day-column-today {
        background-color: rgba(0, 0, 0, 0.03);
    }

    .day-body {
        flex: 1;
        width: 0;
        position: relative;
    }

    .day-column {
        flex: 1 1 auto;
        position: relative;
        border-right: #b9b9b9 1px solid;
        border-bottom: #b9b9b9 1px solid;
    }

    .day-column-header {
        flex: 0;
        padding-right: 59px;
        border-right: #b9b9b9 1px solid;
    }

    .days-row {
        flex: none;
        display: flex;
    }
</style>