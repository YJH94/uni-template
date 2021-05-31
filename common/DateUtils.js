/**
 * 日期格式化
 * @param {Object} date format
 */
const dateFormat = function(date, format) {
	var o = {
		"M+": date.getMonth() + 1, //month
		"d+": date.getDate(), //day
		"h+": date.getHours(), //hour
		"m+": date.getMinutes(), //minute
		"s+": date.getSeconds(), //second
		"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
		"S": date.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

/**
 * 时间格式 （解决iOS上创建new date 对象为null）
 * @param {Object} 时间字符串 格式 yyyy-MM-dd hh:mm:ss
 */
function dateFromString(time){
    time = time.replace(/-/g, ':').replace(' ', ':')
    time = time.split(':')
    var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5])
    return time1
}

function getCurrentDate(formatStr) {
	let date = new Date();
	return dateFormat(date, formatStr)
}


/**
 * 比较2个日期的大小
 * @param {Object} startdate
 * @param {Object} enddate
 */
function compareDate(startdate, enddate) {
	var days = 0;
	if (enddate && enddate != "") {
		if (startdate == undefined || startdate == "") {
			startdate = new Date();
		} else {
			startdate = new Date(startdate.substr(0, 4), parseInt(startdate.substr(5, 2)) - 1, startdate.substr(8, 2));
		}
		enddate = new Date(enddate.substr(0, 4), parseInt(enddate.substr(5, 2)) - 1, enddate.substr(8, 2));
		var time = enddate.getTime() - startdate.getTime();
		if (time > 0) {
			return true
		} else {
			false
		}
	}
	return false;
}


function getCurrentDateTime(){
	let date = new Date();
	 return date.getTime();
}

const dayTime = 3600 * 1000 * 24;

/**
 * 获取跟当前时间相差天数
 * @param {Object} date
 */
function getDifferDayWithDate(date,compareDate){
	let nowTime = new Date().getTime();
	if (compareDate) {
		nowTime = new Date(compareDate).getTime();
	}
	let compareTime = new Date(date).getTime();
	
	let timeinterval = nowTime - compareTime;
	let day = timeinterval / dayTime;
	return parseInt(day);
}

/**
 * 获取距离指定日期天数之前或之后日期
 * @param {Object} date 指定日期（不传默认当前日期） (yyyy-MM-dd)
 * @param {Object} day 天数
 * @param {Object} isBefore 之前
 */
function getDateWithDay(date,day,isBefore=true){
	if (!date) {
		date = getCurrentDate('yyyy-MM-dd')
	}
	let timeinterval = '';
	let dateTime = new Date(date).getTime();
	if (isBefore) {
		timeinterval = dateTime - day * dayTime;
	}else{
		timeinterval = dateTime + day * dayTime;
	}
	let newDate = dateFormat(new Date(timeinterval),'yyyy-MM-dd');
	return newDate;
}

function getPregnantWeek(dueDate){
	let date = getDateWithDay(dueDate,280);
	let dayTime = getDifferDayWithDate(date);
	if (dayTime >= 286) {
		return '孕41周以上'
	}else{
		let week = dayTime / 7;
		let day = dayTime % 7;
		let weekStr = `孕${parseInt(week)}周+${parseInt(day)}天`
		return weekStr;
	}
}

/**
 * 获取某年某月有多少天
 */
function getOneMonthDays(year,month){
	month = Number(month);
	const baseMonthsDays = [0,31,28,31,30,31,30,31,31,30,31,30,31];
	if(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)){
		if(month === 2){
			baseMonthsDays[month] = 29;
		}
	}
	return baseMonthsDays[month];
}



module.exports = {
	dateFormat: dateFormat,
	getCurrentDate: getCurrentDate,
	compareDate:compareDate,
	getTime:getCurrentDateTime,
	getDifferDayWithDate,
	getDateWithDay,
	getPregnantWeek,
	getOneMonthDays,
	dateFromString
}
