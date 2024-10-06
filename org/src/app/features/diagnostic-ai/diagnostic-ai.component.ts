import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-diagnostic-ai',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './diagnostic-ai.component.html',
})
export class DiagnosticAiComponent {}
