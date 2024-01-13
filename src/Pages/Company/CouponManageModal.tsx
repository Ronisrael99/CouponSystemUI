import {useEffect, useState} from "react";
import Coupon from "../../Models/Coupon";
import companyService from "../../Services/CompanyService";
import {useNavigate, useParams} from "react-router-dom";
import couponService from "../../Services/CouponService";
import errorHandler from "../../Services/ErrorHandler";
import Box from "@mui/material/Box";
import {routs} from "../../Utils/routs";
import {Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {loginStore} from "../../Redux/Stores/LoginStore";
import {useForm} from "react-hook-form";
import * as React from "react";
import {Error} from "../../Services/Error";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CouponManage = () => {
    const id = parseInt(useParams().id!)
    const token = loginStore.getState().token

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
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

    function handleClose() {
        setOpen(false)
        navigate(routs.companyDetails + id)
    }

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

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    return (


        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                {dialog && <Error error={error} onClose={() => setDialog(false)}/>}
                <Box sx={style}>
                    <ArrowBackIcon onClick={handleClose} sx={{cursor: "pointer"}}/>
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                        Update Coupon
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>

                        {coupon && (

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
                                                   maxLength: {value: 250, message: "Max input 250"}
                                               })}
                                    />
                                    {formState.errors?.title && <span style={{
                                        fontSize: "10px",
                                        color: "red",
                                        margin: 0,
                                        padding: 0,
                                    }}>{formState.errors.title.message}</span>}

                                    <TextField type={"text"} name={"description"} id="description" label="Description"
                                               variant="filled" defaultValue={coupon.description} sx={{width: "80%"}}
                                               {...register("description", {
                                                   required: {message: "Required", value: true},
                                                   maxLength: {value: 7000, message: "Max input 7000"}
                                               })}
                                    />
                                    {formState.errors?.description && <span style={{
                                        fontSize: "10px",
                                        color: "red",
                                        margin: 0,
                                        padding: 0,
                                    }}>{formState.errors.description.message}</span>}


                                    <TextField type={"date"} name={"endDate"} id="endDate" inputProps={{min: tomorrowDate}}
                                               label="End Date" defaultValue={coupon.endDate} variant="filled"
                                               sx={{width: "80%"}} {...register("endDate", {
                                        required: {message: "Required", value: true},
                                        min: {value: new Date().toString(), message: "Cannot add coupon with an expired date"}
                                    })}/>
                                    {formState.errors?.endDate && <span style={{
                                        fontSize: "10px",
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
                                        fontSize: "10px",
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
                                        fontSize: "10px",
                                        color: "red",
                                        margin: 0,
                                        padding: 0,
                                    }}>{formState.errors.price.message}</span>}


                                    <TextField type={"text"} name={"image"} id="image" label="Image URL" variant="filled"
                                               defaultValue={coupon.image} sx={{width: "80%"}}
                                               {...register("image", {
                                                   required: {message: "Required", value: true},
                                                   maxLength: {value: 7000, message: "Max input 7000"}
                                               })}
                                    />
                                    {formState.errors?.image && <span style={{
                                        fontSize: "10px",
                                        color: "red",
                                        margin: 0,
                                        padding: 0,
                                    }}>{formState.errors.image.message}</span>}


                                    <Button type={"submit"} variant={"contained"} endIcon={<SendIcon/>}>Update
                                        Coupon</Button>

                                    <Button variant={"outlined"} startIcon={<DeleteIcon/>}
                                            onClick={handleDelete}>Delete Coupon</Button>
                                </Stack>

                            </form>

                        )}


                    </Typography>
                </Box>
            </>
        </Modal>
);
}
export default CouponManage