const num = /^[0-9]*$/;
const mobile = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const realName = /^[\u4e00-\u9fa5]{2,5}$/;
const num_en = /^[0-9a-zA-Z]{6,16}$/;
const name = /^\S{2,32}$/;
const identifyNumber = /^[a-zA-Z0-9]{1,20}$/;


let idTransfer = (sId) => {
	if (sId.length === 15) {
		let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
			arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'],
			nTemp = 0;

		sId = sId.substr(0, 6) + '19' + sId.substr(6, sId.length - 6);

		for (let i = 0; i < 17; i++) {
			nTemp += Number(sId.substr(i, 1)) * arrInt[i];
		}
		sId += arrCh[nTemp % 11];
	}
	return sId;
}


const validate = {
	isNumber: (str) => {
		return num.test(str)
	},
	isidentifyNumber: (str) => {
		return identifyNumber.test(str)
	},

	//是否是手机
	isMobile: (str) => {
		return mobile.test(str)
	},

	//是否是邮件
	isEmail: (str) => {
		return email.test(str)
	},

	//是否是名字（2-5）中文
	varisRealName: (str) => {
		return realName.test(str)
	},

	//是否是数字加英文
	isNumEn: (str) => {
		return num_en.test(str)
	},

	// 2-32位字符
	isName: (str) => {
		return name.test(str)
	},

	//复杂的判定身份证
	isChinaId: (s) => {
		let sId = idTransfer(s),
			aCity = {
				11: "北京",
				12: "天津",
				13: "河北",
				14: "山西",
				15: "内蒙古",
				21: "辽宁",
				22: "吉林",
				23: "黑龙江 ",
				31: "上海",
				32: "江苏",
				33: "浙江",
				34: "安徽",
				35: "福建",
				36: "江西",
				37: "山东",
				41: "河南",
				42: "湖北 ",
				43: "湖南",
				44: "广东",
				45: "广西",
				46: "海南",
				50: "重庆",
				51: "四川",
				52: "贵州",
				53: "云南",
				54: "西藏 ",
				61: "陕西",
				62: "甘肃",
				63: "青海",
				64: "宁夏",
				65: "新疆",
				71: "台湾",
				81: "香港",
				82: "澳门",
				91: "国外 "
			};
		if (sId.length == 8 || sId.length == 9) {
			return [true];
		}

		if (!/^\d{17}(\d|x)$/i.test(sId)) {
			return [false, '证件号格式错误'];
		}

		// sId = sId.replace(/x$/i, "a");

		if (!aCity[parseInt(sId.substr(0, 2), 10)]) {
			return [false, '身份证前两位错误'];
		}

		var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2)),
			d = new Date(sBirthday.replace(/-/g, "/"));

		if (sBirthday !== (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
			return [false, '非法身份证号'];
		}

		var sMouth = d.getMonth() + 1,
			sDate = d.getDate();
		sBirthday = d.getFullYear() + "-" + (sMouth > 9 ? sMouth : '0' + sMouth) + "-" + (sDate > 9 ? sDate : '0' + sDate);

		/*十八位身份证的校验码*/
		// for (let i = 17; i >= 0; i--) {
		//   iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
		//   if ( iSum % 11 !== 1 ) {
		//     return [false,'非法身份证号'];
		//   }
		// }
		if (sId.length == 18) {
			//∑(ai×Wi)(mod 11)
			//加权因子
			let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			let sum = 0;
			let ai = 0;
			let wi = 0;
			for (let i = 0; i < 17; i++) {
				ai = Number(sId[i]);
				wi = factor[i];
				sum += ai * wi;
			}
			let last = parity[sum % 11];
			if (last != sId[17].toUpperCase()) {
				return [false, '非法身份证号'];
			}
		}

		return [true, sBirthday, (Number(sId.substr(16, 1)) % 2 ? "MALE" : "FEMALE")];
	},


	getAge: (identityCard) => {
		var len = (identityCard + "").length;
		if (len == 0) {
			return 0;
		} else {
			if ((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
			{
				return 0;
			}
		}
		var strBirthday = "";
		if (len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
		{
			strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
		}
		if (len == 15) {
			strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
		}
		//时间字符串里，必须是“/”
		var birthDate = new Date(strBirthday);
		var nowDateTime = new Date();
		var age = nowDateTime.getFullYear() - birthDate.getFullYear();
		//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
		if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime
				.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	},


}

export {
	validate
}
