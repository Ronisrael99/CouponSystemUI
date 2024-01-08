import {customerStore} from "../Redux/Stores/CustomerStore";
import axios from "axios";
import appConfig from "../Utils/AppConfig";
import {add, fill, remove, update} from "../Redux/CustomerSlice";
import Customer from "../Models/Customer";

class CustomerService {

    public async getAllCustomers(){
        if (customerStore.getState().value.length == 0){
            const response = (await axios.get(appConfig.url + "admin/customers")).data
            customerStore.dispatch(fill(response));
            return response;
        } else {
            return customerStore.getState().value;
        }
    }

    public async getOneCustomer(id:number){
        if (customerStore.getState().value.length == 0){
            return (await axios.get(appConfig.url + "admin/customers/" + id)).data;
        } else {
            return customerStore.getState().value.find(c => c.id == id);
        }
    }

    public async addCustomer(customer:Customer){
        const response = (await axios.post(appConfig.url + "public/customer", customer)).data;
        customerStore.dispatch(add(response));
        return response;
    }

    public async updateCustomer(customer:Customer){
        const response = (await axios.post(appConfig.url + "admin/update/customer", customer)).data;
        customerStore.dispatch(update(response));
        return response;
    }

    public async deleteCustomer(id:number){
        customerStore.dispatch(remove(id));
        return (await axios.delete(appConfig.url + "admin/customer/" + id)).data
    }

}
const customerService = new CustomerService();
export default customerService;