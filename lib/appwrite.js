import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

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
export async function signIn (email, password,user,isLoggedIn){
    if(user || isLoggedIn){
            console.log("Current user:", user);
            try {
                await account.deleteSession('current');
                console.log("Session deleted");
            } catch (error) {
                console.log("No session to delete");
            }
        }
    try {
       const session = await account.createEmailPasswordSession(email, password);
       return session;
    } catch (error) {
        throw error;
    }
}
export const getCurrentUser= async()=>{
    try {
        const currentAccount = await account.get(); // get current logged in user
        if(!currentAccount) console.error('no logged in current user');
        const currentUser = await databases.listDocuments(
                                                         config.databaseId,
                                                         config.usersCollectionId,
                                                         [Query.equal('accountId',currentAccount.$id)]
                                                          ); //Get a list of all the user's documents in a given collection. You can use the query params to filter your results.
    if(!currentUser) console.error('no current user');
     return currentUser.documents[0];
    } catch (error) {
        return null;
    }
}
export const getAllPosts= async() => {
  try {
    const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId
    );
    return posts.documents
  } catch (error) {
    throw new Error(error);
  }
}
export const searchPosts= async(query) => {
  try {
    const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.search('title',query)]
    );
    return posts.documents
  } catch (error) {
    throw new Error(error);
  }
}
export const getLatestPost= async() => {
  try {
    const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.orderDesc('$createdAt',Query.limit(7))]
    );
    return posts.documents
  } catch (error) {
    throw new Error(error);
  }
}
export const getUserName= async(userId) => {
  try {
    const userName = await databases.listDocuments(
        config.databaseId,
        config.usersCollectionId,
        [Query.equal('$id', userId)]
    );
    return userName.documents[0]
  } catch (error) {
    throw new Error(error);
  }
}
export const getUserPost= async(userId) => {  
  try {
    const userPost = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.equal('users',userId)]
    );
    return userPost.documents
  } catch (error) {
    throw new Error(error);
  }
}
export const signOut = async()=>{
  try {
    const session = await account.deleteSession('current');
    return session
  } catch (error) {
    throw new Error(error);
  }
}