<template lang="html">
	<div class="song-list">
    <ul>
      <li class="item" v-for="(song, index) in songs">
        <div class="content">
          <h2 class="name">{{song.musicData.songname}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	props: {
    songs: {
      type: Array,
      default: function(){
				return []
			}
    }
  },
	methods:{
		getDesc(song){
			return `${song.musicData.singer[0].name}·${song.musicData.albumname}`
		}
	}
}
</script>

<style scoped lang="stylus">
@import '../../common/stylus/variable.styl';
// @import '../../common/stylus/mixin.styl'

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>
