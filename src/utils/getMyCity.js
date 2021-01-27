import { getCityInfo } from './api/cityList'
let BMapGL = window.BMapGL

export let getMyCity = () => {
        const myCity = sessionStorage.getItem('myCity')

        if(myCity){
            return JSON.parse(myCity)
        }else{
            return new Promise((resolve, reject) => {
                var my_city = new BMapGL.LocalCity();
                my_city.get(async (result) => {
                    var name = result.name.substring(0, result.name.length - 1)
                    let res = await getCityInfo({name})
                    sessionStorage.setItem('myCity', JSON.stringify(res.data.body))
                    resolve(res.data.body)
                })
            })
        }
    }