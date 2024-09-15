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

  async logout() {
    return this.supabaseClient.auth.signOut();
  }

  async getUserSession() {
    return await this.supabaseClient.auth.getSession();
  }
}
