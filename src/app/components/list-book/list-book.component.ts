import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book.entity';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss'],
})
export class ListBookComponent {
  livros: Book[] = [];
  displayedColumns: string[] = ['titulo', 'resumo', 'editora', 'autores'];
  dataSource = new MatTableDataSource<Book>(this.livros);
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: BookService) {}

  ngAfterViewInit() {
    this.dataService.getBooks().subscribe((livros: Book[]) => {
      this.livros = livros;
      this.dataSource.data = this.livros;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }
}
