import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  User = 'User',
  Admin = 'Admin',
}

export const ROLES_KEY = 'user_roles';
export const UserRoles = (...roles: UserRole[]) =>
  SetMetadata(ROLES_KEY, roles);
