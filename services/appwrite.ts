// track thje searches made by a user
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATA_BASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') 
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const getTrendingMovies=async(): Promise<TrendingMovie[] |undefined>=>{
try{
const result = await database.listDocuments(DATA_BASE_ID,COLLECTION_ID,[
    Query.limit(5),Query.orderDesc('count')

]);
return result.documents as unknown as TrendingMovie[]
}
catch(err){

}
}

export const upadateSearchCount=  async (query: string, movie:Movie) => {
try{
const result = await database.listDocuments(DATA_BASE_ID,COLLECTION_ID,[
    Query.equal('searchTerm', query)
]);
// console.log(result)

if(result.documents.length > 0){
    const existingMovie=result.documents[0];
    await database.updateDocument(
        DATA_BASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
            count: existingMovie.count + 1,
        }
    )
}
else{
    await database.createDocument(DATA_BASE_ID,COLLECTION_ID,ID.unique(),{
        searchTerm: query,
        movie_id: movie.id,
        count:1,
        title:movie.title,
        poster_url: movie.poster_path 
  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
  : '',
    })
}}
catch(err){
    console.log(err);
    throw err;
}
// const result = await

// check if record of that search has already been stored
//if a doucument is found increment the search count field 
// if no document is found c
//create  a new  document in Appwrite database -> 1

}