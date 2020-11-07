import { Field, ObjectType } from "type-graphql";
import { User } from "../../../entity/User";

@ObjectType()
export class LoginOutput {
    @Field()
    user: User;

    @Field()
    accessToken: string;

    @Field()
    refreshToken: string
}

// @ObjectType()
// class FieldError {
//   @Field()
//   field: string;
//   @Field()
//   message: string;
// }

// @ObjectType()
// class UserResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => User, { nullable: true })
//   user?: User;
// }