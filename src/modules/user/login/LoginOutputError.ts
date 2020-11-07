import { InputType, Field } from "type-graphql";

@InputType()
export class LoginOutputError {
    
    @Field()
    error : string

    constructor(error : string) {
       this.error = error;
    }
}