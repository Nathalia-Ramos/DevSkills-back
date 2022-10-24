// import {Request, Response} from "express"
// // import PhoneCompanyModel from "../../models/Company/PhoneCompamyModel"



// export default class PhoneCompanyController {
//     static async phone (req: Request, res: Response){
//         const {ddd, numero_telefone, id_empresa} = req.body

//         if(!ddd || !numero_telefone || !id_empresa) return res.status(400).json({Error: "Existem campos obrigatórios que não foram preenchidos!"})

//         if(ddd.length > 2)   return res.status(400).json({message: "ddd inválido!"})

//         if(!numero_telefone.match(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/))
//             return res.status(400).json({message: "Número inválido!"})
//          try {
//             const newPhone = await PhoneCompanyModel.execute({
//                 ddd,
//                 numero_telefone,
//                 id_empresa
//             })
//             return res.status(201).json({ message: "Telefone cadastrada com sucesso!", newPhone});;


//         } catch (error: any) {
//             console.log(error)
//             return res.status(201).json({ error: "Não foi possível realizar o cadastro"});

//         }
//     }
// }