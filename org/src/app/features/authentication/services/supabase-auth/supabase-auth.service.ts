import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY,
    );
  }

  async login(email: string, password: string) {
    return await this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
  }

  // TODO: Unitarias
  async register(email: string, password: string) {
    return await this.supabaseClient.auth.signUp({
      email,
      password,
    });
  }

  async logout() {
    return this.supabaseClient.auth.signOut();
  }

  async getUserSession() {
    return await this.supabaseClient.auth.getSession();
  }

  async initializeUserRole(
    userId: string,
    name: string,
    justification: string,
    email: string,
  ) {
    return this.supabaseClient
      .from('user_role')
      .insert({ user_id: userId, role: 'pending', name, justification, email });
  }

  async getUserRole(userId: string) {
    return this.supabaseClient.from('user_role').select().eq('user_id', userId);
  }

  async getAllPendingUsers() {
    return this.supabaseClient.from('user_role').select().eq('role', 'pending');
  }

  async grantUserAccess(userId: string) {
    return this.supabaseClient
      .from('user_role')
      .update({ role: 'user' })
      .eq('user_id', userId);
  }
}
