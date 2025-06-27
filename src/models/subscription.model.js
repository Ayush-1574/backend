import mongoose , {Schema} from "mongoose"

const SubscribeSchema = new Schema({

    subscriber : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
    ,
    channel : {
         type : Schema.Types.ObjectId, // one to whom subscriber is subscribing
        ref : "User"
    }

    ,

} , {timestamps : true})

export const SubUser = mongoose.model("SubUser", SubscribeSchema)