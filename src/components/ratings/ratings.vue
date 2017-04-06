<template>
	<div class="ratings" name="ratings">
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import star from '../star/star';

export default {
  name: 'ratings',
  props: {
  	seller: {
  		type: Object
  	}
  },
  components: {
  	star
  }
};
</script>

<style lang="less" scoped>
	.ratings {
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		.rating-content {
			.overview {
				display: flex;
				padding: 18px 0;
				.overview-left {
					padding: 6px 0;
					flex: 0 0 137px;
					width: 137px;
					border-right: 1px solid rgba(7, 17, 27, 0.1);
					text-align: center;
					.score {
						margin-bottom: 6px;
						line-height: 28px;
						font-size: 24px;
						color: rgb(255, 153, 0);
					}
					.title {
						line-height: 12px;
						font-size: 12px;
						color: rgb(7, 17, 27);
					}
					.rank {
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153, 159);
						margin-top: 8px;

					}
				}
				.overview-right {
					flex: 1;
					padding-left: 24px;
					.score-wrapper {
						margin-bottom: 8px;
						font-size: 0;
						.title {
							font-size: 12px;
							color: rgb(7, 17, 27);
							line-height: 18px;
						}
						.star {
							margin: 0 12px;
							display: inline-block;
							vertical-align: top;
							line-height: 18px;
						}
						.score {
							display: inline-block;
							vertical-align: top;
							font-size: 12px;
							color: rgb(255, 153, 0);
							line-height: 18px;
						}
					}
					.delivery-wrapper {
						font-size: 0;
						.title {
							font-size: 12px;
							color: rgb(7, 17, 27);
							line-height: 18px;
						}
						.delivery {
							font-size: 12px;
							color: rgb(147, 153, 159);
							margin-left: 12px;
						}
					}
				}
			}
		}
	}
</style>
