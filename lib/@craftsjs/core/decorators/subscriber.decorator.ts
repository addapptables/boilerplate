import { SetMetadata } from '@nestjs/common';

export const IS_SUBSCRIBER = 'IS_SUBSCRIBER';
export const Subscriber = () => SetMetadata(IS_SUBSCRIBER, true);
