import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Graph from './components/Graph';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
function App() {
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const [jsonData, setJsonData] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true)
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setJsonData(data);
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();

  }, [apiUrl]);
  const handlePrint = () => {
    setIsClicked(true);
    generatePDF();
  }
  function generatePDF() {
    var doc = new jsPDF();
    doc.setFontSize(33);
    doc.setFillColor(0, 93, 255);
    doc.rect(6, 12, doc.internal.pageSize.width - 12, 1, 'F'); // Top margin
    doc.rect(6, doc.internal.pageSize.height - 12, doc.internal.pageSize.width - 12, 1, 'F'); // Bottom margin
    doc.setFontSize(12);
    const pageCount = doc.internal.getNumberOfPages();
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const header1 = 'RealAssist.AI';
      const header2 = '123 Main Street, Dover, NH 03820-4667';
      const currentDate = new Date();
      const formattedDate = currentDate.toDateString();
      const footer1 = `Report Generated on ${formattedDate}`;
      const footer2 = `RealAssist Property Report | Page ${i} `;
      const footer3 = `of ${pageCount}`;



      // Header
      const base64Img = 'data:image/jpeg;base64,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'
      if (base64Img) {
        doc.addImage(base64Img, 'JPEG', 6, 4, 5, 5); // Adjust position and size as needed
      }
      doc.text(header1, 14, 5, { baseline: 'top' });
      doc.setFontSize(10);
      doc.text(header2, pageWidth - 70, 5, { baseline: 'top' });


      // Footer
      doc.setTextColor(20, 99, 255)
      doc.text(footer1, 6, pageHeight - 5, { baseline: 'bottom' });
      doc.setTextColor(9, 14, 36)

      doc.text(footer2, pageWidth - (doc.getTextWidth(footer2) + doc.getTextWidth(footer3) + 6), pageHeight - 5, { baseline: 'bottom' });
      doc.setTextColor(98, 110, 153)
      doc.text(footer3, pageWidth - (doc.getTextWidth(footer3) + 6), pageHeight - 5, { baseline: 'bottom' });

    }
    const input = document.querySelector("#graph");
    html2canvas(input, {
      scale: 2,
    }).then(canvas => {
      const img = canvas.toDataURL("image/png");
      doc.addImage(
        img,
        "png",
        5, ((pageHeight / 2) - 60), 200, 120
      );
      doc.save("Graph-report.pdf");
    })
  }
  return (
    <div className="App">
      {!isLoading && Object.keys(jsonData).length !== 0 && <Button handlePrint={handlePrint} />}
      {isLoading && <p>Loading...</p>}
      <Graph jsonData={jsonData} id="graph" />
    </div>
  );
}

export default App;
