<template lang="html">
	<div class="music-list">
    <div class="back" @click='back'>
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" ref="bgImage" :style='styleBg'>
			<div class="play-wrapper">
        <div ref="playBtn" v-show="songs.singer_name" class="play" @click='random'>
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
		<div class="bg-layer" ref='layer'>

		</div>
		<scroll :data="songs.list"
            :scroll-listener="scrollListener"
						:probe-type="probeType"
						@scroll='scroll'
						class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs.list" @select='selectItem'></song-list>
      </div>
			<div v-show="!songs.list" class="loading-container" >
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import Loading from 'base/loading/loading'
import {mapActions} from 'vuex'
import {prefixStyle} from 'common/js/dom.js';

const transform = prefixStyle('transform')
const RESERVED_HEIGHT = 40
export default {
	data(){
		return{
			scrollY:0
		}
	},
	props:['songs','title','headImg'],
	computed:{
		styleBg(){
			return `background-image:url(${this.headImg})`
		}
	},
	components:{
		Scroll,
		SongList,
		Loading
	},
	methods:{
		selectItem(item, index){
			console.log(item, index);
			this.selectPlay({
				list:this.songs.list,
				index:index
			})
		},
		random(){
			this.randomPlay({
				list:this.songs.list
			})
		},
		back(){
			this.$router.back()
		},
		scroll(pos){
			this.scrollY = pos.y
			console.log(pos.y);
		},
		...mapActions([
			'selectPlay',
			'randomPlay'
		])
	},
	watch:{
		scrollY(newY){
			let translateY = Math.max(this.minTransalteY, newY)
			let zIndex = 0
			let scale = 1
			const percent = Math.abs(newY / this.imageHeight)
			this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
			if (newY > 0) {
        scale = 1 + percent
				zIndex = 10
      }
			if (newY < this.minTransalteY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
				this.$refs.bgImage.style[transform] = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
		}
	},
	created(){
		this.scrollListener = true,
		this.probeType = 3,
		this.scrollListener = true
	},
	mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  }

}
</script>

<style lang="stylus" scoped>
	@import '../../common/stylus/variable.styl';
	@import "../../common/stylus/mixin"
	.music-list
	 position: fixed
	 z-index: 100
	 top: 0
	 left: 0
	 bottom: 0
	 right: 0
	 background: $color-background
	 .back
		 position absolute
		 top: 0
		 left: 6px
		 z-index: 50
		 .icon-back
			 display: block
			 padding: 10px
			 font-size: $font-size-large-x
			 color: $color-theme
	 .title
		 position: absolute
		 top: 0
		 left: 10%
		 z-index: 40
		 width: 80%
		 no-wrap()
		 text-align: center
		 line-height: 40px
		 font-size: $font-size-large
		 color: $color-text
	 .bg-image
		 position: relative
		 width: 100%
		 height: 0
		 padding-top: 70%
		 transform-origin: top
		 background-size: cover
		 .play-wrapper
			 position: absolute
			 bottom: 20px
			 z-index: 50
			 width: 100%
			 .play
				 box-sizing: border-box
				 width: 135px
				 padding: 7px 0
				 margin: 0 auto
				 text-align: center
				 border: 1px solid $color-theme
				 color: $color-theme
				 border-radius: 100px
				 font-size: 0
				 .icon-play
					 display: inline-block
					 vertical-align: middle
					 margin-right: 6px
					 font-size: $font-size-medium-x
				 .text
					 display: inline-block
					 vertical-align: middle
					 font-size: $font-size-small
		 .filter
			 position: absolute
			 top: 0
			 left: 0
			 width: 100%
			 height: 100%
			 background: rgba(7, 17, 27, 0.4)
	 .bg-layer
		 position: relative
		 height: 100%
		 background: $color-background
	 .list
		 position: fixed
		 top: 0
		 bottom: 0
		 width: 100%
		 background: $color-background
		 .song-list-wrapper
			 padding: 20px 30px
		 .loading-container
			 position: absolute
			 width: 100%
			 top: 50%
			 transform: translateY(-50%)
</style>
