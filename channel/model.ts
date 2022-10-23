import {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Channel
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Channel on the backend
export type Channel = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  name: string,
  desc: string,
  dateCreated: Date;
  users: Array<User>,
  moderators: Array<User>,
  inviteLink: string
};

// Mongoose schema definition for interfacing with a MongoDB table
// Channels stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ChannelSchema = new Schema<Channel>({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  // The author userId
  users: {
    type: [],
    required: false
  },
  moderators: {
    type: [],
    required: false
  },
  inviteLink: {
    type: String,
    required: false
  },
  // The date the Channel was created
  dateCreated: {
    type: Date,
    required: true
  },
});

const ChannelModel = model<Channel>('Channel', ChannelSchema);
export default ChannelModel;
