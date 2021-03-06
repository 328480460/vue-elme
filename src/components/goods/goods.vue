<template>
	<div class="v-goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{current:currentIndex == index}" @click="selectMenu(index,$event)">
 					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
							<div class="icon">
								<img :src="food.icon" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
								</div>
								<div class="control-wrapper">
									<CartControl :food="food"></CartControl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 购物车组件 -->
		<ShopCart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></ShopCart>
		<!-- food详情页组件 -->
		<food :food="selectedFood" :showFlag="showFoodDetailFlag" @foodDetailHide="foodDetailHide"></food>
	</div>
	
</template>

<script>
import BScroll from 'better-scroll';
import ShopCart from '../shopcart/shopcart';
import CartControl from '../cartcontrol/cartcontrol';
import Food from '../food/food';

let ERR_OK = 0;
export default {
  name: 'v-goods',
  props: {
  	seller: {
  		type: Object
  	}
  },
  created() {
  	this.$ajax.get('api/goods').then((res) => {
  		if (res.data.errno === ERR_OK) {
  			this.goods = res.data.data;
  			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  			// DOM 更新了 操作dom时一定要在$nextTick里
		  	this.$nextTick(() => {
		  		this._initScroll();
		  		this._calculateHeight();
		  	});
  		}
  	});
  },
  data() {
  	return {
  		goods: [],		// 所有的food信息
  		listHeight: [],	// 存放右侧food的每个li的高度数组
  		scrollY: 0,		// 右侧实时滚动Y的值
  		selectedFood: {},	// 选中的food
  		showFoodDetailFlag: false	// food详情页显示标示
  	};
  },
  computed: {
  	currentIndex() {
  		for (var i = 0; i < this.listHeight.length; i++) {
  			let height1 = this.listHeight[i];
  			let height2 = this.listHeight[i + 1];
  			if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
  				return i;
  			}
  		}
  		return 0;
  	},
  	selectFoods() {
  		let foods = [];
  		this.goods.forEach((good) => {
  			good.foods.forEach((food) => {
  				if (food.count) {
  					foods.push(food);
  				}
  			});
  		});
  		return foods;
  	}
  },
  methods: {
  	_initScroll() {
  		this.meunScroll = new BScroll(this.$refs.menuWrapper, {
  			click: true
  		});
  		this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
  			probeType: 3,
  			click: true
  		});

  		this.foodsScroll.on('scroll', (pos) => {
  			this.scrollY = Math.abs(Math.round(pos.y));
  		});
  	},
  	_calculateHeight() {
  		let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
  		let height = 0;
  		this.listHeight.push(height);
  		for (var i = 0; i < foodList.length; i++) {
  			let item = foodList[i];
  			height += item.clientHeight;
  			this.listHeight.push(height);
  		}
  	},
  	selectMenu(index, event) {
  		if (!event._constructed) {
  			return;
  		}
  		let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
  		let el = foodList[index];
  		this.foodsScroll.scrollToElement(el, 300);
  		console.log(index);
  	},
  	selectFood(food, event) {
  		if (!event._constructed) {
  			return;
  		}
  		console.log(food);
  		this.selectedFood = food;
  		this.showFoodDetailFlag = true;
  	},
  	foodDetailHide() {
  		this.showFoodDetailFlag = false;
  	}
  },
  components: {
  	ShopCart,
  	CartControl,
  	Food
  }
};
</script>

<style lang="less" scoped>
	@import '../../common/styles/mixin.less';

	.v-goods {
		position: absolute;
		width: 100%;
		top: 174px;
		bottom: 46px;
		display: flex;
		overflow: hidden;
		.menu-wrapper {
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menu-item {
				display: table;
				height: 54px;
				width: 56px;
				line-height: 14px;
				padding: 0 12px;
				&.current {
					position: relative;
					margin-top: -1px;
					z-index: 10;
					background: #fff;
					font-weight: 700;
					.text {
						.border-none();
					}
				}
				.icon {
					display: inline-block;
					height: 12px;
					width: 12px;
					margin-right: 2px;
					background-size: 12px;
					background-repeat: no-repeat;
					&.decrease {
						.bg-image(decrease_3);
					}
					&.discount {
						.bg-image(discount_3);
					}
					&.guarantee {
						.bg-image(guarantee_3);
					}
					&.invoice {
						.bg-image(invoice_3);
					}
					&.special {
						.bg-image(special_3);
					}
				}
				.text {
					display: table-cell;;
					width: 56px;
					vertical-align: middle;
					.border-1px(rgba(7,17,27,0.1));
					font-size: 12px;

				}
			}
		}
		.foods-wrapper {
			flex: 1;
			.title {
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147,153,159);
				background: #f3f5f7;
			}
			.food-item {
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				.border-1px(rgba(7,17,27,0.1));
				&:last-child {
					.border-none();
					margin-bottom: 0;
				}
				.icon {
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content {
					flex :1;
					.name {
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7, 17, 27);
					}
					.desc {
						margin-bottom: 8px;
						font-size: 10px;
						color: rgb(147, 153,159);	
						line-height: 12px;	
					}
					.extra {
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153,159);	
						&.count {
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
					.control-wrapper {
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}
</style>
