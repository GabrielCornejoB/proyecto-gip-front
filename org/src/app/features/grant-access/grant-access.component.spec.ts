import { GrantAccessComponent } from './grant-access.component';
import { SupabaseAuthService } from '../authentication/services/supabase-auth/supabase-auth.service';

describe('GrantAccessComponent', () => {
  let component: GrantAccessComponent;
  let service: SupabaseAuthService;

  beforeEach(() => {
    service = {
      getAllPendingUsers: jest.fn(),
      grandUserAccess: jest.fn(),
    } as never;
    component = new GrantAccessComponent(service);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
