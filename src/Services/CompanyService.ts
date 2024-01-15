import axios from "axios";
import appConfig from "../Utils/AppConfig";
import Company from "../Models/Company";
import Coupon from "../Models/Coupon";


class CompanyService {

    public async getCompanyDetails(token: string) {
        return (await axios.get<Company>(appConfig.url + "company", {headers: {"Authorization": token}})).data
    }

    public async getCompanyCoupons(token: string) {
        return (await axios.get<Coupon[]>(appConfig.url + "company/coupons", {headers: {"Authorization": token}})).data
    }

    public async updateCoupon(token: string, coupon:Coupon) {
        return (await  axios.put<Coupon>(appConfig.url + "company/update/coupon", coupon, {headers: {"Authorization": token}})).data
    }

    public async deleteCoupon(token: string, id:number){
        return (await axios.delete(appConfig.url + "company/" + id, {headers: {"Authorization": token}}))
    }
    public async updateCompany(token: string, company:Company){
        return (await axios.put<Company>(appConfig.url + "company/update/company", company, {headers: {"Authorization": token}}))
    }

    public async getAllCouponsByCategory(token:string, category:string){
        return (await axios.get<Coupon[]>(appConfig.url + "company/coupons/category", {headers: {"Authorization": token}, params: {category:category}})).data
    }
}

const companyService = new CompanyService();
export default companyService;