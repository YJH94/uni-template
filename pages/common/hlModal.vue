<template>
	<view class="_showModal" v-show="show">
		<view class="_shade"></view>
		<view class="_modalBox" @click.stop="closeModal" @touchmove.stop.prevent="">
			<view class="_modal" @click.stop="">
				<slot name="title">
					<view class="title" v-show="title">{{title}}</view>
				</slot>
				<slot name="content">
					<div class="content" v-show="content">
						{{content}}
					</div>
				</slot>
				<slot name="btn">
					<view class="btnbox">
						<view class="cancel btn" v-show="showCancel" :style="cancelColor" @click.stop="cancelAction">{{cancelText}}</view>
						<view class="confirm btn" :style="confirmColor" @click.stop="okAction">
							{{confirmText}}
						</view>
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	
export default {
	computed: {
		show(){
			return this.$modalStore.state.show;
		},
		mask(){
			return this.$modalStore.state.mask;
		},
		title(){
			return this.$modalStore.state.title;
		},
		content(){
			return this.$modalStore.state.content;
		},
		showCancel(){
			return this.$modalStore.state.showCancel;
		},
		cancelText(){
			return this.$modalStore.state.cancelText;
		},
		cancelColor(){
			return "color:"+this.$modalStore.state.cancelColor;
		},
		confirmText(){
			return this.$modalStore.state.confirmText;
		},
		confirmColor(){
			return "color:"+this.$modalStore.state.confirmColor;
		}
	},
	methods:{
		closeModal(){
			if (!this.mask) {
				this.$modalStore.commit('hideModal')
			}
		},
		clickBtn(res){
			this.$modalStore.commit('hideModal')
			this.$modalStore.commit('success',res)
		},
		okAction(){
			this.$modalStore.commit('hideModal');
			this.$modalStore.commit('okAction');
		},
		cancelAction(){
			this.$modalStore.commit('hideModal');
			this.$modalStore.commit('cancelAction');
		}
	},
	beforeDestroy(){
		this.$modalStore.commit('hideModal')
	}
};
</script>

<style lang="scss" scoped>
	._showModal{
		position: fixed;
		top: 0;
		left:0;
		width: 100vw;
		height: 100vh;
		z-index:10000;
		._shade{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: rgba($color: #000000, $alpha: .5);
			z-index:11000;
		}
		._modalBox{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index:12000;
			display: flex;
			justify-content: center;
			align-items: center;
			._modal{
				// flex: none;
				width:70%;
				background: #fff;
				border-radius: 12rpx;
				// min-height: 320rpx;
				padding: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.title{
					text-align: center;
					font-size: 40rpx;
					padding: 36rpx 0;
					color: #333333;
				}
				.content{
					padding-bottom: 50rpx;
					font-size: 28rpx;
					color: #999;
					// line-height: 35rpx;
					text-align: center;
				}
				.btnbox{
					display: flex;
					justify-content: space-around;
					.btn{
						font-size: 32rpx;
						text-align: center;
						height: 70rpx;
						line-height: 70rpx;
						// flex: auto;
						// line-height: 80rpx;
						// border-top: 1rpx solid #e1e1e1;
						// border-right: 1rpx solid #e1e1e1;
					}
					.cancel{
						color: #666666;
						padding: 0rpx 60rpx;
					}
					.confirm{
						padding: 0rpx 60rpx;
						background-color: #FF6688;
						border-radius: 50rpx;
						color: #FFFFFF;
					}
				}
			}
		}
		
	}
</style>
