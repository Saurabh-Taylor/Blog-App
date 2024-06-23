import AppWriteconf from "../conf";

import { Client , Account , ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(AppWriteconf.appwriteUrl)
            .setProject(AppWriteconf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount ({email , password , name}){
        try {
            //ID is necessary as first Parameter , can look on docs as well 
            const userAccount = await this.account.create(ID.unique() , email , password , name ) 
            if(userAccount) {
                //call another method - which will directly create the account and login the userAccount

                return this.login({email , password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login ({email , password}){
        try {
            return await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log(`Appwrite Error at get Current:: user method::` , error);
        }
        return null
    }

    async logout(){
        try {
           return await this.account.deleteSessions()
        } catch (error) {
            console.log(`Appwrite Error at get logout:: user method::` , error);
        }
    }

}

export const authService =  new AuthService()


export default authService