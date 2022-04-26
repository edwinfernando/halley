import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabPromocionesPage } from './tab-promociones.page';

describe('TabPromocionesPage', () => {
  let component: TabPromocionesPage;
  let fixture: ComponentFixture<TabPromocionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPromocionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabPromocionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
