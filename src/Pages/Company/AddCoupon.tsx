import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {routs} from "../../Utils/routs";
import { Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import couponService from "../../Services/CouponService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import Coupon from "../../Models/Coupon";
import {useNavigate} from "react-router-dom";
import errorHandler from "../../Services/ErrorHandler";
import { useState} from "react";
import {Error} from "../../Services/Error";
import {useForm} from "react-hook-form";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";


const AddCoupon = () => {
    const token = loginStore.getState().token;
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [dialog, setDialog] = useState(false)
    const {register, handleSubmit, formState} = useForm<Coupon>({mode: "onBlur"})

    function sendForm(coupon:Coupon) {
        coupon.id = 0;
        coupon.company = null;
        coupon.startDate = new Date()
        coupon.endDate = new Date(coupon.endDate)
        coupon.category = coupon.category.toString()

        couponService.addCoupon(token, coupon)
            .then(c=>{
                navigate(routs.companyDetails)
            })
            .catch(err =>{
                setError(errorHandler.showError(err))
                setDialog(true)
            })
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    return (
        <Box justifyContent="center" alignItems="center" display="flex">
            <TitledCard title={"Add Coupon"} sx={{mt: 5, mb: 5}}>
                {dialog && <Error error={error} onClose={() => setDialog(false)}/>}

                <form onSubmit={handleSubmit(sendForm)}>
                    <Stack alignItems="center" spacing={5} mt={5}>

                        <Select {...register("category")} sx={{width: 250}} defaultValue={"FOOD"} required>
                            <MenuItem value={"FOOD"}>Food</MenuItem>
                            <MenuItem value={"VACATION"}>Vacation</MenuItem>
                            <MenuItem value={"SHOPPING"}>Shopping</MenuItem>
                            <MenuItem value={"FLIGHTS"}>Flights</MenuItem>
                            <MenuItem value={"PETS"}>Pets</MenuItem>
                            <MenuItem value={"ELECTRICITY"}>Electricity</MenuItem>
                        </Select>

                        <TextField type={"text"} name={"title"} id="title" label="Title" variant="filled"
                                   sx={{width: 250}} required {...register("title")}/>

                        <TextField type={"text"} name={"description"} id="description" label={"Description"}
                                   variant={"filled"} sx={{width: 250}} required {...register("description")}/>

                        <TextField type={"date"} name={"endDate"} id="endDate" inputProps={{min: tomorrowDate}}
                                   label="End Date" defaultValue={tomorrowDate}
                                   variant="filled"
                                   sx={{width: 250}} {...register("endDate", {
                            required: {message: "Required", value: true},
                            min: {value: tomorrowDate, message: "Cannot add coupon with an expired date"}
                        })}/>
                        {formState.errors?.endDate && <span style={{
                            fontSize: "10px",
                            color: "red",
                            margin: 0,
                            padding: 0,
                        }}>{formState.errors.endDate.message}</span>}

                        <TextField type={"number"} name={"amount"} id="amount" label={"Amount"} variant={"filled"}
                                   sx={{width: 250}} required {...register("amount")}/>

                        <TextField type={"number"} name={"price"} id="price" label={"Price"} variant={"filled"}
                                   sx={{width: 250}} required {...register("price")}/>

                        <TextField type={"text"} name={"image"} id="image" label={"Image URL"} variant={"filled"}
                                   sx={{width: 250}} required {...register("image")}/>

                        <Button type={"submit"} variant={"contained"} endIcon={<SendIcon/>}>Add
                            Coupon</Button>
                    </Stack>
                </form>

                {/*            const coupon: Coupon = {*/}
                {/*                id: 0,*/}
                {/*                company: null,*/}
                {/*                category: values.category.toString(),*/}
                {/*                title: values.title,*/}
                {/*                description: values.description,*/}
                {/*                startDate: new Date(),*/}
                {/*                endDate: new Date(values.endDate),*/}
                {/*                amount: values.amount,*/}
                {/*                price: values.price,*/}
                {/*                image: values.image*/}
                {/*            }*/}
                {/*            couponService.addCoupon(token, coupon)*/}
                {/*                .then(() => {*/}
                {/*                        setSubmitting(false);*/}
                {/*                        navigate(routs.companyDetails);*/}
                {/*                        console.log(coupon)*/}
                {/*                    }*/}
                {/*                )*/}
                {/*                .catch(err => {*/}
                {/*                    console.log(err);*/}
                {/*                    setSubmitting(false);*/}
                {/*                    setError(errorHandler.showError(err))*/}
                {/*                })*/}
                {/*        }}>*/}
                {/*    {({*/}


                {/*                <Button type="submit" disabled={isSubmitting} variant="contained"*/}
                {/*                        color={"secondary"}>Submit</Button>*/}
                {/*                {error && <Alert severity="error">{error}</Alert>}*/}
                {/*            </Stack>*/}
                {/*        </form>*/}
                {/*    )}*/}
                {/*</Formik>*/}
            </TitledCard>
        </Box>
    );
}
export default AddCoupon