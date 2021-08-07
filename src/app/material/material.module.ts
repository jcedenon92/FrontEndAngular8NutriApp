import { MatPaginatorImpl } from './mat-paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSortModule, MatPaginatorModule, MatCardModule, MatSnackBarModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatDividerModule, MatExpansionModule, MatDialogModule, MatPaginatorIntl, MatGridListModule, MatSelectModule, MatCellDef, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],exports:[
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class MaterialModule { }
