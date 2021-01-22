import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifymodalPage } from './modifymodal.page';

describe('ModalpopupPage', () => {
  let component: ModifymodalPage;
  let fixture: ComponentFixture<ModifymodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifymodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifymodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
