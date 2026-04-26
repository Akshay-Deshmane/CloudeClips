import mongoose, {Schema, model, models,  HydratedDocument} from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser {
    email : string;
    password : string;
    _id? : string;
    createdAt? : Date;
    updatedAt? : Date;
}


const userSchema = new Schema<IUser>(
{
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
}, 
{
    timestamps : true
}
);

// pre is the hook that is used to perform 
// some operation before saving the user to DB
// here we are doing the hashing of the password before storing it to DB 
// after hashing we can store it in the DB 

userSchema.pre("save", async function (this: HydratedDocument<IUser>) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;

