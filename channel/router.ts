import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import ChannelCollection from './collection';
import * as userValidator from '../user/middleware';
import * as ChannelValidator from '../Channel/middleware';
import * as util from './util';
var ip = require('ip');
const iplocate = require("node-iplocate");


const router = express.Router();

/**
 * Create a new Channel.
 *
 * @name POST /api/Channels
 *
 * @param {string} content - The content of the Channel
 * @return {ChannelResponse} - The created Channel
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the Channel content is empty or a stream of empty spaces
 * @throws {413} - If the Channel content is more than 140 characters long
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    ChannelValidator.isValidChannelContent
  ],
  async (req: Request, res: Response) => {
    const Channel = await ChannelCollection.addOne(name, desc);

    res.status(201).json({
      message: 'Your Channel was created successfully.',
      Channel: util.constructChannelResponse(Channel)
    });
  }
);

/**
 * Delete a Channel
 *
 * @name DELETE /api/Channels/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the Channel
 * @throws {404} - If the ChannelId is not valid
 */
router.delete(
  '/:ChannelId?',
  [
    userValidator.isUserLoggedIn,
    ChannelValidator.isChannelExists,
    // ChannelValidator.isValidChannelModifier
  ],
  async (req: Request, res: Response) => {
    await ChannelCollection.deleteOne(req.params.ChannelId);
    res.status(200).json({
      message: 'Your Channel was deleted successfully.'
    });
  }
);
// /api/channels/getModerator?channel=${fields.channel}
/**
 * Get the moderator of a channel
 */
router.get(
  '/getModerator',
  async (req: Request, res: Response) =>  {
    const channel = req.query.channel;
    const mods = await ChannelCollection.findAllModerators(channel);
    if (!mods) {
      res.status(400).json("No channel with that name or no moderators.");
      return;
    }
    res.status(200).json(mods);
  }
);



export {router as ChannelRouter};
