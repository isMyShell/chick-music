<template lang="html">
  <div class="">
  	歌手
  </div>
</template>

<script>
import {getSingerList} from 'api/singer.js'
export default {
  data(){
    return{
      singers:[]
    }
  },
  created(){
    this._getSingeList()
    console.log(getSingerList);
  },
  methods:{
    _getSingeList(){
      getSingerList().then((res) => {
        this.singers = res.data.list
        console.log(this.singers);
      })

    }
  }
}
</script>

<style lang="stylus">
</style>
