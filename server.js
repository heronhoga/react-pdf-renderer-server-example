import express from 'express';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import MyDocument from './mydocument.js';

const app = express();

app.get('/download-pdf', async (req, res) => {
  try {

    const pdfStream = await ReactPDF.renderToStream(<MyDocument />);


    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');


    pdfStream.pipe(res);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
