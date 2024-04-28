import { Component, OnInit } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeService } from '../coffee.service';


@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css']
})

export class CoffeeListComponent implements OnInit {
  coffees: Array<Coffee> = [];
  origenCoffees: number = 0;
  blendCoffees: number = 0;

  constructor(private coffeeService: CoffeeService) { }

  ngOnInit() {
    this.getCoffes();
  }
  
  getCoffes(): void {
    this.coffeeService.getCoffees().subscribe((coffees) => {
      this.coffees = coffees;
      this.origenCoffees = this.coffees.filter(coffee => coffee.tipo === "Café de Origen").length;
      this.blendCoffees = this.coffees.filter(coffee => coffee.tipo === "Blend").length;
    });
  }

}
