// import axios from "axios";

// const API_KEY = 'AIzaSyAo-wFx9JQiJ3NnZlaygtzcQjMmTp80F2Y'
// const url = 'https://www.googleapis.com/books/v1/volumes'

// const searchBooks = async (form) => {
//     const query = `${form.title}${form.subject && form.subject !== 'all' ? `+subject:${form.subject}` : ''}`;
//     try {
//         const response = await axios.get(url, {
//             params: {
//                 q: query || 'all',
//                 orderBy: form.sorting || 'relevance',
//                 key: API_KEY,
//                 maxResults: 40,
//             },
//         });

//         return response.data.items
//     } catch (error) {
//         console.error('Failed to fetch books from Google Books API:', error);
//     }
// };

// const getBookDetails = async (bookId) => {
//     try {
//         const response = await axios.get(`${url}/${bookId}`, {
//             params: {
//                 key: API_KEY,
//             },
//         });
//         setBook(response.data);
//     } catch (error) {
//         console.error('Failed to fetch book details from Google Books API:', error);
//     }
// };

// export { getBookDetails, searchBooks }
