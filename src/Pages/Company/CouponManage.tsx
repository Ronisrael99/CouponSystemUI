import {useEffect, useState} from "react";
import Coupon from "../../Models/Coupon";
import companyService from "../../Services/CompanyService";
import {useNavigate, useParams} from "react-router-dom";
import couponService from "../../Services/CouponService";
import errorHandler from "../../Services/ErrorHandler";
import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {Formik} from "formik";
import {routs} from "../../Utils/routs";
import {Alert, Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {loginStore} from "../../Redux/Stores/LoginStore";
import Company from "../../Models/Company";

const CouponManage = () => {
    const id = parseInt(useParams().id!)
    const token = loginStore.getState().token

    const [coupon, setCoupon] = useState<Coupon>()
    const [error, setError] = useState()
    const [company, setCompany] = useState<Company>()
    const navigate = useNavigate()



    useEffect(() => {
        couponService.getOneCoupon(id)
            .then(c => {
                setCoupon(c);
                console.log(c)
            })
            .catch(err => errorHandler.showError(err))

        companyService.getCompanyDetails(token)
            .then(comp => setCompany(comp))
            .catch(e => errorHandler.showError(e))
    }, [])
    
    function handleDelete() {
        const result = window.confirm("Are you sure ?");
        if (result){
            companyService.deleteCoupon(token, id)
                .then(()=> navigate(routs.companyDetails))
                .catch(err => errorHandler.showError(err))
        }
    }

    return (
        <Box justifyContent="center" alignItems="center" display="flex">
            {coupon && (
                <TitledCard title={"Update Coupon"} sx={{mt: 5, mb: 5, width: "90%"}}>
                    <Formik initialValues={{
                        company: "",
                        category: coupon.category,
                        title: coupon.title,
                        description: coupon.description,
                        endDate: coupon.endDate,
                        amount: coupon.amount,
                        price: coupon.price,
                        image: coupon.image
                    }}
                            onSubmit={(values, {setSubmitting}) => {
                                const updatedCoupon:Coupon = {
                                    id: coupon.id,
                                    company: null,
                                    category: values.category,
                                    title: values.title,
                                    description: values.description,
                                    startDate: coupon.startDate,
                                    endDate: new Date(values.endDate),
                                    amount: values.amount,
                                    price: values.price,
                                    image: values.image
                                }
                                companyService.updateCoupon(token, updatedCoupon)
                                    .then(() => {
                                            setSubmitting(false);
                                            navigate(routs.companyDetails);
                                        }
                                    )
                                    .catch(err => {
                                        console.log(err);
                                        setSubmitting(false);
                                        setError(errorHandler.showError(err))
                                    })
                            }}>
                        {({
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              values
                          }) => (

                            <form onSubmit={handleSubmit}>
                                <Stack alignItems="center" spacing={2} mt={5}>
                                    <Select onChange={handleChange} name={"category"} sx={{width: "80%"}}
                                            defaultValue={coupon.category}
                                    >
                                        <MenuItem value={"FOOD"}>Food</MenuItem>
                                        <MenuItem value={"VACATION"}>Vacation</MenuItem>
                                        <MenuItem value={"SHOPPING"}>Shopping</MenuItem>
                                        <MenuItem value={"FLIGHTS"}>Flights</MenuItem>
                                        <MenuItem value={"PETS"}>Pets</MenuItem>
                                        <MenuItem value={"ELECTRICITY"}>Electricity</MenuItem>
                                    </Select>
                                    <TextField onChange={handleChange} type={"text"} name={"title"} id="title"
                                               label={"Title"}
                                               variant="filled"
                                               value={values.title}
                                                sx={{width: "80%"}}
                                    />
                                    <TextField onChange={handleChange} type={"description"} name={"description"}
                                               label="Description" id="description"
                                               value={values.description}
                                               variant="filled"
                                            sx={{width: "80%"}}
                                    />
                                    <TextField onChange={handleChange} type={"date"} name={"endDate"} id="endDate"
                                               label="End Date" value={values.endDate} variant="filled" sx={{width: "80%"}}/>
                                    <TextField onChange={handleChange} type={"number"} name={"amount"} id="amount"
                                               label="Amount" value={values.amount} variant="filled" sx={{width: "80%"}}/>
                                    <TextField onChange={handleChange} type={"number"} name={"price"} id="price"
                                               label="Price" value={values.price} variant="filled" sx={{width: "80%"}}/>
                                    <TextField onChange={handleChange} type={"text"} name={"image"} id="image"
                                               label="Image URL" value={values.image} variant="filled" sx={{width: "80%"}}/>

                                    <Button type="submit" disabled={isSubmitting} variant="contained"
                                            color={"secondary"}>Update Coupon</Button>
                                    <Button sx={{background: "Red", color: "black", width: "190px"}} onClick={handleDelete}>Delete Coupon</Button>
                                    {error && <Alert severity="error">{error}</Alert>}
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </TitledCard>
            )}
        </Box>
    );
}
export default CouponManage