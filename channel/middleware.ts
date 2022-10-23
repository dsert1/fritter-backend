import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ChannelCollection from '../Channel/collection';

/**
 * Checks if a Channel with ChannelId is req.params exists
 */
const isChannelExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.ChannelId);
  const Channel = validFormat ? await ChannelCollection.findOne(req.params.ChannelId) : '';
  if (!Channel) {
    res.status(404).json({
      error: {
        ChannelNotFound: `Channel with Channel ID ${req.params.ChannelId} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the Channel in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidChannelContent = (req: Request, res: Response, next: NextFunction) => {
  const {content} = req.body as {content: string};
  if (!content.trim()) {
    res.status(400).json({
      error: 'Channel content must be at least one character long.'
    });
    return;
  }

  if (content.length > 140) {
    res.status(413).json({
      error: 'Channel content must be no more than 140 characters.'
    });
    return;
  }

  next();
};

// /**
//  * Checks if the current user is the author of the Channel whose ChannelId is in req.params
//  */
// const isValidChannelModifier = async (req: Request, res: Response, next: NextFunction) => {
//   const Channel = await ChannelCollection.findOne(req.params.ChannelId);
//   const userId = Channel.authorId._id;
//   if (req.session.userId !== userId.toString()) {
//     res.status(403).json({
//       error: 'Cannot modify other users\' Channels.'
//     });
//     return;
//   }

//   next();
// };

export {
  isValidChannelContent,
  isChannelExists,
  // isValidChannelModifier
};
