import {useEffect, useState} from "react";
import Coupon from "../../Models/Coupon";
import companyService from "../../Services/CompanyService";
import {useNavigate, useParams} from "react-router-dom";
import couponService from "../../Services/CouponService";
import errorHandler from "../../Services/ErrorHandler";
import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {routs} from "../../Utils/routs";
import {Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {loginStore} from "../../Redux/Stores/LoginStore";
import Company from "../../Models/Company";
import {useForm} from "react-hook-form";
import * as React from "react";
import {Error} from "../../Services/Error";

const CouponManage = () => {
    const id = parseInt(useParams().id!)
    const token = loginStore.getState().token

    const [coupon, setCoupon] = useState<Coupon>()
    const [error, setError] = useState()
    const [dialog, setDialog] = useState(false)
    const {register, handleSubmit, formState, setValue} = useForm<Coupon>({mode: "onBlur"})
    const navigate = useNavigate()


    useEffect(() => {
        couponService.getOneCoupon(id)
            .then(c => {
                setCoupon(c);
            })
            .catch(err => {
                setError(errorHandler.showError(err))
                setDialog(true)
            })

        if (coupon?.category !== null) {
            setValue('category', coupon?.category);
        }
    }, [])

    function handleDelete() {
        const result = window.confirm("Are you sure ?");
        if (result) {
            companyService.deleteCoupon(token, id)
                .then(() => navigate(routs.companyDetails))
                .catch(err => {
                    setError(errorHandler.showError(err))
                    setDialog(true)
                })
        }
    }

    function sendForm(formCoupon: Coupon) {
        formCoupon.id = coupon.id
        formCoupon.price = parseInt(formCoupon.price.toString())

        const updatedCoupon: Coupon = {
            id: coupon.id,
            company: null,
            category: formCoupon.category === undefined ? coupon.category : formCoupon.category,
            title: formCoupon.title,
            description: formCoupon.description,
            startDate: new Date(),
            endDate: new Date(formCoupon.endDate),
            amount: formCoupon.amount,
            price: formCoupon.price,
            image: formCoupon.image
        }

        companyService.updateCoupon(token, updatedCoupon)
            .then(c => {
                navigate(routs.companyDetails)
            })
            .catch(err => {
                setError(errorHandler.showError(err))
                setDialog(true)
            })
    }

    return (
        <Box justifyContent="center" alignItems="center" display="flex">
            {dialog && <Error error={error} onClose={() => setDialog(false)}/>}
            {coupon && (
                <TitledCard title={"Update Coupon"} sx={{mt: 5, mb: 5, width: "90%"}}>

                    <form onSubmit={handleSubmit(sendForm)}>

                        <Stack alignItems="center" spacing={2} mt={5}>
                            <Select {...register("category")} name={"category"}
                                    sx={{width: "80%"}}
                                    defaultValue={coupon?.category} required
                            >
                                <MenuItem value={"FOOD"}>Food</MenuItem>
                                <MenuItem value={"VACATION"}>Vacation</MenuItem>
                                <MenuItem value={"SHOPPING"}>Shopping</MenuItem>
                                <MenuItem value={"FLIGHTS"}>Flights</MenuItem>
                                <MenuItem value={"PETS"}>Pets</MenuItem>
                                <MenuItem value={"ELECTRICITY"}>Electricity</MenuItem>
                            </Select>

                            <TextField type={"text"} name={"title"} id="title" label="Title" variant="filled"
                                       defaultValue={coupon.title} sx={{width: "80%"}}
                                       {...register("title", {
                                           required: {message: "Required", value: true},
                                       })}
                            />
                            {formState.errors?.title && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.title.message}</span>}

                            <TextField type={"text"} name={"description"} id="description" label="Description"
                                       variant="filled" defaultValue={coupon.description} sx={{width: "80%"}}
                                       {...register("description", {
                                           required: {message: "Required", value: true},
                                       })}
                            />
                            {formState.errors?.description && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.description.message}</span>}


                            <TextField type={"date"} name={"endDate"} id="endDate"
                                       label="End Date" defaultValue={coupon.endDate} variant="filled"
                                       sx={{width: "80%"}} {...register("endDate", {
                                required: {message: "Required", value: true},
                                min: {value: new Date().toString(), message: "Please enter valid date"}
                            })}/>
                            {formState.errors?.endDate && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.endDate.message}</span>}

                            <TextField type={"number"} name={"amount"} id="amount" label="Amount" variant="filled"
                                       defaultValue={coupon.amount} sx={{width: "80%"}}
                                       {...register("amount", {
                                           required: {message: "Required", value: true},
                                       })}
                            />
                            {formState.errors?.amount && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.amount.message}</span>}

                            <TextField type={"text"} name={"price"} id="price" label="Price" variant="filled"
                                       defaultValue={coupon.price} sx={{width: "80%"}}
                                       {...register("price", {
                                           required: {message: "Required", value: true},
                                       })}
                            />
                            {formState.errors?.price && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.price.message}</span>}


                            <TextField type={"text"} name={"image"} id="image" label="Image URL" variant="filled"
                                       defaultValue={coupon.image} sx={{width: "80%"}}
                                       {...register("image", {
                                           required: {message: "Required", value: true},
                                       })}
                            />
                            {formState.errors?.image && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.image.message}</span>}

                            <Button type="submit" variant="contained"
                                    color={"secondary"}>Update Coupon</Button>
                            <Button sx={{background: "Red", color: "black", width: "190px"}} onClick={handleDelete}>Delete
                                Coupon</Button>
                        </Stack>

                    </form>

                </TitledCard>
            )}
        </Box>
    );
}
export default CouponManage