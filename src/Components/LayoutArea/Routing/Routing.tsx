import {Navigate, Route, Routes} from "react-router-dom";
import {usePages} from "../../../Hooks/UsePages";
import {routs} from "../../../Utils/routs";
import {Login} from "../../../Pages/Login";
import {Register} from "../../../Pages/Register";
import {ProductDetails} from "../../../Pages/ProductDetails";




function Routing(): JSX.Element {
    const pages = usePages()
    let i = 0;
    return (
        <div className="Routing">
            <Routes>
                {pages.map(({route, component}) => (
                    <Route key={i++} path={route} Component={component}/>
                ))}

                <Route path={routs.login} Component={Login}/>
                <Route path={routs.register} Component={Register}/>
                <Route path={routs.productDetails + ":id"} Component={ProductDetails}/>
                <Route path={"*"} element={<Navigate to={routs.home}/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
