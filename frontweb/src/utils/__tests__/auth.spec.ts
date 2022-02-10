import { Role } from 'types/role';
import { hasAnyRoles } from 'utils/auth';
import * as TokenModule from 'utils/token';

describe('hasAnyRoles tests', () => {
  test('should return true when empty list', () => {
    const roles: any[] = [];
    const result = hasAnyRoles(roles);
    expect(result).toEqual(true);
  });

  test('should return true when user has given role', () => {
    // versão mockada da getTokenData()
    jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
      exp: 0, // não interessa para este teste
      user_name: '', // também não interessa para este teste
      authorities: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
    });
    const roles: Role[] = ['ROLE_ADMIN'];

    const result = hasAnyRoles(roles);
    expect(result).toEqual(true);
  });
});
