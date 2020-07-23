import * as axios from "axios";
let instanse = axios.create({
    baseURL: 'https://yalantis-react-school-api.yalantis.com/api/',
})
export const usersAPI = {
    getUsersData(){
        return instanse.get(`task0/users`)
            .then(response => response.data);
    },
};