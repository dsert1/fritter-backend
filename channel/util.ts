import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Channel} from '../Channel/model';
import {Types} from 'mongoose';
import { User } from 'user/model';

// Update this if you add a property to the Channel type!
type ChannelResponse = {
  _id: string; // MongoDB assigns each object this ID on creation
  name: string,
  desc: string,
  dateCreated: Date;
  users: Array<User>,
  moderators: Array<User>,
  inviteLink: string
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Channel object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Channel>} Channel - A Channel
 * @returns {ChannelResponse} - The Channel object formatted for the frontend
 */
const constructChannelResponse = (Channel: HydratedDocument<Channel>): ChannelResponse => {
  const ChannelCopy: Channel = {
    ...Channel.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete ChannelCopy._id;
  return {
    ...ChannelCopy,
    _id: ChannelCopy._id.toString(),
    name: ChannelCopy.name,
    dateCreated: new Date(formatDate(Channel.dateCreated)),
    users: ChannelCopy.users,
    inviteLink: ChannelCopy.inviteLink
  };
};

export {
  constructChannelResponse
};
