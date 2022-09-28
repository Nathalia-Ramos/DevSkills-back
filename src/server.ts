import express from 'express';

//inicializando app
const app = express();

//habilitando json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//importando a rota do state
//import AdressRoutes from "../routes/CompanyRoutes/AddressRoutes"
import UserRoutes from "../routes/CompanyRoutes/UserCompanyRoutes"


app.use('/user', UserRoutes)

app.listen(8080, () => {
    console.log("Server running")
})

