import Moment from 'moment';

Moment.updateLocale('en', {
    weekdays : ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'],
    weekdaysShort : ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa'],
    // meridiem : function (hour, minute, isLowercase) {
    //   if(hour === 0 && minute === 0) return 'midnight';
    //   if(hour >= 0 && hour < 12) return 'in the morning';
    //   if(hour === 12 && minute === 0) return 'noon';
    //   return 'after noon';
    // }
});

export default Moment;
