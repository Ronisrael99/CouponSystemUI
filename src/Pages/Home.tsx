import { useEffect, useState } from "react";
import couponService from "../Services/CouponService";
import Coupon from "../Models/Coupon";
import errorHandler from "../Services/ErrorHandler";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { FcNext, FcPrevious } from "react-icons/fc";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

function Home(): JSX.Element {
    const [index, setIndex] = useState(0);
    const [products, setProducts] = useState<Coupon[]>();
    const [product, setProduct] = useState<Coupon>();

    const navigate = useNavigate()

    useEffect(() => {
        couponService
            .getAllCoupons()
            .then((p) => {setProducts(p); })
            .catch((err) => errorHandler.showError(err));
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % (products?.length || 1));
        }, 5000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [products]);

    useEffect(() => {
        setProduct(products?.[index]);
    }, [index, products]);

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % (products?.length || 1));
    };

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + products?.length) % (products?.length || 1));
    };

    return (
        <Box display="grid" gridTemplateRows={"30% 30% 30%"}>

                <Typography variant={"h2"} mt={3} textAlign={"center"}>Our Coupons</Typography>
                <Paper elevation={3} sx={{
                    mt: -5,
                    mr: 20,
                    ml: 20,
                    minHeight: 400,
                    maxHeight: 400,
                    textAlign:"center",
                    borderRadius:5,
                    display: "grid",
                    gridAutoColumns: "20% 60% 20%"
                }}>

                    <Box onClick={handlePrev} sx={{gridColumn: 1, alignSelf: "center", cursor:"pointer"}}>
                        <FcPrevious size={100} />️
                    </Box>

                    <Box  sx={{gridColumn: 2}}>
                            <img src={product?.image} alt={product?.title} style={{
                                width:300,
                                height: 300,
                                marginTop: 50
                            }} />
                            <Typography variant={"h3"}>{product?.title}</Typography>
                    </Box>

                    <Box onClick={handleNext}  sx={{gridColumn: 3,  alignSelf: "center", cursor:"pointer"}}>
                        <FcNext size={100} />
                    </Box>
                </Paper>


        </Box>

    );
}

export default Home;
