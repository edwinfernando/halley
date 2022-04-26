import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabFavoritosPage } from './tab-favoritos.page';

describe('TabFavoritosPage', () => {
  let component: TabFavoritosPage;
  let fixture: ComponentFixture<TabFavoritosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabFavoritosPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabFavoritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
