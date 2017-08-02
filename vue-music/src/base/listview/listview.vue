<template>
	<scroll
		class="listview"
		:data='data'
		:scrollListener='scrollListener'
		:probeType='probeType'
		@scroll='scroll'
		ref='listview'>
		<ul>
			<li v-for='group in data' class="list-group" ref='listGroup'>
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li v-for='item in group.items' class="list-group-item" @click='toSingerDetail(item)'>
						<img class="avatar" v-lazy="item.img">
            <span class="name">{{item.Fsinger_name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart='shortCutScroll' @touchmove.stop.prevent='shortCutTouchMove'>
			<ul>
				<li class="item" :data-index='index' v-for='(item, index) in shortCutList'  :class="{'current':currentIndex===index}">{{item}}</li>
			</ul>
		</div>
		<div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
		<div v-show="!data.length" class="loading-container">
		 	<loading></loading>
	 	</div>
	</scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';
import {getDataAttribute} from 'common/js/dom.js';

let ANCHOR_HEIGHT = 18
let FIXTITLE_HEIGHT = 30

export default {
	data(){
		return{
			scrollY: -1,
			listHight:[],
			currentIndex:0,
			diff:-1
		}
	},
	created(){
		this.touch = {}
		this.scrollListener = true
		this.probeType = 3
	},
	props: {
    data: {
      type: Array,
      default: function(){
				return []
			}
    }
  },
	components:{
		Scroll,
		Loading
	},
	methods:{
		shortCutScroll(e){
			let anchorIndex = getDataAttribute(e.target, 'index')
			this.touch.anchorIndex = anchorIndex
			let firstTouch = e.touches[0]
			this.touch.y1 = firstTouch.pageY
			// console.log(this.touch.y1);
			this._scrollTo(anchorIndex)
		},
		shortCutTouchMove(e){
			let firstTouch = e.touches[0]
			this.touch.y2 = firstTouch.pageY

			let delat = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 //floor取整
			let anchorIndex = parseInt(this.touch.anchorIndex,10) + delat
			this._scrollTo(anchorIndex)

		},
		scroll(pos){
			 this.scrollY = pos.y
			//  console.log(this.scrollY);
		},
		toSingerDetail(item){
			this.$emit('select',item)
		},
		_scrollTo(index) {

			if(index === null){
				return
			}
			if(index<0){
				index = 0
			}else if(index>this.listHight.length-2){
				index = this.listHight.length-2
			}
			this.scrollY = -this.listHight[index]
			this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
		},
		_calculateHeight(){
			this.listHight = []
			let list = this.$refs.listGroup
			let height = 0
			this.listHight.push(height)
			for(let i=0; i<list.length; i++){
				let item = list[i]
				height += item.clientHeight
				this.listHight.push(height)
			}
			console.log(this.listHight);
		}

	},
	computed:{
		shortCutList(){
			return this.data.map((item, index) => {
				return item.title.substr(0,1)
			})
		},
		fixedTitle(){
			if(this.scrollY > 0){
				return ''
			}
			return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
		}
	},
	watch:{
		data(){
			setTimeout(() => {
				this._calculateHeight()
			},20)
		},
		scrollY(newVal){
			// console.log(newVal);
			let listHight = this.listHight
			for (var i = 0; i < listHight.length-1; i++) {
				let height1 = listHight[i]
				let height2 = listHight[i+1]
				if(-newVal>=height1 && -newVal<height2 ){
					this.currentIndex = i
					//diff 高度
					this.diff = height2 + newVal
					// console.log(this.currentIndex);
					return
				}else if(newVal>0){
					this.currentIndex = 0
					// console.log(this.currentIndex);
					return
				}else if(-newVal>height2){
					this.currentIndex = listHight.length - 2
				}
			}
		},
		diff(newVal){
			console.log(newVal);
			let fixedTop = (newVal<FIXTITLE_HEIGHT && newVal>0)?newVal-FIXTITLE_HEIGHT:0
			this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`

		}
	}
}
</script>

<style lang="stylus" >
	@import '../../common/stylus/variable.styl';

	.listview
	    position: relative
	    width: 100%
	    height: 100%
	    overflow: hidden
	    background: $color-background
	    .list-group
	      padding-bottom: 30px
	      .list-group-title
	        height: 30px
	        line-height: 30px
	        padding-left: 20px
	        font-size: $font-size-small
	        color: $color-text-l
	        background: $color-highlight-background
	      .list-group-item
	        display: flex
	        align-items: center
	        padding: 20px 0 0 30px
	        .avatar
	          width: 50px
	          height: 50px
	          border-radius: 50%
	        .name
	          margin-left: 20px
	          color: $color-text-l
	          font-size: $font-size-medium
	    .list-shortcut
	      position: absolute
	      z-index: 30
	      right: 0
	      top: 50%
	      transform: translateY(-50%)
	      width: 20px
	      padding: 20px 0
	      border-radius: 10px
	      text-align: center
	      background: $color-background-d
	      font-family: Helvetica
	      .item
	        padding: 3px
	        line-height: 1
	        color: $color-text-l
	        font-size: $font-size-small
	        &.current
	          color: $color-theme
	    .list-fixed
	      position: absolute
	      top: 0
	      left: 0
	      width: 100%
	      .fixed-title
	        height: 30px
	        line-height: 30px
	        padding-left: 20px
	        font-size: $font-size-small
	        color: $color-text-l
	        background: $color-highlight-background
	    .loading-container
	      position: absolute
	      width: 100%
	      top: 50%
	      transform: translateY(-50%)
</style>
