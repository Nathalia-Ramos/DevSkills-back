import express from 'express';

import dotenv from "dotenv";

import cors from "cors";

dotenv.config()

//inicializando app
const app = express();

//habilitando json
app.use(express.json());

app.use(cors())

import AdminRoutes from "../routes/AdminRoutes/UserAdminRoutes";
import GenderRoutes from "../routes/CommonRoutes/GenderRoutes";
import SkillRoutes from "../routes/CommonRoutes/SkillsRoutes";
import StackRoutes from "../routes/CommonRoutes/StacksRoutes";
import AddresRoutes from "../routes/CompanyRoutes/AddressRoutes";
import AuthRoutes from "../routes/CompanyRoutes/AuthRoutes";
import UserCompanyController from "../routes/CompanyRoutes/find";
import ForgetPassword from "../routes/CompanyRoutes/ForgotPassword";
import PhoneRoutes from "../routes/CompanyRoutes/PhoneCompanyRoutes";
import ResetPass from "../routes/CompanyRoutes/ResetPassword";
import UserRoutes from "../routes/CompanyRoutes/UserCompanyRoutes";
import DeveloperRoutes from "../routes/DeveloperRoutes/UserDeveloperRoutes";
import Group from "../routes/Group/GroupRoutes";
import Test from "../routes/TestRoutes/TestRouter";

app.use('/company', UserRoutes)
app.use('/user', UserRoutes)
app.use('/test', Test)
app.use('/address', AddresRoutes)
app.use('/forgot_pass', ForgetPassword)
app.use('/reset', ResetPass)
app.use('/developer', DeveloperRoutes)
app.use('/gender', GenderRoutes)
app.use('/stack', StackRoutes)
app.use('/skill', SkillRoutes)
app.use('/phone', PhoneRoutes)
app.use('/find', UserCompanyController)
app.use('/auth', AuthRoutes)
app.use('/admin', AdminRoutes)
app.use('/group', Group)

app.listen(process.env.PORT || 4041, () => {
    console.log("Server running")
})















