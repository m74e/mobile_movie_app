// track thje searches made by a user
import { Client, Databases, Query } from 'react-native-appwrite';

const DATA_BASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') 
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);



export const upadateSearchCount=  async (query: string, movie:Movie) => {

const result = await database.listDocuments(DATA_BASE_ID,COLLECTION_ID,[
    Query.equal('searchTerm', query)
]);
console.log(result)
// const result = await

// check if record of that search has already been stored
//if a doucument is found increment the search count field 
// if no document is found c
//create  a new  document in Appwrite database -> 1

}