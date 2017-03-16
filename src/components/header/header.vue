<template>
	<div class="v-header">
		<div class="avatar">
			<img :src="seller.avatar" width="64" height="64">
		</div>
		<div class="content">
			<div class="name">{{seller.name}}</div>
			<div class="description">{{seller.description}}/{{seller.deliveryTime}} 送达</div>
			<div class="supports">
				<span></span>
				<span>{{seller.supports[0].description}}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'v-header',
  props: ['seller']
};
</script>

<style lang="less" scoped>
	.v-header {
		font-size: 0;
		background: #000;
		padding: 24px 12px 4px 24px;
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
		.name {
			font-size: 16px;
			font-weight: bold;
			line-height: 18px;
		}
	}
</style>