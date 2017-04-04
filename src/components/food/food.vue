<template>
	<transition name="move">
		<div class="food move-transition" v-show="showFlag" name="food" ref="food">
			<div class="food-content">
				<div class="img-header">
					<img :src="food.image">
					<div class="back" @click="hide">
						<i class="icon-arrow_left"></i>
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
				</div>
				<div class="cartcontrol-wrapper">
					<!--  购物车组件 -->
					<CartControl :food="food"></CartControl>
				</div>
				<transition name="fade">
					<div class="buy fade-transition" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
				</transition>
			</div>
		</div>
	</transition>
</template>

<script>
import BScroll from 'better-scroll';
import CartControl from '../cartcontrol/cartcontrol';
import Vue from 'vue';
export default {
  name: 'food',
  props: {
  	food: {
  		type: Object
  	},
  	showFlag: false
  },
  methods: {
  	hide() {
  		this.$emit('foodDetailHide');
  	},
  	addFirst(event) {
  		if (event._contructed) {
  			return;
  		}
  		Vue.set(this.food, 'count', 1);
  	}
  },
  watch: {
  	showFlag() {
  		if (this.showFlag) {
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
  	CartControl
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
				background: #fff;
			}
			.icon-arrow_left {
				display: block;
				padding: 10px;
				font-size: 20px;
				color: #fff;
			}

		}
		.content {
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
</style>