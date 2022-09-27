import express from 'express';

//inicializando app
const app = express();

//habilitando json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//importando a rota do state
import StateRoutes from "../routes/StateRoutes"
import CityRoutes from "../routes/CityRoutes"
//import EnderecoRoutes from "../routes/EnderecoRoutes"

app.use('/state', StateRoutes)
app.use ('/city', CityRoutes)
//app.use('/endereco', EnderecoRoutes)

app.listen(8080, () => {

    console.log("Server running")

})

