<script>

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueScheduler
  }
});
</script>

<template>
<div>
        <div class="text-center">Here's a demo calendar you can use to interact with the package! </div>

        <br><br>

        <vue-scheduler
                class="calendar"
                :users=users
                :options=options
                :openingTimes=openingTimes
                :events=events
                :format=format
                :startDate=startDate
                v-on:times-selected=timesSelected
                v-on:event-click=eventClicked
        />
    </div>
</div>
</template>
<script>
import Vue from 'vue';
import VueScheduler from '@/VueScheduler.vue';
export default Vue.extend({
    components: {VueScheduler},
    data: () => ({
        'format': 'week',
        'startDate': '2020-05-03',
        'options': {
          'headerHeight': 110,
          'incrementSize': 15,
        },
        'openingTimes': {
          'open': '09:00',
          'close': '18:00',
          'format': 'h:m',
        },
        'users': [
            {
                'id': 1,
                'initials': 'AS'
            },            
            {
                'id': 2,
                'initials': 'ASDD'
            },
        ],
        'events': [
            {
                id: 1,
                user_id: 1,
                name: 'Test Event',
                start: '2020-05-03T09:00:00+1000',
                end: '2020-05-03T12:15:00+1000',
                color: '#32a852'
            }, 
            {
                id: 3,
                user_id: 2,
                name: 'Clean & Wax',
                start: '2020-05-08T13:00:00+1000',
                end: '2020-05-08T15:00:00+1000',
                color: '#c94242',
                'description': 'Description text here'
            },
            {
                id: 2,
                user_id: 2,
                name: 'Service',
                start: '2020-05-03T11:30:00+1000',
                end: '2020-05-03T12:30:00+1000',
                color: '#3f74d1'
            },
        ]
    }),
    methods: {
        timesSelected: function (e) {
            console.log(e);
        },

        eventClicked: function (e) {
            console.log(e);
        }
    }
});
</script>

<style>
.text-center {
    text-align: center;
}

.calendar {
    width: 75vw;
    height: 1200px;
}

@media all and (max-width:600px) {
    .calendar {
        width: 75vw;
        height: 1600px;
    }
}

</style>