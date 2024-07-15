import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Url } from "url";

@Schema()
export class User {
  @Prop({required:true,unique:false})
  name:string;
  @Prop({required:true,unique:false})
  password:string;
  @Prop({required:true,unique:true})
  email:string;
  @Prop({required:true,unique:false})
  role:string;
  @Prop({required:true,unique:false})
  image:string;
  @Prop({required:false,unique:false})
  createdAt:Date;
  // @Prop({required:true,unique:false})
  // updatedAt:Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
