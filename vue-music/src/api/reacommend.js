import jsonp from '../common/js/jsonp.js'
import {commonParams, options} from './config'
import axios from 'axios';

export function getReacommend(){
		const url = '/api/FlexSlider'

		const data = Object.assign({},commonParams,{
			platform: 'h5',
			uin : 0,
			needNewCode : 1
		})

		return axios.get(url,{
			param:data
		}).then((res) => {
			return Promise.resolve(res.data)
		})

}
