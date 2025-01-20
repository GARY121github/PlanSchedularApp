import axios from "axios";
import config from "../conf/config";

const BACKEND_URL = config.BACKEND_URL;

class PlanService {
    public getPlans = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/plan`);
            return response.data;
        } catch (error) {
            console.log("Error while fetching plans", error);
        }
    }
}

export default new PlanService();