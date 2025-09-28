import { SetMetadata } from '@nestjs/common';
import { TRole } from 'src/domain/user/user-entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TRole[]) => SetMetadata(ROLES_KEY, roles);
