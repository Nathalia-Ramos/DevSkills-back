import {TestData, Question ,Option}  from "../../interfaces/Test/Tests";
import OptionsModel from "../../models/OptionsTest/OptionsModel";
import { AlternativaProva } from "@prisma/client";
import QuestionService from "../Test/QuestionService";
import QuestionModel from "../../models/Questions/QuestionsModel";

export default class OptionService {
    static async create(option : Option){

        const createOption = {
            texto: option.texto,
            correta: option.correta
        }
    }
}