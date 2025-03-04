
import React, { useEffect } from "react";
import { jsPDF } from "jspdf";

function App() {
  useEffect(() => {
    // Disable Right Click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // Disable Ctrl + S / Cmd + S (Save As)
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && (event.key === "s" || event.key === "p")) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePrint = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    doc.text("React Print App", 10, 10);
    doc.text("This page is protected from being saved, but can be printed.", 10, 20);
    
    // Ensure full-page visibility
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print</title>
          <style>
            body, html { margin: 0; padding: 0; width: 100%; height: 100%; }
            iframe { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
          <iframe id='pdf-frame'></iframe>
        </body>
        </html>
      `);
      printWindow.document.close();
      const pdfFrame = printWindow.document.getElementById("pdf-frame");
      pdfFrame.src = doc.output("datauristring");
      printWindow.onload = () => {
        pdfFrame.contentWindow.focus();
        pdfFrame.contentWindow.print();
        printWindow.close();
      };
    }
  };

  return (
    <div className="app-container">
      <h1>React Print App</h1>
      <p>This page is protected from being saved, but can be printed.</p>
      <button onClick={handlePrint}>Print Page</button>
    </div>
  );
}

export default App;
