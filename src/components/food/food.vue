<template>
	<transition name="move">
		<div class="food move-transition" v-show="showFlag" name="food" ref="food">
			<div class="food-content">
				<div class="img-header">
					<img :src="food.image">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<!--  购物车组件 -->
						<CartControl :food="food"></CartControl>
					</div>
					<transition name="fade">
						<div class="buy fade-transition" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
					</transition>
				</div>
				<Split v-show="food.info"></Split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text" >{{food.info}}</p>
				</div>
				<Split></Split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<RatingSelect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @ratingtypeSelect ="ratingtypeSelect" @contentToggle="contentToggle"></RatingSelect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" class="avatar" height="14" width="14">
								</div>
								<div class="time">{{rating.rateTime}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1,}"></span>{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import BScroll from 'better-scroll';
import CartControl from '../cartcontrol/cartcontrol';
import Split from '../split/split';
import RatingSelect from '../ratingSelect/ratingSelect';

import Vue from 'vue';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: 'food',
  props: {
  	food: {
  		type: Object
  	},
  	showFlag: false
  },
  data() {
  	return {
  		selectType: ALL,
  		onlyContent: true,
  		desc: {
  			all: '全部',
            positive: '推荐',
            negative: '吐槽'
  		}
  	};
  },
  methods: {
  	hide() {
  		this.$emit('foodDetailHide');
  	},
  	addFirst(event) {
  		console.log(this.food);
  		if (event._contructed) {
  			return;
  		}
  		Vue.set(this.food, 'count', 1);
  	},
  	needShow(type, text) {
  		if (this.onlyContent && !text) {
  			return false;
  		}
  		if (this.selectType === ALL) {
  			return true;
  		} else {
  			return type === this.selectType;
  		}
  	},
  	ratingtypeSelect(type) {
  		this.selectType = type;
  		this.$nextTick(() => {
  			this.scroll.refresh();
  		});
  	},
  	contentToggle(onlyContent) {
  		this.onlyContent = onlyContent;
  		this.$nextTick(() => {
  			this.scroll.refresh();
  		});
  	}
  },
  // 监听food页面是否显示
  watch: {
  	showFlag() {
  		if (this.showFlag) {
  			// 初始化ratingselect
  			this.selectType = ALL;
	  		this.onlyContent = true;
  			this.$nextTick(() => {
  				if (!this.scroll) {
  					this.scroll = new BScroll(this.$refs.food, {
  						click: true
  					});
  				} else {
  					this.scroll.refresh();
  				}
  			});
  		}
  	}
  },
  components: {
  	CartControl,
  	Split,
  	RatingSelect
  }
};
</script>

<style lang="less" scoped>
	@import '../../common/styles/mixin.less';
	@import '../../common/styles/base.less';
	.food {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #fff;
		&.move-transition {
			transition: all 0.2s linear;
			transform: translate3d(0,0,0);
		}
		&.move-enter,&.move-leave-active {
			transform: translate3d(100%,0,0);
		}
		.img-header {
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 100%;
			img {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
			}
			.back {
				position: absolute;
				top: 10px;
				left: 0;
			}
			.icon-arrow_lift {
				display: block;
				padding: 10px;
				font-size: 20px;
				color: #fff;
			}

		}
		.content {
			position: relative;
			padding: 18px;
			.title {
				line-height: 14px;
				margin-bottom: 8px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(7,17,27);
			}
			.detail {
				margin-bottom: 18px;
				line-height: 10px;
				font-size: 0;
				height: 10px;
				.sell-count,.rating {
					font-size: 10px;
					color: rgb(147, 153, 159);
				}
				.sell-count {
					margin-right: 12px;
				}
			}
			.price {
				font-weight: 700;
				line-height: 24px;
				.now {
					margin-right: 8px;
					font-size: 14px;
					color: rgb(240, 20, 20);
				}
				.old {
					text-decoration: line-through;
					font-size: 10px;
					color: rgb(147, 153,159);
				}
			}
		
			.cartcontrol-wrapper {
				position: absolute;
				right: 12px;
				bottom: 12px;
			}
			.buy {
				position: absolute;
				right: 18px;
				bottom: 18px;
				z-index: 10;
				height: 24px;
				line-height: 24px;
				padding: 0 12px;
				box-sizing: border-box;
				font-size: 10px;
				border-radius: 12px;
				color: #fff;
				background: rgb(0, 160, 220);
				&.fade-transition {
					opacity: 1;
				}
				&.fade-enter{
					opacity: 0;
				}
				&.fade-enter-active  {
					transition: all 2s;
				}
				&.fade-leave {
					opacity: 1;
				}
				&.fade-leave-active  {
					transition: all 2s;
					opacity: 0;
				}
			}
		}
		.info {
			padding: 18px;
			.title {
				line-height: 14px;
				margin-bottom: 6px;
				font-size: 14px;
				color: rgb(7, 17, 27);
			}
			.text {
				color: rgb(77, 85, 93);
				font-size: 12px;
				line-height: 24px;
				padding: 0 8px;
			}
		}
		.rating {
			padding-top: 18px;
			.title{
				line-height: 14px;
				margin-left: 18px;
				font-size: 12px;
				color: rgb(7, 17, 27);
			}
			.rating-wrapper {
				padding: 0 18px;
				.rating-item {
					position: relative;
					padding: 16px 0;
					.border-1px(rgba(7,17,27,.1));
					.user {
						position: absolute;
						right: 0;
						top: 16px;
						line-height: 12px;
						font-size: 12px;
						.name {
							display: inline-block;
							vertical-align: top;
							margin-right: 6px;
							font-size: 10px;
							color: rgb(147, 153, 159);
						}
						.avatar {
							border-radius: 50%;
						}
					}
					.time {
						margin-bottom: 6px;
						line-height: 12px;
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
					.text {
						line-height: 16px;
						font-size: 12px;
						color: rgb(7, 17, 27);
						.icon-thumb_down,.icon-thumb_up {
							display: inline-block;
							margin-right: 4px;
							line-height: 24px;
							font-size: 12px;
						}
						.icon-thumb_up {
							color: rgb(0, 160, 220);
						}
						.icon-thumb_down {
							color: rgb(147, 153, 159);
						}
					}
				}
				.no-rating {
					padding: 16px 0;
					font-size: 12px;
					color: rgb(147, 153, 159);
				}
			}
			
		}

	}
</style>