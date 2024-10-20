// ES5 Pure function to calculate meeting duration in hours and minutes
export function calculateDurationES5 (startDate: string | number | Date, endDate: string | number | Date) {
  var startTime = new Date(startDate).getTime();
  var endTime = new Date(endDate).getTime();

  var durationInMillis = endTime - startTime;
  var hours = Math.floor(durationInMillis / (1000 * 60 * 60));
  var minutes = Math.floor((durationInMillis % (1000 * 60 * 60)) / (1000 * 60));

  return hours + ' hour(s) ' + minutes + ' minute(s)';
}
