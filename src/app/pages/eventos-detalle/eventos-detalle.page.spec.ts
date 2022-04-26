import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventosDetallePage } from './eventos-detalle.page';

describe('EventosDetallePage', () => {
  let component: EventosDetallePage;
  let fixture: ComponentFixture<EventosDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventosDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
