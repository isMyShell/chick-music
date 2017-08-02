import * as type from './mutation-types.js'
//同步
const mutations = {
	[type.SET_SINGER](state, singer){
		state.singer = singer
	}
}

export default mutations
