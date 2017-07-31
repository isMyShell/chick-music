<template lang="html">
  <div class="">
  	歌手
  </div>
</template>

<script>
import {getSingerList} from 'api/singer.js'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
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
  methods:{
    _getSingeList(){
      getSingerList().then((res) => {
        if(res.code === ERR_OK){
          this.singers = res.data.list
          // console.log(this.singers);

          console.log(this._normalizeSinger(this.singers));
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
      console.log(hot.concat(ret)[0].items);
      return hot.concat(ret)
    }
  }
}
</script>

<style lang="stylus">
</style>
