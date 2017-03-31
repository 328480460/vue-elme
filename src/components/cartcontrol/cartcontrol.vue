<template>
	<div id="cartControl" name="cartControl">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count > 0 ">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
	  name: 'cartControl',
	  props: {
	  	food: {
	  		type: Object,
	  		count: 0
	  	}
	  },
	  methods: {
	  	addCart(event) {
	  		if (!event._constructed) {
	  			return;
	  		}
	  		if (!this.food.count) {
	  			// 添加food不存在的字段时 需要调用vue.set方法添加，这样才可以通过vue观测到这个字段的变化
	  			Vue.set(this.food, 'count', 1);
	  			this.food.count = 1;
	  		} else {
	  			this.food.count++;
	  		}
	  	},
	  	decreaseCart(event) {
	  		// 防止多次被点击
	  		if (!event._constructed) {
	  			return;
	  		}
	  		if (this.food.count > 0) {
	  			this.food.count--;
	  		}
	  	}
	  }
	};
</script>

<style lang="less" scoped>
	#cartControl {
		font-size: 0;
		.cart-decrease {
			display: inline-block;
			padding: 6px;
			.inner {
                display: inline-block;
                line-height: 24px;
                font-size: 24px;
                color: rgb(0, 160, 220);
            }
            &.move-enter-active {
                transition: all .5s;
                transform: translate3d(0, 0, 0);
                .inner{
                    transition: all .5s;
                    transform: rotate(0deg);
                }
            }
            &.move-enter {
                opacity: 0;
                transform: translate3d(24px, 0, 0);
                .inner{
                    transform: rotate(180deg);
                }
            }
             &.move-leave-active {
            	transition: all .5s;
            	opacity: 0;
                transform: translate3d(24px, 0, 0);
				.inner{
                    transition: all .5s;
                    transform: rotate(180deg);
                }
            }


		}
		.cart-count {
			display: inline-block;
			padding: 6px;
			font-size: 24px;
			line-height: 24px;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			font-size: 10px;
			color: rgb(147, 153, 159);
		}
		.cart-add {
			display: inline-block;
			padding: 6px;
			font-size: 24px;
			line-height: 24px;
			color: rgb(0, 160, 220)
		}
	}
</style>