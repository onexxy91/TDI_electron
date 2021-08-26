import axios from 'axios'
import { GET_CLIENT_DATA } from '../reducers/initialData';

//param 값들 config 값으로 대체 해야함 
const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;
const IS_DEV = process.env.REACT_APP_ISDEV;
const PROXY = process.env.REACT_APP_PROXY;

let getAgeCode, getEduCode,
 getSalCode, getCrrCode, getGndrCode,
 getjobKoRegion, getJobKoreaCode,
 getWorknetRegion, getWorknetCode,
 getUnivFile, getWeather,
 getPlacard;

if (IS_DEV === "true") {
    getAgeCode =  () =>  axios.get('/api/codeList.api?comm_cd=AGE001');   
    getEduCode =  () => axios.get('/api/codeList.api?comm_cd=EDU001');
    getSalCode = () => axios.get('/api/codeList.api?comm_cd=SAL001');
    getGndrCode = () => axios.get('/api/codeList.api?comm_cd=GNDR01');
    getCrrCode = () => axios.get('/api/codeList.api?comm_cd=CRR001');
    getjobKoRegion = () => axios.get('/api/codeList.api?comm_cd=WRK002');
    getJobKoreaCode = () => axios.get('/api/codeList.api?comm_cd=JBKR_J');
    getWorknetRegion = () => axios.get('/api/codeList.api?comm_cd=BSRGN1');
    getWorknetCode = () => axios.get('/api/codeList.api?comm_cd=WRKJOB');
    getUnivFile = () => axios.get(`/api/universalFiles.api?group_id=${ADMIN_ID}`);
    getWeather = () => axios.get(`/api/getTodayWeather.api?group_id=${ADMIN_ID}&admin_id=${ADMIN_ID}`);
    getPlacard = () => axios.get(`/api/univPlacardMedia.api?group_id=${ADMIN_ID}&path=DID&pl_pos=MAIN&admin_id=${ADMIN_ID}`);
}else {
    getAgeCode =  () =>  axios.get(`${PROXY}/api/codeList.api?comm_cd=AGE001`);   
    getEduCode =  () => axios.get(`${PROXY}/api/codeList.api?comm_cd=EDU001`);
    getSalCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=SAL001`);
    getGndrCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=GNDR01`);
    getCrrCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=CRR001`);
    getjobKoRegion = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=WRK002`);
    getJobKoreaCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=JBKR_J`);
    getWorknetRegion = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=BSRGN1`);
    getWorknetCode = () => axios.get(`${PROXY}/api/codeList.api?comm_cd=WRKJOB`);
    getUnivFile = () => axios.get(`${PROXY}/api/universalFiles.api?group_id=${ADMIN_ID}`);
    getWeather = () => axios.get(`${PROXY}/api/getTodayWeather.api?group_id=${ADMIN_ID}&admin_id=${ADMIN_ID}`);
    getPlacard = () => axios.get(`${PROXY}/api/univPlacardMedia.api?group_id=${ADMIN_ID}&path=DID&pl_pos=MAIN&admin_id=${ADMIN_ID}`);
}

export const getData = async () => {
    const  [ageCode, eduCode, salCode, gndrCode, 
        crrCode, jobKoCode, univFile, weather, placard, regionCode, worknetRegion, worknetCode] = await axios.all([
        getAgeCode()
      , getEduCode()
      , getSalCode()
      , getGndrCode()
      , getCrrCode()
      , getJobKoreaCode()
      , getUnivFile()
      , getWeather()
      , getPlacard()
      , getjobKoRegion()
      , getWorknetRegion()
      , getWorknetCode() ]);
        console.log(jobKoCode);
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
            worknetCode: worknetCode.data.result
        }
        
        return {
            type: GET_CLIENT_DATA,
            payload: data
        }
}
