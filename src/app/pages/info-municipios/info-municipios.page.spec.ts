import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoMunicipiosPage } from './info-municipios.page';

describe('InfoMunicipiosPage', () => {
  let component: InfoMunicipiosPage;
  let fixture: ComponentFixture<InfoMunicipiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMunicipiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoMunicipiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
