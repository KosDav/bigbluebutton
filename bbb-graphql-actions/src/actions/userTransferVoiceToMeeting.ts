import { RedisMessage } from '../types';
import {throwErrorIfInvalidInput} from "../imports/validation";

export default function buildRedisMessage(sessionVariables: Record<string, unknown>, input: Record<string, unknown>): RedisMessage {
  throwErrorIfInvalidInput(input,
      [
        {name: 'fromMeetingId', type: 'string', required: true},
        {name: 'toMeetingId', type: 'string', required: true},
      ]
  )

  const eventName = 'TransferUserToMeetingRequestMsg';

  const routing = {
    meetingId: sessionVariables['x-hasura-meetingid'] as String,
    userId: sessionVariables['x-hasura-userid'] as String
  };

  const header = {
    name: eventName,
    meetingId: routing.meetingId,
    userId: routing.userId
  };

  const body = {
    userId: routing.userId,
    fromMeetingId: input.fromMeetingId,
    toMeetingId: input.toMeetingId
  };

  return { eventName, routing, header, body };
}
