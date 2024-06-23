import AppWriteconf from "../conf";

import { Client , Databases , ID , Storage , Query } from "appwrite";

export class Service{
    client = new Client()
    databases
    storage
     
    constructor(){
        this.client
            .setEndpoint(AppWriteconf.appwriteUrl)
            .setProject(AppWriteconf.appwriteUrl)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost ({title , slug , content , featuredImage , status , userID}){
        try {
            return await this.databases
            .createDocument(
                AppWriteconf.appwriteDatabaseId ,
                AppWriteconf.appwriteCollectionId ,
                slug , 
                {title , content , featuredImage , status , userID}
            )
        } catch (error) {
            console.log(`Appwrite service:: createPost::` , error);
        }
    }

    // we are taking slug as our documentId
    async updatePost (slug , {title , content , featuredImage , status , userID}){
        try {
            return await this.databases
            .updateDocument(
                AppWriteconf.appwriteDatabaseId ,
                AppWriteconf.appwriteCollectionId ,
                slug , 
                {title , content , featuredImage , status , userID}
            )
        } catch (error) {
            console.log(`Appwrite service:: updatePost::` , error);
        }
    }

    async deletePost (slug){
        try {
            await this.databases
            .deleteDocument(
                AppWriteconf.appwriteDatabaseId ,
                AppWriteconf.appwriteCollectionId ,
                slug
            )
            return true
        } catch (error) {
            console.log(`Appwrite service:: deletePost::` , error);
            return false
        }
    }

    async getPost (slug){
        try {
            return await this.databases
            .getDocument(
                AppWriteconf.appwriteDatabaseId ,
                AppWriteconf.appwriteCollectionId ,
                slug
            )
           
        } catch (error) {
            console.log(`Appwrite service:: getPost::` , error);
            return false
        }
    }


    // for applying queries , u have to do indexing in database , in our case our indexed values is "status"
    async getPosts (queries = [Query.equal("status" , "active")] ){
        try {
            return await this.databases
            .listDocuments(
                AppWriteconf.appwriteDatabaseId ,
                AppWriteconf.appwriteCollectionId ,
                queries
            )
           
        } catch (error) {
            console.log(`Appwrite service:: allPosts::` , error);
            return false
        }
    }

    //file upload service

    async uploadFile (file){
        try {
            return await this.storage
            .createFile(
                AppWriteconf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(`Appwrite error at uploadFile :: , ${error} `);
        }
    }

    async deleteFile (fileId){
        try {
            await this.storage
            .deleteFile(
                AppWriteconf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log(`Appwrite error at deleteFile :: , ${error} `);
            return false
        }
    }

    async getFilePreview (fileId){
       
        return this.storage
        .getFilePreview(
            AppWriteconf.appwriteBucketId,
            fileId
        )
    }
    
}


const service = new Service()


export default service
