import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {

    @Query(() => [User])
    async user() {
        const users = await User.find();
        return users;
    }

    @Mutation(() => User)
    async register(
        @Arg('data') { firstName, lastName, password, email }: RegisterInput,
    ): Promise<User> {

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        return user;
    }
}