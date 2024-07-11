import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';

export const AUTH_KEY_TYPE = 'authType';

export const Auth = (...args: AuthType[]) => SetMetadata(AUTH_KEY_TYPE, args);
