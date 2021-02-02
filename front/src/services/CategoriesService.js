import axios from 'axios'

const CAT_REST_API_URL = 'http://localhost:8080/api/categories';

class CategoriesService {

    getCategories(){
        return axios.get(CAT_REST_API_URL);
    }
    addNewCategory(data){
        return axios.post(CAT_REST_API_URL+"/new", data);
    }

    editCategory(id, data){
        return axios.post(CAT_REST_API_URL+"/edit/"+id, data);
    }
    
    deleteCategories(id){
        return axios.post(CAT_REST_API_URL+"/delete/"+id);
    }
}

export default new CategoriesService();