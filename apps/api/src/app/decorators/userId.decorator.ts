import { SetMetadata } from '@nestjs/common';

export const UserId = (userId: string) => SetMetadata('ownerId', userId);
