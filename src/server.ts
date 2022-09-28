import express from 'express';

//inicializando app
const app = express();

//habilitando json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//importando a rota do state
import StateRoutes from "../routes/StateRoutes"
import CityRoutes from "../routes/CityRoutes"
import AdressRoutes from "../routes/AdressRoutes"
import UserRoutes from "../routes/UserCompanyRoutes"

app.use('/state', StateRoutes)
app.use ('/city', CityRoutes)
app.use('/endereco', AdressRoutes)
app.use('/user', UserRoutes)

app.listen(8080, () => {

    console.log("Server running")

})

