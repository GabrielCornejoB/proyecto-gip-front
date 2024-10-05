import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataEncryptionComponent } from './data-encryption.component';

describe('DataEncryptionComponent', () => {
  let component: DataEncryptionComponent;
  let fixture: ComponentFixture<DataEncryptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEncryptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataEncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
