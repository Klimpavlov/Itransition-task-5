import axios from "axios";

export async function getBooksList() {
    try {
        const url = "https://itransition-task-5-be99.onrender.com/books";
        // const url = "http://localhost:3001/books";
       const response =  await axios.get(url);
       console.log(response);
       return response.data;
    }
    catch (error) {
        console.log(error)
    }
}
