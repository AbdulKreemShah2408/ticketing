import mongoose from "mongoose";


interface PayementAttrs{
 orderId:string;
 stripeId:string;
}


interface PaymentDoc extends mongoose.Document{
orderId:string;
 stripeId:string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc>{
  build(attrs:PayementAttrs):PaymentDoc;

}

const paymentSchema=new mongoose.Schema({
    orderId:{
        required:true,
        type:String,
    },
    stripeId:{
        required:true,
        type:String,
    }
},{
    toJSON:{
        transform(doc,ret:any){
            ret.id=ret._id;
            delete ret._id;
        }
    }
});

paymentSchema.statics.build=(attrs:PayementAttrs)=>{
  return new Payment(attrs);
}

const Payment=mongoose.model<PaymentDoc,PaymentModel>('Payment',paymentSchema);

export {Payment};