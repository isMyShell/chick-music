<template lang="html">
  <div class="singer">
  	<list-view @select='selectSinger' :data='singers' ></list-view>
    <router-view></router-view>
  </div>
</template>

<script >
import ListView from 'base/listview/listview'
import {getSingerList} from 'api/singer.js'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer.js'
import {mapMutations} from 'vuex'

let HOT_NAME = '热门'
let HOT_SINGER_LEN = 10
export default {
  data(){
    return{
      singers:[]
    }
  },
  created(){
    this._getSingeList()
  },
  components:{
    ListView
  },
  methods:{
    selectSinger(singer){
      this.$router.push({
        path:`/singer/${singer.Fsinger_mid}`
      })
      this.setSinger(singer)
    },
    _getSingeList(){
      getSingerList().then((res) => {
        if(res.code === ERR_OK){
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list){
      let obj = {
        hot:{
          title:HOT_NAME,
          items:[]
        }
      }

      list.forEach((item, index) => {
        if(index < HOT_SINGER_LEN){
          obj.hot.items.push(new Singer({
            id:item.Fsinger_id,
            name:item.Fsinger_name,
            mid:item.Fsinger_mid
          }))
        }
        let key = item.Findex
        if(!obj[key]){
          obj[key] = {
            title:key,
            items:[]
          }
        }
        obj[key].items.push(new Singer({
          id:item.Fsinger_id,
          name:item.Fsinger_name,
          mid:item.Fsinger_mid
        }))
      })
      // 为了得到有序列表，我们需要处理 obj
      let hot = []
      let ret = []
      for(let key in obj){
        let val = obj[key]
        if(val.title.match(/[a-zA-Z]/)){
          ret.push(val)
        }else if(val.title === HOT_NAME){
          hot.push(val)
        }
      }
      ret.sort((a,b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger : 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus">
.singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
