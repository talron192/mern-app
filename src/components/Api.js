import axios from 'axios'

export default class Api {

    getData() {
        return axios.get('http://localhost:4000/customers/get')
            .then(function (res) {
                console.log('getData', res.data);
                return res.data;

            }).catch(function (error) {
                console.log('error Api', error)
                return [] // Return empty array in case error response.
            });

    }
}

