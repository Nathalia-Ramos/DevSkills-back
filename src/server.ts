import express from 'express';

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

app.use('/user', UserRoutes)
app.use('/address', AddresRoutes)
app.use('/auth', AuthRoutes)
app.use('/forgot_pass', ForgetPassword)
app.use('/reset', ResetPass)

app.listen(8080, () => {
    console.log("Server running")
})

