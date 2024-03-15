import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.entity';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getBooks(): Observable<Book[]> {
    const livros = [
      { id: 1, titulo: 'Livro 1', resumo: 'Resumo do Livro 1', editora: 'Editora A', autores: ['Autor 1', 'Autor 2'] },
      { id: 2, titulo: 'Livro 2', resumo: 'Resumo do Livro 2', editora: 'Editora B', autores: ['Autor 3'] },
      { id: 3, titulo: 'Livro 3', resumo: 'Resumo do Livro 3', editora: 'Editora C', autores: ['Autor 4', 'Autor 5', 'Autor 6'] },
      { id: 4, titulo: 'Livro 4', resumo: 'Resumo do Livro 4', editora: 'Editora D', autores: ['Autor 7'] },
      { id: 5, titulo: 'Livro 5', resumo: 'Resumo do Livro 5', editora: 'Editora E', autores: ['Autor 8', 'Autor 9'] }
    ];

    return of(livros);
  }
}
