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
            throw error;
            console.log("Error while fetching plans", error);
        }
    }

    public createPlan = async (data : Omit<Plan , "id">) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/plan` , data);
            console.log(response);
        } catch (error) {
            throw error;
            console.log("Error while creating a plan");
        }
    }
}

export default new PlanService();