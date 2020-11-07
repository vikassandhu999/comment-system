import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { LoginInput } from "./login/LoginInput";
import { LoginOutput } from "./login/LoginOutput";

@Resolver()
export class LoginResolver {

    @Query(() => [User])
    async eser() {
        const users = await User.find();
        return users;
    }

    @Mutation(() => LoginOutput , { nullable : true })
    async login(
        @Arg('data') { email, password }: LoginInput,
    ): Promise<LoginOutput | null> {

        const user = await User.findOne({ where: { email } });

        if (!user)
            return null;


        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword)
            return null;


        return { user: user, accessToken: "token is secret" , refreshToken : "Assdkcvjjnvjnsdjcnsjvdn" } as LoginOutput;
    }
}
