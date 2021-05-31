<template>
	<view>
		<view class="pick_header">
			<text class="btnText left" @click="cancelAction">取消</text>
			<text class="title">{{title}}</text>
			<text class="btnText right" @click="sureAction">确定</text>
		</view>
		
		<picker-view @change="pickerChange">
			<picker-view-column v-for="(item, index) in row" :key="index">
			    <view class="item" v-for="(childItem,childIndex) in item" :key="childIndex">{{childItem}}</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	
	export default{
		data(){
			return {
				selectValue:[0],
			}
		},
		props:{
			title:String,
			row:null,//数组嵌套数组
			value: null
		},
		methods:{
			pickerChange(e){
				console.log(e.detail.value);
				this.selectValue = e.detail.value;
			},
			sureAction(i){
				this.$emit("input",this.selectValue);
				this.$emit("change",this.selectValue);
			},
			cancelAction(){
				this.$emit("input",'cancel');
				uni.$emit(this.$HLConstant.notificationKey.closePop);
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
			text-align: center;
		}
	}
	
	.item{
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
	}
	
</style>
