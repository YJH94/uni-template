<template>
	<view>
		<view class="pick_header">
			<text class="btnText left" @click="cancelAction">取消</text>
			<text class="title">{{title}}</text>
			<text class="btnText right" @click="sureAction">确定</text>
		</view>
		
		
		<picker-view @change="dateTimePickerChange" :value="selectDateTime">
			<picker-view-column data-id='year'>
				<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
			</picker-view-column>
			<picker-view-column data-id='month'>
				<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			</picker-view-column>
			<picker-view-column data-id='day'>
				<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
			</picker-view-column>
			<picker-view-column v-if="isTime" data-id='hour'>
				<view class="item" v-for="(item,index) in hours" :key="index">{{item}}时</view>
			</picker-view-column>
			<picker-view-column v-if="isTime" data-id='minute'>
				<view class="item" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
			</picker-view-column>
		</picker-view>
		
		
	</view>
</template>

<script>
	
	export default{
		data(){
			return {
				selectValue:[0],
				years:[],
				months:[],
				days:[],
				hours:[],
				minutes:[],
				selectDateTime:[],//年月日数组
				maxDate:'',
			}
		},
		props:{
			title:String,
			value: String,//默认日期 格式 yyyy-MM-dd
			startYear:Number,
			endYear:Number,
			isTime:Boolean ,//时间选择
			masDateStr:String
		},
		created() {
			
			let nowDate = new Date();
			let year = nowDate.getFullYear();
			let month = nowDate.getMonth() + 1;
			let day = nowDate.getDate();
			
			let hour = nowDate.getHours();
			let minute = nowDate.getMinutes();
			
			this.years = this.initDateAry(!this.endYear ? year : this.endYear,!this.startYear ? 1937 : this.startYear);
			this.months = this.initDateAry(12);
			
			
			this.days = this.initDateAry(this.$DateUtils.getOneMonthDays(year,month));
			this.hours = this.initDateAry(23,0);
			this.minutes = this.initDateAry(59,0);
			if (this.masDateStr) {
				this.maxDate = this.$DateUtils.dateFromString(this.masDateStr);
				let maxY = this.maxDate.getFullYear();
				let maxM = this.maxDate.getMonth() + 1;
				let maxD = this.maxDate.getDate();
				this.years = this.initDateAry(maxY,this.startYear ? this.startYear : 1937);
				this.months = this.initDateAry(maxM);
				this.days = this.initDateAry(maxD);
				console.log(maxY,maxM,maxD);
				console.log('max');
			}
			
			if (this.value) {
				
				
				
				try{
					let ary = this.value.split(' ')[0].split('-');
					let defaultYear = ary[0];
					let defaultMon = ary[1];
					let defaultDay = ary[2];
					defaultYear = parseInt(defaultYear);
					defaultMon = this.getOriginDate(defaultMon);
					defaultDay = this.getOriginDate(defaultDay);
					
					
					setTimeout(()=>{//渲染完才生效
					    if (!this.isTime) {
					    	this.selectDateTime = [this.years.indexOf(defaultYear),defaultMon - 1,defaultDay -1];
					    }else{
							let timeAry = this.value.split(' ')[1].split(':');
							let hour = timeAry[0];
							let minute = timeAry[1];
							hour = this.getOriginDate(hour);
							minute = this.getOriginDate(minute);
							hour = parseInt(hour);
							minute = parseInt(minute);
							this.selectDateTime = [this.years.indexOf(defaultYear),defaultMon - 1,defaultDay -1,hour,minute];
						}
						
						
					},100)
				}catch(e){
					console.error('日期格式错误 正确格式 yyyy-MM-dd');
					//TODO handle the exception
				}
				
			}else{
				setTimeout(()=>{
					this.selectDateTime = [this.years.indexOf(year),month - 1,day-1,hour,minute];
					
				},100)
				
			}
		},
		
		methods:{
			sureAction(i){
				let year = this.years[this.selectDateTime[0]];
				let month = this.selectDateTime[1] + 1;
				let day = this.selectDateTime[2] + 1;
				
				month = this.fillDate(month);
				day = this.fillDate(day);
				if (!this.isTime) {
					this.$emit("input",`${year}-${month}-${day}`);
					this.$emit("change",`${year}-${month}-${day}`);
				}else{
					console.log(this.selectDateTime);
					let hour = this.selectDateTime[3];
					let minute = this.selectDateTime[4];
					hour = this.fillDate(hour);
					minute = this.fillDate(minute);
					this.$emit("input",`${year}-${month}-${day} ${hour}:${minute}`);
					this.$emit("change",`${year}-${month}-${day} ${hour}:${minute}`);
					console.log(`${year}-${month}-${day} ${hour}:${minute}`);
				}
				
			},
			cancelAction(){
				uni.$emit(this.$HLConstant.notificationKey.datePickerCancel);
				uni.$emit(this.$HLConstant.notificationKey.closePop);
			},
			dateTimePickerChange(e){
				let dateAry = e.detail.value;
				let oriYear = this.selectDateTime[0];
				let oriMon = this.selectDateTime[1];
				
				let year = dateAry[0];
				let month = dateAry[1];
				
				if (year == oriYear && oriMon == month) {//未改变年月
					
				}else{//改变对应日期数组
				    
					this.days = this.initDateAry(this.$DateUtils.getOneMonthDays(this.years[year],month + 1));
					if (this.maxDate) {
						let maxY = this.maxDate.getFullYear();
						let maxM = this.maxDate.getMonth() + 1;
						let maxD = this.maxDate.getDate();
						this.months = this.initDateAry(maxM);
						console.log(month);
						if (this.years[year] == maxY) {
							this.months = this.initDateAry(maxM);
							if (month == maxM - 1) {
								
								this.days = this.initDateAry(maxD);
							}
						}else{
							this.months = this.initDateAry(12);
						}
						
					}
				}
				
				this.selectDateTime = dateAry;
				
			},
			/**
			 * 获取日期数组
			 * end 截止数
			 */
			initDateAry(end, start = 1){
				let ary = [];
				
				for (var i = start; i <= end; i++) {
					ary.push(i);
				}
				return ary;
			},
			//不足10补0
			fillDate(date){
				if (date < 10) {
					return `0${date}`
				}
				return date;
			},
			//去0获取到原始日期
			getOriginDate(date){
				if (date < 10) {
					return date.slice(1,2);
				}
				return date;
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	
	picker-view {
	    width: 100%;
	    height: 500rpx;
		background-color: #FFFFFF;
	}
	
	.pick_header{
		display: flex;
		align-items: center;
		// justify-content: space-around;
		padding: 24rpx 0rpx;
		background-color: #FFFFFF;
		.btnText{
			font-size: 30rpx;
			color: #333333;
		}
		.left{
			margin-left: 32rpx;
			color: $uni-text-color-placeholder;
		}
		.right{
			margin-right: 32rpx;
			color: $uni-color-primary;
		}
		.title{
			color: #333333;
			font-size: 30rpx;
			flex: 1;
			font-weight: 500;
			text-align: center;
		}
	}
	
	.item{
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
	}
	
</style>
