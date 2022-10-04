import express from 'express';

import * as dotenv from "dotenv";

dotenv.config()

//inicializando app
const app = express();

//habilitando json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import UserRoutes from "../routes/CompanyRoutes/UserCompanyRoutes"
import AddresRoutes from "../routes/CompanyRoutes/AddressRoutes" 
import AuthRoutes from "../routes/CompanyRoutes/AuthRoutes"
import ForgetPassword from "../routes/CompanyRoutes/ForgotPassword"
import ResetPass  from "../routes/CompanyRoutes/ResetPassword"
import Gender from "../routes/CommonRoutes/GenderRoutes"
import DeveloperRoutes from "../routes/DeveloperRoutes/UserDeveloperRoutes";

app.use('/user', UserRoutes)
app.use('/teste', AddresRoutes)
app.use('/auth', AuthRoutes)
app.use('/forgot_pass', ForgetPassword)
app.use('/reset', ResetPass)
app.use('/developer', DeveloperRoutes)
app.use('/gender', Gender)

app.listen(8080, () => {
    console.log("Server running")
})

