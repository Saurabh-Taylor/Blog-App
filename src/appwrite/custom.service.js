import conf from "../conf";

import { Client , Databases , ID , Storage , Query } from "appwrite";

export class Service{
    client = new Client()
    databases
    storage
     
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost ({title , slug , content , featuredImage , status , UserId}){
        try {
            return await this.databases
            .createDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                slug, 
                {title , content , featuredImage , status , UserId}
            )
        } catch (error) {
            console.log(`Appwrite service:: createPost::` , error);
        }
    }

    // we are taking slug as our documentId
    async updatePost (slug , {title , content , featuredImage , status , UserId}){
        try {
            return await this.databases
            .updateDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                slug , 
                {title , content , featuredImage , status , UserId}
            )
        } catch (error) {
            console.log(`Appwrite service:: updatePost::` , error);
        }
    }

    async deletePost (slug){
        try {
            await this.databases
            .deleteDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
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
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
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
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                queries
            )
           
        } catch (error) {
            console.log(`Appwrite service:: allPosts::` , error);
            return false
        }
    }

    //file upload service

    async uploadFile (file){
        console.log("FILE:::", file);
        console.log(conf.appwriteBucketId);
        console.log(conf.appwriteProjectId);
        console.log(typeof conf.appwriteBucketId);
        try {
            return await this.storage
            .createFile(
                conf.appwriteBucketId,
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
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log(`Appwrite error at deleteFile :: , ${error} `);
            return false
        }
    }

    getFilePreview (fileId){
       
        return this.storage
        .getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    
}


const service = new Service()


export default service
