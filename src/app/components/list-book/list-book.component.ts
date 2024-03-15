import { Component, OnInit, ViewChild } from '@angular/core';
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
export class ListBookComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'resumo', 'editora', 'autores'];
  dataSource = new MatTableDataSource<Book>([]);
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.dataService.books$.subscribe((livros: Book[]) => {
      setTimeout(() => {
        this.dataSource.data = livros;
        this.dataSource.sort = this.sort;
        this.updatePaginator();
        this.isLoading = false;
      }, 3000);
    });
  }

  updatePaginator() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.length = this.dataSource.filteredData.length;
    }
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
  }
}
