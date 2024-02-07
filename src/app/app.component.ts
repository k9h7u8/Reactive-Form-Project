import { black, blue } from './../../node_modules/@colors/colors/index.d';
import { doc } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, StyleDictionary } from 'pdfmake/interfaces';

import { DataService } from '../app/shared/data.service'

(pdfMake as any).vfs =pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dataService: DataService  ) {}

  generatePdf(): void {
    const registerData = this.dataService.getRegisterData();
    const educationData = this.dataService.getEducationData();

    //Map education details array
    const educationTableBody = educationData.educationDetails.map((eduDetail:any) => [
      eduDetail.degree,
      eduDetail.specification,
      eduDetail.institute,
      eduDetail.location,
      eduDetail.cgpa
    ]);

    // Use registerData and educationData to generate the PDF
    let docDefinition: TDocumentDefinitions = {
    content: [
      {text: 'User Details: ', style: 'header',},
      {
        style: 'tableExample',
        table: {
          body: [
            ['Name', 'Email', 'Mobile', 'Gender'],
            [`${registerData.first_name + " " + registerData.last_name}`, registerData.email, registerData.mobile, registerData.gender]
          ],
        }
      },
      {text: 'Education Details: ', style: 'header'},
      {
        style: 'tableExample',
        table: {
          body: [
            ['Degree', 'Specification', 'Institute', 'Location', 'CGPA'],
            //Mapped array of education details
            ...educationTableBody
          ],
        }
      },
    ],
    styles: {
      header: {
        bold: true,
        fontSize: 14,
        margin: [10, 10, 10, 10],
      },
      tableExample: {
        margin: [10, 10, 10, 10], // Adjust the margins as needed
        border: 1, // Add border to the table
        fontSize: 10,
      },
    } as StyleDictionary, 
    pageMargins: [10, 10, 10, 10], // Adjust margins as needed
    defaultStyle: {
      fontSize: 10,
    },
    background: function (currentPage, pageSize) {
      // Draw a border around the entire page
      return {
        canvas: [
          {
            type: 'line',
            x1: 10,
            y1: 10,
            x2: pageSize.width - 10,
            y2: 10,
            lineWidth: 1,
            lineColor: 'black',
          },
          {
            type: 'line',
            x1: pageSize.width - 10,
            y1: 10,
            x2: pageSize.width - 10,
            y2: pageSize.height - 10,
            lineWidth: 1,
            lineColor: 'black',
          },
          {
            type: 'line',
            x1: pageSize.width - 10,
            y1: pageSize.height - 10,
            x2: 10,
            y2: pageSize.height - 10,
            lineWidth: 1,
            lineColor: 'black',
          },
          {
            type: 'line',
            x1: 10,
            y1: pageSize.height - 10,
            x2: 10,
            y2: 10,
            lineWidth: 1,
            lineColor: 'black',
          },
        ],
      };
    },
    };
    pdfMake.createPdf(docDefinition).open();
  }
}
