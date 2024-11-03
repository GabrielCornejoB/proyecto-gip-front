import { GrantAccessComponent } from './grant-access.component';
import { SupabaseAuthService } from '../authentication/services/supabase-auth/supabase-auth.service';

describe('GrantAccessComponent', () => {
  let component: GrantAccessComponent;
  let service: SupabaseAuthService;

  beforeEach(() => {
    service = {
      getAllPendingUsers: jest.fn(),
      grantUserAccess: jest.fn(),
    } as unknown as SupabaseAuthService;

    component = new GrantAccessComponent(service);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should populate pendingUsers with data returned from getAllPendingUsers', async () => {
      const mockUsers = [{ user_id: 'user1' }, { user_id: 'user2' }];
      (service.getAllPendingUsers as jest.Mock).mockResolvedValue({
        data: mockUsers,
      });

      const nextSpy = jest.spyOn(component.pendingUsers, 'next');

      await component.ngOnInit();

      expect(service.getAllPendingUsers).toHaveBeenCalled();
      expect(nextSpy).toHaveBeenCalledWith(mockUsers);
    });

    it('should not update pendingUsers if getAllPendingUsers returns no data', async () => {
      (service.getAllPendingUsers as jest.Mock).mockResolvedValue({
        data: null,
      });

      const nextSpy = jest.spyOn(component.pendingUsers, 'next');

      await component.ngOnInit();

      expect(service.getAllPendingUsers).toHaveBeenCalled();
      expect(nextSpy).not.toHaveBeenCalled();
    });
  });

  describe('grantAccessToUser', () => {
    it('should remove user from pendingUsers and update isLoading$ on successful access grant', async () => {
      const userId = 'user1';
      const initialUsers = [{ user_id: 'user1' }, { user_id: 'user2' }];
      component.pendingUsers.next(initialUsers);

      (service.grantUserAccess as jest.Mock).mockResolvedValue({ error: null });

      const pendingUsersSpy = jest.spyOn(component.pendingUsers, 'next');
      const isLoadingSpy = jest.spyOn(component.isLoading$, 'next');

      await component.grantAccessToUser(userId);

      expect(isLoadingSpy).toHaveBeenNthCalledWith(1, true);
      expect(service.grantUserAccess).toHaveBeenCalledWith(userId);
      expect(pendingUsersSpy).toHaveBeenCalledWith([{ user_id: 'user2' }]);
      expect(isLoadingSpy).toHaveBeenNthCalledWith(2, false);
    });

    it('should not remove user from pendingUsers if access grant fails', async () => {
      const userId = 'user1';
      const initialUsers = [{ user_id: 'user1' }, { user_id: 'user2' }];
      component.pendingUsers.next(initialUsers);

      (service.grantUserAccess as jest.Mock).mockResolvedValue({
        error: { code: 'error' },
      });

      const pendingUsersSpy = jest.spyOn(component.pendingUsers, 'next');
      const isLoadingSpy = jest.spyOn(component.isLoading$, 'next');

      await component.grantAccessToUser(userId);

      expect(isLoadingSpy).toHaveBeenNthCalledWith(1, true);
      expect(service.grantUserAccess).toHaveBeenCalledWith(userId);
      expect(pendingUsersSpy).not.toHaveBeenCalledWith([{ user_id: 'user2' }]);
      expect(isLoadingSpy).toHaveBeenNthCalledWith(2, false);
    });
  });
});
