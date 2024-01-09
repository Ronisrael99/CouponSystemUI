import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {LoginService} from "../../Services/LoginService";
import {routs} from "../../Utils/routs";
import {Alert, Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Formik} from "formik";
import {companyStore} from "../../Redux/Stores/CompanyStore";
import couponService from "../../Services/CouponService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import Coupon from "../../Models/Coupon";
import {useNavigate} from "react-router-dom";
import errorHandler from "../../Services/ErrorHandler";
import {useEffect, useState} from "react";
import companyService from "../../Services/CompanyService";
import Category from "../../Models/Category";
import * as Console from "console";

const AddCoupon = () => {
    const token = loginStore.getState().token;
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [logComp, setLogComp] = useState("")

    useEffect(() => {
        companyService.getCompanyDetails(token).then(c => setLogComp(c.name)).catch(compErr => {
            console.log(compErr)
        })
    }, [])


    return (
        <Box justifyContent="center" alignItems="center" display="flex">
            <TitledCard title={"Add Coupon"} sx={{mt: 5, mb: 5}}>
                <Formik initialValues={{
                    company: "",
                    category: null,
                    title: "",
                    description: "",
                    endDate: new Date(),
                    amount: null,
                    price: null,
                    image: ""
                }}
                        onSubmit={(values, {setSubmitting}) => {
                            const coupon: Coupon = {
                                id: 0,
                                company: null,
                                category: values.category.toString(),
                                title: values.title,
                                description: values.description,
                                startDate: new Date(),
                                endDate: new Date(values.endDate),
                                amount: values.amount,
                                price: values.price,
                                image: values.image
                            }
                            couponService.addCoupon(token, coupon)
                                .then(() => {
                                        setSubmitting(false);
                                        navigate(routs.companyDetails);
                                        console.log(coupon)
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
                            <Stack alignItems="center" spacing={5} mt={5}>
                                <Select onChange={handleChange} name={"category"} sx={{width: 250}}
                                        defaultValue={"FOOD"}>
                                    <MenuItem value={"FOOD"}>Food</MenuItem>
                                    <MenuItem value={"VACATION"}>Vacation</MenuItem>
                                    <MenuItem value={"SHOPPING"}>Shopping</MenuItem>
                                    <MenuItem value={"FLIGHTS"}>Flights</MenuItem>
                                    <MenuItem value={"PETS"}>Pets</MenuItem>
                                    <MenuItem value={"ELECTRICITY"}>Electricity</MenuItem>
                                </Select>
                                <TextField onChange={handleChange} type={"text"} name={"title"} id="title"
                                           label="Title"
                                           variant="filled"/>
                                <TextField onChange={handleChange} type={"description"} name={"description"}
                                           id="description"
                                           label="Description" variant="filled"/>
                                <TextField onChange={handleChange} type={"date"} name={"endDate"} id="endDate"
                                           label="End Date" variant="filled" value={values.endDate} sx={{width: 230}}/>
                                <TextField onChange={handleChange} type={"number"} name={"amount"} id="amount"
                                           label="Amount" variant="filled"/>
                                <TextField onChange={handleChange} type={"number"} name={"price"} id="price"
                                           label="Price" variant="filled"/>
                                <TextField onChange={handleChange} type={"text"} name={"image"} id="image"
                                           label="Image URL" variant="filled"/>

                                <Button type="submit" disabled={isSubmitting} variant="contained"
                                        color={"secondary"}>Submit</Button>
                                {error && <Alert severity="error">{error}</Alert>}
                            </Stack>
                        </form>
                    )}
                </Formik>
            </TitledCard>
        </Box>
    );
}
export default AddCoupon