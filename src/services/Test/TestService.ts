import TestModel from "../../api/models/Test/TestModel";
import Test from "../../interfaces/Test/Test";

export default class TestService {
    static async create (test:  Test){

        const testExist = await TestModel.findTest(test.id)

        if(testExist == null) {
            if(test.titulo, test.descricao, test.id_tipo){
                if(test.titulo.length <= 50 ){
                    if(test.id_tipo){

                        const TestData = {
                            titulo: test.titulo,
                            descricao: test.descricao,
                            id_tipo: test.id_tipo
                        }
                        switch(test.id_tipo){
                            case 1:
                                const newTest = await TestModel.create(TestData)
                        }
                    }
                }
            }
        }
    }
}