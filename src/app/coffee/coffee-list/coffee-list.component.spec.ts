/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CoffeeListComponent } from './coffee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Coffee } from '../coffee';
import { CoffeeService } from '../coffee.service';
import { faker } from '@faker-js/faker';

describe('CoffeeListComponent', () => {
  let component: CoffeeListComponent;
  let fixture: ComponentFixture<CoffeeListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CoffeeListComponent ],
      providers: [ CoffeeService ]
    })
    .compileComponents();
  }));

  //  function generateCoffee(): any {
  //   return {
  //     id: faker.string.uuid(), // Genera un ID único
  //     title: faker.word.noun(), // Genera un título de película aleatorio
  //     poster: faker.image.url(), // Genera una URL de póster de película aleatoria
  //     duration: faker.random.numeric(), // Genera una duración aleatoria en minutos
  //     country: faker.location.country(), // Genera un país aleatorio
  //     releaseDate: faker.date.soon({ refDate: '2023-01-01T00:00:00.000Z' }), // Genera una fecha de lanzamiento aleatoria en formato ISO
  //     popularity: faker.random.numeric()  // Genera un nivel de popularidad aleatorio
  //   };
  // }   

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeListComponent);
    component = fixture.componentInstance;
    const numberOfElements = 3;

    for(let i = 0; i < numberOfElements; i++) {
      const coffee = new Coffee(
        faker.number.int(),
        faker.person.firstName(),
        faker.location.country(),
        faker.location.city(),
        faker.string.uuid(),
        faker.number.int(),
        faker.image.url()        
      );
      component.coffees.push(coffee);   
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table row with 4 th elements', () => {
    // Obtener la tabla desde el componente
    const table = fixture.debugElement.query(By.css('table'));
  
    // Obtener todas las filas de la tabla
    const rows = table.queryAll(By.css('tr'));
  
    // Filtrar las filas que contienen exactamente 4 elementos th
    const rowWith4Th = rows.find(row => {
      const thElements = row.queryAll(By.css('th'));
      return thElements.length === 4;
    });
  
    // Verificar que se encontró una fila con 4 th
    expect(rowWith4Th).toBeTruthy();
  });


  it('should have 3 tr elements in tbody', () => {
    // Obtener el tbody desde el componente
    const tbody = fixture.debugElement.query(By.css('tbody'));

    // Obtener todos los tr dentro del tbody
    const trElements = tbody.queryAll(By.css('tr'));

    // Verificar que haya exactamente 3 tr elements
    expect(trElements.length).toBe(3);
  });



it('should display Coffee names correctly', () => {
  // Obtener todos los elementos td en la segunda columna de la tabla
  const tdElements = fixture.debugElement.queryAll(By.css('td:nth-child(2)'));
  
  // Verificar que el número de elementos coincide con el número de coffees
  expect(tdElements.length).toEqual(component.coffees.length);

  // Iterar sobre los elementos y verificar que el texto coincide con los nombres de los coffees
  tdElements.forEach((td, index) => {
      const CoffeeName = td.nativeElement.textContent.trim(); // Obtener el texto del td y eliminar los espacios en blanco alrededor
      expect(CoffeeName).toEqual(component.coffees[index].nombre); // Verificar que el texto coincide con el nombre del coffee correspondiente
  });
});

});
