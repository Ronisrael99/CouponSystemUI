import axios from "axios";
import Company from "../Models/Company";
import appConfig from "../Utils/AppConfig";
import Customer from "../Models/Customer";
import Coupon from "../Models/Coupon";

class AdminService {

    public async getAllCompanies(token:string){
        return (await axios.get<Company[]>(appConfig.url + "admin/companies", {headers: {"Authorization": token}})).data
    }

    public async getOneCompany(token:string, id:number){
        return (await axios.get<Company>(appConfig.url + "admin/companies/" + id, {headers: {"Authorization": token}})).data
    }

    public async deleteCompany(token:string, id:number){
        return (await axios.delete(appConfig.url + "admin/company/" + id,{headers: {"Authorization": token}})).data
    }

    public async updateCompany(token:string, company:Company){
        return (await axios.put(appConfig.url + "admin/update/company", company,{headers: {"Authorization": token}})).data
    }

    public async addCompany(token:string, company:Company){
        return (await axios.post(appConfig.url + "admin/company", company,{headers: {"Authorization": token}})).data
    }

    public async getAllCustomers(token:string){
        return (await axios.get<Customer[]>(appConfig.url + "admin/customers", {headers: {"Authorization": token}})).data
    }

    public async getOneCustomer(token:string, id:number){
        return (await axios.get<Customer>(appConfig.url + "admin/customers/" + id, {headers: {"Authorization": token}})).data
    }

    public async updateCustomer(token:string, customer:Customer){
        return (await axios.put(appConfig.url + "admin/update/customer", customer, {headers: {"Authorization": token}})).data
    }

    public async deleteCustomer(token:string, id:number){
        return (await axios.delete(appConfig.url + "admin/customer/" + id, {headers: {"Authorization": token}})).data
    }
    public async getAllCouponsByCategory(token:string,id:number, category:string){
        return (await axios.get<Coupon[]>(appConfig.url + "admin/coupons/category/" + id, {headers: {"Authorization": token}, params: {category:category}})).data
    }

}
const adminService = new AdminService()
export default adminService