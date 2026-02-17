const BASE_API_URL = "http://localhost:4000"; // Use environment variables in production

export const request = async (path, data = null, method = "GET") => {
    try {

        const url = `${BASE_API_URL}${path}`;
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (method === "POST" || method === "PUT") {
            options.body = JSON.stringify(data);
        }

        const request = await fetch(url, options);

        const response = await request.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { error: false, data: response.data };
    } catch (error) {
        console.log('Error: ' + error);
        return { 
            error: true,
            message: error.message || "An error occurred",
            data: error
        };
    }
}