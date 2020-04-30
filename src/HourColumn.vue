<template>
    <div class="hours-column">
        <div 
            :class="hour.onHour ? 'hour-cell on-hour' : 'hour-cell'" 
            v-for="hour in hours" 
            :key="hour.time"
            :style="'height: ' + incrementHeight + 'px'"
        >
            <div class="hour-cell-text"> 
                {{hour.prettyTime}}
            </div>
        </div>

    </div> 
</template>

<script>
export default {
    props: ['hours', 'paddingPixels', 'incrementHeight', 'headerHeight']
}
</script>

<style>
    .hours-column {
        width: 60px;
        flex: none;
    }

    .hour-cell:last-of-type {
        border-right: none;
    }

    .hour-cell {
        text-align: right;
        padding-right: 11px;
        border-bottom: none;
        position: relative;
        border-right: #b9b9b9 1px solid;
    }

    .hour-cell::before {
        border-top: #b9b9b9 1px solid;
        width: 7px;
        position: absolute;
        height: 1px;
        display: block;
        content: "";
        right: -1px;
        top: -1px;
        text-decoration: inherit;
    }

    .hour-cell.on-hour::before{
        width: 12px;
    }

    .hour-cell-text {
        display: block;
        position: relative;
        top: -6px;
        font-size: 10px;
        padding-right: 4px;
    }

    .hour-cell-header {
        width: 90px;
        padding-right: 8px;
        border-bottom: none;
        position: relative;
    }
</style>