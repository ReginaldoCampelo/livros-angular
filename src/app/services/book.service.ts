import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Book } from '../models/book.entity';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(
    []
  );
  books$: Observable<Book[]> = this.booksSubject.asObservable();

  constructor() {
    this.getBooks().subscribe((books) => this.booksSubject.next(books));
  }

  getBooks(): Observable<Book[]> {
    const livros = [
      {
        id: 1,
        titulo: 'Livro 1',
        resumo: 'Resumo do Livro 1',
        editora: 'Editora A',
        autores: ['Autor 1', 'Autor 2'],
      },
      {
        id: 2,
        titulo: 'Livro 2',
        resumo: 'Resumo do Livro 2',
        editora: 'Editora B',
        autores: ['Autor 3'],
      },
      {
        id: 3,
        titulo: 'Livro 3',
        resumo: 'Resumo do Livro 3',
        editora: 'Editora C',
        autores: ['Autor 4', 'Autor 5', 'Autor 6'],
      }
    ];

    return of(livros);
  }

  getEditoras(): Observable<string[]> {
    const editoras = [
      'Editora 1',
      'Editora 2',
      'Editora 3',
      'Editora 4',
      'Editora 5',
    ];
    return of(editoras);
  }

  getAutores(): Observable<string[]> {
    const autores = [
      'Autor 1',
      'Autor 2',
      'Autor 3',
      'Autor 4',
      'Autor 5',
      'Autor 6',
      'Autor 7',
      'Autor 8',
    ];
    return of(autores);
  }

  addBook(book: Book): void {
    const currentBooks = this.booksSubject.getValue();
    const updatedBooks = [...currentBooks, book];
    this.booksSubject.next(updatedBooks);
  }
}
