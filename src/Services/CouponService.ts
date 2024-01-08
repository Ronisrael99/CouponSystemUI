import {couponStore} from "../Redux/Stores/CouponStore";
import axios from "axios";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";
import {fill} from "../Redux/CouponSlice";

class CouponService {

    public async getOneCoupon(id:number){
        if (couponStore.getState().value.length == 0){
            return (await axios.get<Coupon>(appConfig.url + "public/coupon/" + id)).data
        } else {
            return couponStore.getState().value.find(c => c.id == id);
        }

    }

    public async getAllCoupons(){
        if (couponStore.getState().value.length == 0){
            const response = (await axios.get<Coupon[]>(appConfig.url + "public/coupons")).data;
            couponStore.dispatch(fill(response));
            return response;
        } else {
            return couponStore.getState().value;
        }
    }

    public async addCoupon(token:string, coupon:Coupon){
        const response = (await axios.post(appConfig.url + "company/coupon", coupon, {headers: {"Authorization": token}} )).data
        return response;
    }
}
const couponService = new CouponService();
export default couponService;