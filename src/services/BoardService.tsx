const API_URL = process.env.REACT_APP_API_URL;

// enum ENDPOINT {

// };

class BoardService {
    public static async test() {
        let data;
        console.log(API_URL);
        try {
            const result = await fetch(`${API_URL}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            data = await result.json();
        } catch (error: any) {
            console.log(error);
        }
        return data;
    }
}

export default BoardService;