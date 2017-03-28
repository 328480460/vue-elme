<template>
	<div id="cartControl" name="cartControl">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart"></div>
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
	  			Vue.set(this.food, 'count', 1);
	  			this.food.count = 1;
	  		} else {
	  			this.food.count++;
	  		}
	  	},
	  	decreaseCart(event) {
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
			font-size: 24px;
			line-height: 24px;
			color: rgb(0, 160, 220)
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