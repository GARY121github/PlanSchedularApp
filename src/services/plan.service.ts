import axios from "axios";
import config from "../conf/config";
import { Plan } from "../schemas/plan.schema";

const BACKEND_URL = config.BACKEND_URL;

class PlanService {
    public getPlans = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/plan`);
            return response.data;
        } catch (error) {
            console.log("Error while fetching plans", error);
            throw error;
        }
    }

    public createPlan = async (data : Omit<Plan , "id">) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/plan` , data);
            console.log(response);
        } catch (error) {
            console.log("Error while creating a plan" , error);
            throw error;
        }
    }

    public updatePlan = async (data : Plan) => {
        try {
            const response = await axios.patch(`${BACKEND_URL}/plan/${data.id}`, data);
            console.log(response);
        } catch (error) {
            console.log("Error while updating the plan" , error);
            throw error;
        }
    }
}

export default new PlanService();