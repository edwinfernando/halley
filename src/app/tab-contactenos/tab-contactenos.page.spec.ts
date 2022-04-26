import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabContactenosPage } from './tab-contactenos.page';

describe('TabContactenosPage', () => {
  let component: TabContactenosPage;
  let fixture: ComponentFixture<TabContactenosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabContactenosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabContactenosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
