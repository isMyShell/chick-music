<template lang="html">
	<transition name='slider'>
		<music-list :songs='songs' :title='title' :headImg='headImg'></music-list>
	</transition>
</template>

<script>
import {mapGetters} from 'vuex';
import {getSingerDetail} from 'api/singer.js';
import { ERR_OK } from 'api/config'
import MusicList from 'components/music-list/music-list'
export default {
	data(){
		return {
			songs:[]
		}
	},
	computed:{
		title(){
			return this.singer.Fsinger_name
		},
		headImg(){
			return this.singer.img
		},
		...mapGetters([
			'singer'
		])
	},
	components:{
		MusicList
	},
	created(){
		console.log(this.singer);
		this._getSingerDetail(this.singer.Fsinger_mid)
	},
	methods:{
		_getSingerDetail(mid){
			if(!mid){
				this.$router.push({path:'/singer'})
				return
			}
			getSingerDetail(mid).then((res) => {
				if(res.code === ERR_OK){
					this.songs = res.data
					console.log(this.songs);
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	@import '../../common/stylus/variable.styl';
	.singer-detail
		position:fixed
		left:0
		right:0
		top:0
		bottom:0
		z-index:100
		width:100%
		height:100%
		background:$color-background
	.slider-enter-active,.slider-leave-active
		transition:all 0.3s
	.slider-enter,.slider-leave-to
		transform:translate3d(100%, 0, 0)
</style>
