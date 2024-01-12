class Coupon {
    public id:number;
    public company:string;
    public category:string;
    public title:string;
    public description:string;
    public startDate: Date;
    public endDate:Date;
    public amount:number;
    public price:number;
    public image:string;

    constructor(id: number, company: string, category: string, title: string, description: string, startDate: Date, endDate: Date, amount: number, price: number, image: string) {
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }
}
export default Coupon;