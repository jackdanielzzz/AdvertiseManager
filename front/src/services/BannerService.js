import axios from 'axios'

const BAN_REST_API_URL = 'http://localhost:8080/api/banners';

class BannerService {

    getBanners(){
        return axios.get(BAN_REST_API_URL);
    }
    addNewBanner(data){
        return axios.post(BAN_REST_API_URL+"/new", data);
    }

    editBanner(id, data){
        return axios.post(BAN_REST_API_URL+"/edit/"+id, data);
    }
    
    deleteBanners(id){
        return axios.post(BAN_REST_API_URL+"/delete/"+id);
    }
}

export default new BannerService();