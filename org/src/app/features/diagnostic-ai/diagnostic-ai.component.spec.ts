import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosticAiComponent } from './diagnostic-ai.component';

describe('DiagnosticAiComponent', () => {
  let component: DiagnosticAiComponent;
  let fixture: ComponentFixture<DiagnosticAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticAiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
