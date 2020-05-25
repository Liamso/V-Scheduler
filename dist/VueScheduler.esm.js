import moment from 'moment';

//
var script = {
  props: ['hours', 'paddingPixels', 'incrementHeight', 'headerHeight']
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".hours-column{width:60px;flex:none}.hour-cell:last-of-type{border-right:none}.hour-cell{text-align:right;padding-right:11px;border-bottom:none;position:relative;border-right:#b9b9b9 1px solid}.hour-cell::before{border-top:#b9b9b9 1px solid;width:7px;position:absolute;height:1px;display:block;content:\"\";right:-1px;top:-1px;text-decoration:inherit}.hour-cell.on-hour::before{width:12px}.hour-cell-text{display:block;position:relative;top:-6px;font-size:10px;padding-right:4px}.hour-cell-header{width:90px;padding-right:8px;border-bottom:none;position:relative}";
styleInject(css_248z);

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "hours-column"
  }, _vm._l(_vm.hours, function (hour) {
    return _c('div', {
      key: hour.time,
      class: hour.onHour ? 'hour-cell on-hour' : 'hour-cell',
      style: 'height: ' + _vm.incrementHeight + 'px'
    }, [_c('div', {
      staticClass: "hour-cell-text"
    }, [_vm._v(" \n            " + _vm._s(hour.prettyTime) + "\n        ")])]);
  }), 0);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

//
var script$1 = {
  props: ['users', 'days', 'headerHeight'],
  data: () => ({
    'now': moment()
  })
};

var css_248z$1 = ".day-column-fill{height:calc(100% - 76px);display:flex;align-items:center}.day-column-fill .day-column-user:last-of-type{border-right:none!important}.day-column-user{flex:1;text-align:center;border-right:#b9b9b9 1px solid;height:100%;display:flex;align-items:center}.day-column-user-content{flex:1;text-align:center}.day-column-button{background-color:#f4f4f4ba;height:56px;border-radius:50%;width:56px;align-items:center;display:inline-flex;flex:0 0 auto;font-weight:500;letter-spacing:.0892857143em;justify-content:center;outline:0;position:relative;text-decoration:none;text-indent:.0892857143em;text-transform:uppercase;transition-duration:.28s;transition-property:box-shadow,transform,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);cursor:default}.day-column-button-today{background-color:#f5f5f5}.day-column-button-content{align-items:center;color:inherit;display:flex;flex:1 0 auto;justify-content:inherit;line-height:normal;position:relative}.calendar-head{display:flex;flex-direction:column;overflow:hidden;height:100%;width:100%}.day-column-weekday{color:rgba(0,0,0,.38);user-select:none;padding:3px 0 0 0;font-size:11px;text-align:center;text-transform:uppercase}.day-column-day{user-select:none;padding:0 0 3px 0;text-align:center;font-size:18px;font-weight:500;color:rgba(0,0,0,.78)}.day-column-today{background-color:rgba(0,0,0,.03)}.day-body{flex:1;width:0;position:relative}.day-column{flex:1 1 auto;position:relative;border-right:#b9b9b9 1px solid;border-bottom:#b9b9b9 1px solid}.day-column-header{flex:0;padding-right:59px;border-right:#b9b9b9 1px solid}.days-row{flex:none;display:flex}";
styleInject(css_248z$1);

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "calendar-head",
    style: 'height:' + _vm.headerHeight + 'px'
  }, [_c('div', {
    staticClass: "days-row"
  }, [_c('div', {
    staticClass: "day-column-header",
    style: 'height:' + _vm.headerHeight + 'px'
  }), _vm._v(" "), _vm._l(_vm.days, function (day, index) {
    return _c('div', {
      key: "day-" + index,
      staticClass: "day-column"
    }, [_c('div', {
      staticClass: "day-column-weekday"
    }, [_vm._v("\n                " + _vm._s(day.format('ddd')) + "\n            ")]), _vm._v(" "), _c('div', {
      staticClass: "day-column-day"
    }, [_c('div', {
      class: day.isSame(_vm.now, 'day') ? 'day-column-button day-column-button-today' : 'day-column-button'
    }, [_c('span', {
      staticClass: "day-column-button-content"
    }, [_vm._v(_vm._s(day.format('D')))])])]), _vm._v(" "), _c('div', {
      staticClass: "day-column-fill"
    }, _vm._l(_vm.users, function (user) {
      return _c('div', {
        key: user.id,
        staticClass: "day-column-user"
      }, [_c('div', {
        staticClass: "day-column-user-content"
      }, [_vm._v(" " + _vm._s(user.initials) + " ")])]);
    }), 0)]);
  })], 2)]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
var script$2 = {
  props: ['event', 'pixelsPerMinute', 'day', 'hours', 'eventTimeFormat'],
  methods: {
    generatePrettyTimings: function () {
      if (this.eventTimeFormat) {
        var format = this.eventTimeFormat;
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
      return (eventLength * this.pixelsPerMinute).toPrecision(15) - 1;
    }
  }
};

var css_248z$2 = ".body-day-user-event-relative{position:relative}.body-day-user-event-name{font-weight:700}.body-day-user-event-timings{margin-top:3px}.body-day-user-event-description-text{font-size:12px;margin-top:8px}.body-day-user-event-text{padding:8px;color:#fff}.body-day-user-event{width:calc(100% - 1px);background-color:#000;flex:1;margin-right:.125px;margin-left:.125px;position:absolute;border-radius:4px;z-index:50}";
styleInject(css_248z$2);

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "body-day-user-event-relative"
  }, [_c('div', {
    staticClass: "body-day-user-event",
    style: 'top: ' + _vm.calculateEventOffset() + 'px; height: ' + _vm.calculateEventHeight() + 'px; background-color: ' + _vm.event.color + ';'
  }, [_c('div', {
    staticClass: "body-day-user-event-text"
  }, [_c('div', {
    staticClass: "body-day-user-event-name"
  }, [_vm._v(_vm._s(_vm.event.name))]), _vm._v(" "), _c('div', {
    staticClass: "body-day-user-event-timings"
  }, [_vm._v(" " + _vm._s(_vm.generatePrettyTimings(_vm.event)) + " ")]), _vm._v(" "), _c('div', {
    staticClass: "body-day-user-event-description-text"
  }, [_vm._v(_vm._s(_vm.event.description))])])])]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
var script$3 = {
  components: {
    CalendarEvent: __vue_component__$2
  },
  props: ['hours', 'incrementSize', 'incrementHeight', 'users', 'events', 'day', 'calendarHeight', 'paddingPixels', 'eventTimeFormat'],
  data: () => ({
    'mouseDown': false,
    'selectBoxStyle': '',
    'startPoint': {},
    'endPoint': {},
    'clickedUser': 0,
    'activeRef': {},
    'selectedTimes': []
  }),
  watch: {
    selectedTimes(val, oldVal) {
      // Add class to those that we need to
      var addClass = val.filter(x => !oldVal.includes(x));
      addClass.forEach(function (el) {
        el.classList.add('calendar-selected');
      }); // Remove class from those that we need to

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
      return this.events.filter(event => event.user_id === userID && moment(event.start).isSame(this.day, 'day'));
    },
    beginSelect: function (event, id) {
      this.mouseDown = true;
      this.activeRef = this.$refs['selectAnchor' + id][0];
      this.clickedUser = id;
      this.startPoint = {
        x: event.pageX,
        y: event.pageY
      };
      window.addEventListener('mousemove', this.mouseMove);
      window.addEventListener('mouseup', this.mouseUp);
    },
    mouseMove: function (event) {
      if (this.mouseDown) {
        this.endPoint = {
          x: event.pageX,
          y: event.pageY
        };
        this.selectedTimes = Array.from(this.activeRef.children).filter(item => {
          return this.isItemSelected(item.$el || item);
        });
      }
    },

    isItemSelected(el) {
      if (el.classList.contains('day-increment')) {
        const boxA = this.selectionBox;
        const boxB = {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.clientWidth,
          height: el.clientHeight
        };
        return !!(boxA.left <= boxB.left + boxB.width && boxA.left + boxA.width >= boxB.left && boxA.top <= boxB.top + boxB.height && boxA.top + boxA.height >= boxB.top);
      }

      return false;
    },

    mouseUp: function (event) {
      // Remove event listeners
      window.removeEventListener('mousemove', this.mouseMove);
      window.removeEventListener('mouseup', this.mouseUp);
      if (!this.endPoint.x) return {}; // Emit currently selected list

      this.$emit('times-selected', this.selectedTimeRange()); // Reset state

      this.mouseDown = false;
      this.startPoint = null;
      this.endPoint = null;
      this.selectedTimes = [];
    },
    getScroll: function () {
      if (typeof document === 'undefined') {
        return {
          x: 0,
          y: 0
        };
      }

      return {
        x: this.activeRef.scrollLeft || document.body.scrollLeft || document.documentElement.scrollLeft,
        y: this.activeRef.scrollTop || document.body.scrollTop || document.documentElement.scrollTop
      };
    },

    selectedTimeRange() {
      // Get number of minutes since opening for the beginning and end of the selected times
      var startTime = this.selectedTimes[0].offsetTop / this.pixelsPerMinute();
      var endTime = (this.selectedTimes[this.selectedTimes.length - 1].offsetTop + this.incrementHeight) / this.pixelsPerMinute(); // Convert them to reasonable hour / seconds

      startTime = moment(this.hours[0].moment).add(startTime, 'minutes');
      endTime = moment(this.hours[0].moment).add(endTime, 'minutes'); // Turn them into fully qualified Y-m-d H:m moment objects

      startTime = moment(this.day).hour(startTime.hour()).minute(startTime.minute());
      endTime = moment(this.day).hour(endTime.hour()).minute(endTime.minute());
      return {
        start: startTime,
        end: endTime,
        user_id: this.clickedUser
      };
    },

    hourClass(hour) {
      var str = hour.onHour ? 'day-increment on-hour ' : 'day-increment ';
      str += hour == this.hours[this.hours.length - 1] ? 'last-day-increment' : '';
      return str;
    }

  },
  computed: {
    selectionBox() {
      if (!this.mouseDown) return {};
      if (!this.endPoint.x) return {};
      const clientRect = this.activeRef.getBoundingClientRect();
      const scroll = this.getScroll(); // Calculate the actual values for the current mouse cursor

      var left = Math.min(this.startPoint.x, this.endPoint.x) - clientRect.left - scroll.x + this.activeRef.offsetLeft;
      var width = Math.abs(this.startPoint.x - this.endPoint.x);
      var top = Math.min(this.startPoint.y, this.endPoint.y) - clientRect.top - scroll.y;
      var height = Math.abs(this.startPoint.y - this.endPoint.y); // Make sure the box does not escape the current element on the left X axis

      if (left < this.activeRef.offsetLeft) {
        left = this.activeRef.offsetLeft;
        width = this.startPoint.x - clientRect.left - scroll.x;
      } // Make sure the box does not escape the current element on the right X axis


      if (width + left > this.activeRef.offsetLeft + this.activeRef.offsetWidth) {
        width = this.activeRef.offsetLeft + this.activeRef.offsetWidth - left;
      } // Make sure the box does not escape the current element on the top Y axis


      if (Math.abs(top) !== top) {
        top = this.activeRef.offsetTop;
        height = this.startPoint.y - clientRect.top - scroll.y;
      } // Make sure the box does not escape the current element on the bottom Y axis


      if (top + height > this.activeRef.offsetTop + this.activeRef.offsetHeight) {
        height = this.activeRef.offsetTop + this.activeRef.offsetHeight - top;
      } // Calculate max values so the box cannot extend past the current element


      return {
        left,
        top,
        width,
        height
      };
    },

    selectionBoxStyling() {
      if (!this.mouseDown || !this.startPoint || !this.endPoint) {
        return {
          background: 'black'
        };
      }

      const {
        left,
        top,
        width,
        height
      } = this.selectionBox;
      return {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      };
    }

  }
};

var css_248z$3 = ".selectBox{background-color:rgba(212,212,212,.5);border:1px solid #8b8b8b;position:absolute;z-index:10}.no-select{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.calendar-selected{background-color:#f5f5f5}.body-day-column{border-right:#b9b9b9 1px solid;flex:1;width:0;top:0;position:relative;display:flex;flex-direction:row}.body-day-user-column{flex:1;border-left:1px solid #e0e0e0;z-index:9}.body-day-user-column:first-of-type{border-left:none!important}.last-day-increment{background-color:rgba(0,0,0,0)}.events-column{display:flex;flex:1;position:absolute;top:0;bottom:0;left:0;right:0}.events-users-column{flex:1;width:100%;overflow:hidden}.day-increment.on-hour:before{border-top:1px solid transparent;box-shadow:0 -1px 0 #e0e0e0;content:\"\";display:block;height:1px}.day-increment.on-hour:last-of-type::before{border-top:1px solid transparent;box-shadow:0 -1px 0 #b9b9b9;content:\"\";display:block;height:1px}.day-increment{z-index:10}.day-increment.on-hour:first-of-type::before{border-top:none;box-shadow:none}";
styleInject(css_248z$3);

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "body-day-column no-select",
    style: 'height: calc(100% - ' + (_vm.incrementHeight + _vm.paddingPixels) + 'px);'
  }, [_vm._l(_vm.users, function (user) {
    return _c('div', {
      key: user.id,
      ref: 'selectAnchor' + user.id,
      refInFor: true,
      staticClass: "body-day-user-column no-select",
      on: {
        "mousedown": function ($event) {
          return _vm.beginSelect($event, user.id);
        }
      }
    }, [_vm._l(_vm.hours, function (hour) {
      return _c('div', {
        key: hour.time,
        class: _vm.hourClass(hour),
        style: 'height: ' + _vm.incrementHeight + 'px;'
      });
    }), _vm._v(" "), _vm.mouseDown ? _c('div', {
      ref: "selectBox",
      refInFor: true,
      staticClass: "selectBox",
      style: _vm.selectionBoxStyling
    }) : _vm._e()], 2);
  }), _vm._v(" "), _c('div', {
    staticClass: "events-column no-select"
  }, _vm._l(_vm.users, function (user) {
    return _c('div', {
      key: user.id,
      staticClass: "events-users-column"
    }, _vm._l(_vm.filterEventsToDateAndUser(user.id), function (event) {
      return _c('calendar-event', {
        key: event.id,
        attrs: {
          "event": event,
          "day": _vm.day,
          "hours": _vm.hours,
          "users": _vm.users,
          "pixelsPerMinute": _vm.pixelsPerMinute(),
          "eventTimeFormat": _vm.eventTimeFormat
        },
        nativeOn: {
          "mousedown": function ($event) {
            $event.stopPropagation();
            return _vm.$emit('event-click', event);
          }
        }
      });
    }), 1);
  }), 0)], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

//
var script$4 = {
  name: 'VueScheduler',
  components: {
    HourColumn: __vue_component__,
    CalendarHead: __vue_component__$1,
    DayIncrement: __vue_component__$3
  },
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
    'outputFormat': null
  }),

  mounted() {
    // Init options
    this.setOptions(); // Set the hours to be rendered

    this.setHours(); // Check the size of the element & how large a single increment should be in pixels

    this.setIncrementHeight(); // Calculate which days of the week to render

    this.setDays();
  },

  watch: {
    format: function (val, old) {
      if (val !== old && (val === 'week' || val === 'day')) {
        this.days = [];
        this.setDays();
      }
    },
    startDate: function (val, old) {
      if (val !== old) {
        this.setDays();
      }
    }
  },
  methods: {
    setOptions: function () {
      Object.keys(this.options).forEach(name => {
        this[name] = this.options[name];
      });
    },
    setIncrementHeight: function () {
      // Add +1 when calculating because the header needs to be included
      this.incrementHeight = Math.floor((this.$refs.calendar.clientHeight - this.headerHeight) / this.hours.length);
      this.paddingPixels = (this.$refs.calendar.clientHeight - this.headerHeight) % this.hours.length;
    },
    setHours: function () {
      // Set the hours between the opening and closing hour
      if (this.openingTimes.format) {
        var format = this.openingTimes.format;
      } else {
        format = "Hm";
      }

      var currentIncrement = moment(this.openingTimes.open, format);
      var closeTime = moment(this.openingTimes.close, format); // While the current increment is before the closetime

      while (moment(currentIncrement).isSameOrBefore(closeTime)) {
        var onHour = moment(currentIncrement).format('HHmm').substr(2, 4) === '00' ? true : false; // Push the time object with the absolute time & pretty time

        this.hours.push({
          time: moment(currentIncrement).format('HHmm'),
          prettyTime: onHour ? moment(currentIncrement).format('h A') : '',
          onHour: onHour,
          moment: currentIncrement
        }); // Increment

        currentIncrement = moment(currentIncrement).add(this.incrementSize, 'minutes');
      }
    },
    setDays: function () {
      if (this.format == 'week') {
        // Get the first and last day of a given week
        var startOfWeek = moment(this.startDate).day(this.weekDays[0]);
        var endOfWeek = startOfWeek.clone().day(this.weekDays[1]); // Iterate adding a day at a time

        while (!startOfWeek.isAfter(endOfWeek)) {
          this.days.push(startOfWeek.clone());
          startOfWeek.add(1, 'days');
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
        };
      }

      this.$emit('times-selected', times);
    }
  }
};

var css_248z$4 = ".calendar{flex:1 1 60%;display:flex;position:relative;flex-direction:column}.calendar-body{display:flex;flex:1}";
styleInject(css_248z$4);

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "calendar",
    staticClass: "calendar"
  }, [_c('calendar-head', {
    attrs: {
      "days": _vm.days,
      "headerHeight": _vm.headerHeight,
      "users": _vm.users
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "calendar-body"
  }, [_c('hour-column', {
    attrs: {
      "hours": _vm.hours,
      "paddingPixels": _vm.paddingPixels,
      "incrementHeight": _vm.incrementHeight,
      "headerHeight": _vm.headerHeight
    }
  }), _vm._v(" "), _vm._l(_vm.days, function (day, index) {
    return _c('day-increment', {
      key: "day-" + index,
      attrs: {
        "day": day,
        "hours": _vm.hours,
        "users": _vm.users,
        "incrementHeight": _vm.incrementHeight,
        "events": _vm.events,
        "paddingPixels": _vm.paddingPixels,
        "calendarHeight": _vm.$refs.calendar.clientHeight - (_vm.headerHeight + _vm.paddingPixels + _vm.incrementHeight),
        "incrementSize": _vm.incrementSize,
        "eventTimeFormat": _vm.eventTimeFormat
      },
      on: {
        "event-click": _vm.eventClick,
        "times-selected": _vm.timesSelected
      }
    });
  })], 2)], 1);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

// Import vue component

const install = function installVueScheduler(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueScheduler', __vue_component__$4);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$4.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__$4;
