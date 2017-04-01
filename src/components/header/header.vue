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
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class='classMap[seller.supports[0].type]'></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" @click="showDetail" class="support-cont">
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
		<transition name="fade">	
			<div v-show="datailShow"  class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="item in seller.supports">

								<span class="icon" :class="classMap[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click="datailShow = false"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import star from '../../components/star/star';

export default {
  name: 'v-header',
  props: {
  	seller: {
  		type: Object
  	}
  },
  data: function() {
    return {
      datailShow: false
    };
  },
  methods: {
    showDetail() {
     	this.datailShow = true;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
  	star
  }
};
</script>

<style lang="less" scoped>
	@import '../../common/styles/mixin.less';
	@import '../../common/styles/base.less';
	.v-header {
		overflow: hidden;
	}
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
	.detail {
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		overflow: auto;
		background: rgba(7, 17, 27, 0.7);
		&.fade-enter {
			opacity: 0;
			background: rgba(7, 17, 27, 0.7);
		}
		&.fade-enter-active {
			transition: all .3s linear;
		}

		&.fade-leave-active {
			transition: all .3s linear;
			opacity: 0;
			background: rgba(7, 17, 27, 0);
		}
		.detail-wrapper {
			width: 100%;
			min-height: 100%;
			.detail-main {
				margin-top: 64px;
				padding-bottom: 64px;
				.name {
					line-height: 16px;
					text-align: center;
					font-size: 16px;
					font-weight: 700;
					color: #fff;
				}
				.star-wrapper {
					margin-top: 18px;
					padding: 2px 0;
					text-align: center;
				}
				.title {
					display: flex;
					width: 80%;
					margin: 30px auto 24px auto;
					.line {
						flex: 1;
						position: relative;
						top: -6px;
						border-bottom: 1px solid rgba(255, 255, 255, 0.2);
					}
					.text {
						padding: 0 12px;
						font-size: 14px;
						color: #fff;
						font-weight: 700;
					}
				}
				.supports {
					width: 80%;
					margin: 0 auto;
					.support-item {
						padding: 0 12px;
						margin-bottom: 12px;
						font-size: 0;
						&:last-child {
							margin-bottom: 0;
						}
						.icon {
							display: inline-block;
							width: 16px;
							height: 16px;
							vertical-align: top;
							margin-right: 6px;
							background-size: 16px;
							background-repeat: no-repeat;
							&.decrease {
								.bg-image(decrease_2);
							}
							&.discount {
								.bg-image(discount_2);
							}
							&.guarantee {
								.bg-image(guarantee_2);
							}
							&.invoice {
								.bg-image(invoice_2);
							}
							&.special {
								.bg-image(special_2);
							}

						}
						.text {
							line-height: 16px;
							font-size: 12px;
							color: #fff;
						}
					}
				}
				.bulletin {
					width: 80%;
					margin: 0 auto;
					.content {
						padding: 0 12px;
						line-height: 24px;
						font-size: 12px;
					}
				}
			}
		}
		.detail-close {
			position: relative;
			width: 32px;
			height: 32px;
			margin: -64px auto 0 auto;
			clear: both;
			font-size: 32px;
			color: #fff;
		}
	}
</style>