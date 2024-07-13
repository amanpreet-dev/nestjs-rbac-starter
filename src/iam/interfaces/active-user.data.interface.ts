import { Role } from 'src/users/enums/role.enum';

export interface ActiveUserData {
  sub: number;
  email: string;
  role: Role;
}
