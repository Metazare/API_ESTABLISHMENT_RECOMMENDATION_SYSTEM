import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Establishments {
  @Prop({ required: true, unique: false })
  name: string; 
  
  @Prop({ required: true, unique: false })
  description: string;

  @Prop({ required: true, unique: false })
  address: string;

  @Prop({ required: true, unique: false })
  barangay: string;

  @Prop({ required: true, unique: false })
  phone: string;

  @Prop({ required: true, unique: false })
  type : string;

  @Prop({ required: true, unique: false })
  picture: [string];

  @Prop({ required: true, unique: false })
  open: string;

  @Prop({ required: true, unique: false })
  close: string;

  @Prop({ required: true, unique: false })
  facebook: string;

  @Prop({ required: true, unique: false })
  creatorId: string;
}

export const EstablishmentsSchema = SchemaFactory.createForClass(Establishments);