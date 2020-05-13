import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';


export interface IUser extends mongoose.Document {
    name: string,
    password: string,
    email: string,
    tokens:[{token: string}],
    friends: string[],
    generateAuthToken(): string,
    verifyAuthToken(): void
}

export interface IUserModel extends mongoose.Model<IUser>{
    findByCredentials(email: string, password: string): IUser;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    tokens: [{
        token: {
            type: String,
            required: false
        }
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    const token = jsonwebtoken.sign({_id: this._id}, process.env.JWT_KEY, {expiresIn: 60 * 30});
    this.tokens = [{token}].concat(this.tokens);
    this.save();
    return token;
}

userSchema.methods.verifyAuthToken = async function(callbackSuccess?: () => {}, callbackError?: () => {}) {
    const actualToken = this.tokens[0].token;
    try {
        jsonwebtoken.verify(actualToken, process.env.JWT_KEY);
        callbackSuccess();
    } catch (err) {
        callbackError();
    }
}

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await User.findOne({email});
    console.log('user: ', user);
    if (!user) {
        throw new Error('Invalid login credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid password');
    }

    return user;
}

const User = mongoose.model<IUser, IUserModel>('User', userSchema);


export default User;