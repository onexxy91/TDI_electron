import axios from 'axios'
import { GET_CLIENT_DATA } from '../reducers/initialData';

//param 값들 config 값으로 대체 해야함 
//const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;
// const city_name = process.env.REACT_APP_CITY_NAME;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

//let getAgeCode, getEduCode,
 //getSalCode, getCrrCode, getGndrCode,
 //getjobKoRegion, getJobKoreaCode,
 //getWorknetRegion, getWorknetCode,
 //getUnivFile, getWeather,
 //getPlacard, getWeather_api;

// getWeather_api = () => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`);

// if (IS_DEV === "true") {
//     getAgeCode =  () =>  axios.get('/api/codeList.api?comm_cd=AGE001');   
//     getEduCode =  () => axios.get('/api/codeList.api?comm_cd=EDU001');
//     getSalCode = () => axios.get('/api/codeList.api?comm_cd=SAL001');
//     getGndrCode = () => axios.get('/api/codeList.api?comm_cd=GNDR01');
//     getCrrCode = () => axios.get('/api/codeList.api?comm_cd=CRR001');
//     getjobKoRegion = () => axios.get('/api/codeList.api?comm_cd=WRK002');
//     getJobKoreaCode = () => axios.get('/api/codeList.api?comm_cd=JBKR_J');
//     getWorknetRegion = () => axios.get('/api/codeList.api?comm_cd=BSRGN1');
//     getWorknetCode = () => axios.get('/api/codeList.api?comm_cd=WRKJOB');
//     getUnivFile = () => axios.get(`/api/universalFiles.api?group_id=${ADMIN_ID}`);
//     getWeather = () => axios.get(`/api/getTodayWeather.api?group_id=${ADMIN_ID}&admin_id=${ADMIN_ID}`);
//     getPlacard = () => axios.get(`/api/univPlacardMedia.api?group_id=${ADMIN_ID}&path=DID&pl_pos=MAIN&admin_id=${ADMIN_ID}`);
// }else {
//     getAgeCode =  () =>  axios.get(`${PROXY}/api/codeList.api?comm_cd=AGE001`);   
//     getEduCode =  () => axios.get(`${PROXY}/api/codeList.api?comm_cd=EDU001`);
//     getSalCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=SAL001`);
//     getGndrCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=GNDR01`);
//     getCrrCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=CRR001`);
//     getjobKoRegion = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=WRK002`);
//     getJobKoreaCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=JBKR_J`);
//     getWorknetRegion = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=BSRGN1`);
//     getWorknetCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=WRKJOB`);
//     getUnivFile = () => axios.get(`${PROXY}/api/universalFiles.api?group_id=${ADMIN_ID}`);
//     getWeather = () => axios.get(`${PROXY}/api/getTodayWeather.api?group_id=${ADMIN_ID}&admin_id=${ADMIN_ID}`);
//     getPlacard = () => axios.get(`${PROXY}/api/univPlacardMedia.api?group_id=${ADMIN_ID}&path=DID&pl_pos=MAIN&admin_id=${ADMIN_ID}`);
// }

export const getData = async (config) => {
    //console.log(config);

    if (IS_DEV === "true") {
    const  [ageCode, eduCode, salCode, gndrCode, 
        crrCode, jobKoCode, univFile, weather, placard, regionCode, worknetRegion, worknetCode, newWeather] = await axios.all([
        axios.get('/api/codeList.api?comm_cd=AGE001') //나이코드  
      , axios.get('/api/codeList.api?comm_cd=EDU001')//학력
      , axios.get('/api/codeList.api?comm_cd=SAL001')//희망연봉
      , axios.get('/api/codeList.api?comm_cd=GNDR01')//성별
      , axios.get('/api/codeList.api?comm_cd=CRR001')//경력
      , axios.get('/api/codeList.api?comm_cd=JBKR_J')//잡코리아 직무
      , axios.get(`/api/universalFiles.api?group_id=${config.ADMIN_ID}`)
      , axios.get(`/api/getTodayWeather.api?group_id=${config.ADMIN_ID}&admin_id=${config.ADMIN_ID}`)
      , axios.get(`/api/univPlacardMedia.api?group_id=${config.ADMIN_ID}&path=DID&pl_pos=MAIN&admin_id=${config.ADMIN_ID}`)
      , axios.get('/api/codeList.api?comm_cd=WRK002')//잡코리아 지역코드
      , axios.get('/api/codeList.api?comm_cd=BSRGN1')//워크넷 지역코드
      , axios.get('/api/codeList.api?comm_cd=WRKJOB')//워크넷 직무
      , axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${config.CITY_NAME}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`) ]);
        
    //console.log("newWeather =" + JSON.stringify(newWeather.data));

        const data = {
            ageCode: ageCode.data.result,
            eduCode: eduCode.data.result,
            salCode: salCode.data.result,
            gndrCode: gndrCode.data.result,
            crrCode: crrCode.data.result, 
            jobCode: jobKoCode.data.result,
            univFile: univFile.data.result_obj,
            weather: weather.data.result,
            placard: placard.data.result,
            region: regionCode.data.result,
            worknetRegion: worknetRegion.data.result,
            worknetCode: worknetCode.data.result,
            newWeather: newWeather.data,
            config: config
        }
        
        return {
            type: GET_CLIENT_DATA,
            payload: data
        }
    }else {
        const  [ageCode, eduCode, salCode, gndrCode, 
            crrCode, jobKoCode, univFile, weather, placard, regionCode, worknetRegion, worknetCode, newWeather] = await axios.all([
            axios.get(`${PROXY}/api/codeList.api?comm_cd=AGE001`)
          , axios.get(`${PROXY}/api/codeList.api?comm_cd=EDU001`)
          , axios.get(`${PROXY}/api/codeList.api?comm_cd=SAL001`)
          , axios.get(`${PROXY}/api/codeList.api?comm_cd=GNDR01`)
          , axios.get(`${PROXY}/api/codeList.api?comm_cd=CRR001`)
          , axios.get(`${PROXY}/api/codeList.api?comm_cd=JBKR_J`)
          , axios.get(`${PROXY}/api/universalFiles.api?group_id=${config.ADMIN_ID}`)
          , axios.get(`${PROXY}/api/getTodayWeather.api?group_id=${config.ADMIN_ID}&admin_id=${config.ADMIN_ID}`)
          , axios.get(`${PROXY}/api/univPlacardMedia.api?group_id=${config.ADMIN_ID}&path=DID&pl_pos=MAIN&admin_id=${config.ADMIN_ID}`)
          , axios.get(`${PROXY}/api/codeList.api?comm_cd=WRK002`)
          , axios.get(`${PROXY}/api/codeList.api?comm_cd=BSRGN1`)
          , axios.get(`${PROXY}/api/codeList.api?comm_cd=WRKJOB`)
          , axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${config.CITY_NAME}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`) ]);
           
            console.log("univFile =" + JSON.stringify(univFile.data));

            const data = {
                ageCode: ageCode.data.result,
                eduCode: eduCode.data.result,
                salCode: salCode.data.result,
                gndrCode: gndrCode.data.result,
                crrCode: crrCode.data.result, 
                jobCode: jobKoCode.data.result,
                univFile: univFile.data.result_obj,
                weather: weather.data.result,
                placard: placard.data.result,
                region: regionCode.data.result,
                worknetRegion: worknetRegion.data.result,
                worknetCode: worknetCode.data.result,
                newWeather: newWeather.data,
                config: config
            }
            
            return {
                type: GET_CLIENT_DATA,
                payload: data
            }
    }
        
}
