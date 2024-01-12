import {customerStore} from "../Redux/Stores/CustomerStore";
import axios from "axios";
import appConfig from "../Utils/AppConfig";
import {add, fill, remove, update} from "../Redux/CustomerSlice";
import Customer from "../Models/Customer";
import Coupon from "../Models/Coupon";

class CustomerService {

    public async addCustomer(customer:Customer){
        const response = (await axios.post(appConfig.url + "public/customer", customer)).data;
        customerStore.dispatch(add(response));
        return response;
    }

    public async purchaseCoupon(token:string, id:number){
        return (await axios.post(appConfig.url + "customer/purchase/" + id,null,{headers: {"Authorization": token}})).data
    }

    public async getCustomerCoupons(token:string){
        return (await axios.get<Coupon[]>(appConfig.url + "customer/coupons", {headers: {"Authorization": token}})).data
    }
}
const customerService = new CustomerService();
export default customerService;