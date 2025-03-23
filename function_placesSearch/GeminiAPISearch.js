import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBNPbsGQjzVKZPXstvMyCNh0SJ95dHyKKE";

const schema = {
    description: "List of Restaurants that closely match with their name, location, review scores",
    type: "array",
    items: {
        type: "object",
        properties: {
            RestaurantName: {
                type: "string",
                description: "Name of the restaurant",
            },
            
        },
        required: ["RestaurantName"],
    },
};

export async function geminiAPI(user_input) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const result = await model.generateContent(user_input);
        const responseText = result.response.text();
        
        // Parse the JSON string into an object
        const data = JSON.parse(responseText);  // Assuming result.response.text() is a JSON string
        
        return data;
        
    } catch (error) {
        console.log("Error fetching geminiAPI:", error);
        return [];
    }
}


geminiAPI("Give me 2 places in Los Angeles");
