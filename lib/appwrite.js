import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
   endPoint:'https://fra.cloud.appwrite.io/v1',
   platform:'com.exodus.aroa',
   projectId:'6a3918e9001e29bfa2e8',
   databaseId:'6a391c65002d92623e3b',
   usersCollectionId:'users',
   videoCollectionId:'video',
   storageId:'6a39217c002d5fca1f99'
}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endPoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createAccount = async(email, password, userName) => {
     try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            userName,
        )
        if(!newAccount) throw Error;
        try {
        const user = await account.get();
        if(user){
            console.log("Current user:", user);
            try {
                await account.deleteSession('current');
                console.log("Session deleted");
            } catch (error) {
                console.log("No session to delete");
            }
        }
        } catch (error) {
        console.log("No active session");
        }
        await signIn(email, password);
        const avatar = avatars.getInitials().toString(); // Use this endpoint to show your user initials avatar icon on your website or app. By default, this route will try to print your logged-in user name or email initial
        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountId:newAccount.$id,
                email,
                userName,
                //avatar:avatar
            }

        )
        return newUser;
     } catch (error) {
        console.error(error);
        throw error;
     }
}
export async function signIn (email, password){
    try {
       await account.deleteSession('current');
    } catch (error) {
        console.log(error);
    }
    try {
       const session = await account.createEmailPasswordSession(email, password);
       return session;
    } catch (error) {
        throw error;
    }
}