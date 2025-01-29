import axios from "axios";

export async function getBooksList() {
    try {
       const response =  await axios.get("http://localhost:3001/books");
       console.log(response);
       return response.data;
    }
    catch (error) {
        console.log(error)
    }
}
