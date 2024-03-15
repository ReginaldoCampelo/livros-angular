import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.entity';
import { BookService } from 'src/app/services/book.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent {
  livroForm: FormGroup;
  limitString: number = 65;
  editoras: string[] = [];
  autores: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private dataService: BookService
  ) {
    this.livroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      resumo: ['', Validators.required],
      editora: ['', Validators.required],
      autores: ['', Validators.required],
    });

    this.dataService
      .getEditoras()
      .subscribe((editoras) => (this.editoras = editoras));
    this.dataService
      .getAutores()
      .subscribe((autores) => (this.autores = autores));
  }

  onSubmit() {
    if (this.livroForm.valid) {
      let currentId: number = 0;
      this.dataService.getBooks().subscribe((books) => {
        currentId = books.length + 1;

        const autoresValue = this.livroForm.value.autores;
        const autores =
          typeof autoresValue === 'string'
            ? autoresValue.split(',')
            : autoresValue;

        const newBook: Book = {
          id: currentId,
          titulo: this.livroForm.value.titulo,
          resumo: this.livroForm.value.resumo,
          editora: this.livroForm.value.editora,
          autores: autores,
        };

        this.dataService.addBook(newBook);

        this.snackBar.open('Livro cadastrado com sucesso!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
        });

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '250px',
          data: 'Deseja cadastrar outro livro?',
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.livroForm.reset();
            this.resetValidation();
          } else {
            this.router.navigate(['/list']);
          }
        });
      });
    } else {
      this.snackBar.open(
        'Por favor, preencha todos os campos obrigatórios.',
        'Fechar',
        {
          duration: 8500,
          verticalPosition: 'top',
        }
      );
    }
  }

  resetValidation() {
    Object.keys(this.livroForm.controls).forEach((key) => {
      this.livroForm.get(key)?.setErrors(null);
    });
  }

  isInvalidAndTouched(fieldName: string): boolean {
    const formControl = this.livroForm.get(fieldName);
    return !!formControl?.invalid && !!formControl?.touched;
  }

  updateResumoCount(event: Event) {
    const resumoControl = this.livroForm.get('resumo');
    if (resumoControl) {
      const resumoValue = (event.target as HTMLTextAreaElement).value;
      resumoControl.setValue(resumoValue.substring(0, this.limitString), {
        emitEvent: false,
      });
    }
  }
}
