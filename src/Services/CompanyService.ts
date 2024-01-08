import axios from "axios";
import appConfig from "../Utils/AppConfig";
import Company from "../Models/Company";
import Coupon from "../Models/Coupon";



class CompanyService {

    public async getCompanyDetails(token:string){
            return (await axios.get<Company>(appConfig.url + "company", {headers: {"Authorization": token}})).data
    }
    public async getCompanyCoupons(token:string){
        return (await axios.get<Coupon[]>(appConfig.url + "company/coupons", {headers: {"Authorization": token}})).data
    }
}
const companyService = new CompanyService();
export default companyService;