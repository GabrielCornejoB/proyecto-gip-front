import { SupabaseAuthService } from './supabase-auth.service';

jest.mock('@supabase/supabase-js', () => ({
  supabaseUrl: '',
  supabaseKey: '',
  createClient: jest.fn().mockImplementation(() => ({
    createClient: jest.fn(),
    auth: {
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
    },
  })),
}));

describe('SupabaseAuthService', () => {
  let service: SupabaseAuthService;

  beforeEach(() => {
    service = new SupabaseAuthService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login()', async () => {
    await service.login('test@mail.com', 'test-passw');

    expect(service.supabaseClient.auth.signInWithPassword).toHaveBeenCalledWith(
      {
        email: 'test@mail.com',
        password: 'test-passw',
      },
    );
  });

  it('logout()', async () => {
    await service.logout();

    expect(service.supabaseClient.auth.signOut).toHaveBeenCalled();
  });

  it('getUserSession()', async () => {
    await service.getUserSession();

    expect(service.supabaseClient.auth.getSession).toHaveBeenCalled();
  });
});
