<template>
	<div class="v-header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}} 送达</div>
				<div class="supports">
					<span class="icon" :class='classMap[seller.supports[0].type]'></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-cont">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width='100%' height="100%">	
		</div>
	</div>
</template>

<script>
export default {
  name: 'v-header',
  props: ['seller'],
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style lang="less" scoped>
	@import '../../common/styles/mixin.less';
	@import '../../common/styles/base.less';

	.content-wrapper {
		font-size: 0;
		padding: 24px 12px 4px 24px;
		position: relative;
	}
	.avatar {
		display: inline-block;
		vertical-align: top;
		img {
			border-radius: 2px;
		}
	}
	.content {
		display: inline-block;
		color: #fff;
		font-size: 14px;
		margin-left: 16px;
		.title {
			margin: 2px 0 8px 0;
			.brand {
				width: 30px;
				height: 18px;
				display: inline-block;
				.bg-image(brand);
				background-size: 30px 18px;
				background-repeat: no-repeat;
				vertical-align: top;
			}
			.name {
				margin-left: 6px;
				font-size: 16px;
				line-height: 18px;
				font-weight: bold;
			}
		}
		.description {
			margin-bottom: 10px;
			line-height: 12px;
			font-size: 12px;
		}
		.supports {
			.icon {
				display: inline-block;
				height: 12px;
				width: 12px;
				margin-right: 4px;
				background-size: 12px;
				background-repeat: no-repeat;
				&.decrease {
					.bg-image(decrease_1);
				}
				&.discount {
					.bg-image(discount_1);
				}
				&.guarantee {
					.bg-image(guarantee_1);
				}
				&.invoice {
					.bg-image(invoice_1);
				}
				&.special {
					.bg-image(special_1);
				}
				
			}
			.text {
				font-size: 10px;
				line-height: 12px;
				vertical-align: top;
			}
		}
	}
	.support-cont {
		position: absolute;
		right: 12px;
		bottom: 14px;
		padding: 0 8px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background: rgba(0,0,0,.2);
		text-align: center;
		color: #fff;
		.count {
			font-size: 10px;
			vertical-align: top;
		}
		.icon-keyboard_arrow_right {
			font-size: 10px;
			line-height: 24px;
			margin-left: 2px;
		}
	}
	.bulletin-wrapper {
		background-color: rgba(0,0,0,.3);
		margin-top: 6px;
		color: #fff;
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		.bulletin-title {
			display: inline-block;
			width: 22px;
			height: 12px;
			.bg-image(bulletin);
			background-size: 22px 12px;
			background-repeat: no-repeat;
			vertical-align: middle;
		}
		.bulletin-text {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 10px;
			width: 88%;
			display: inline-block;
			margin: 0 0 0 4px;
			vertical-align: middle;
		}
		.icon-keyboard_arrow_right {
			vertical-align: middle;
		}
	}
	.background {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 126px;
		width: 100%;
		z-index: -1; 
		filter: blur(10px); 
	}
</style>