import React, { useEffect } from "react";
import { jsPDF } from "jspdf";

function App() {
  useEffect(() => {
    // Disable Right Click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // Disable Ctrl + S / Cmd + S (Save As)
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        alert("Saving is disabled!");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("React Print App", 10, 10);
    doc.text("This page is protected from being saved, but can be printed.", 10, 20);
    
    // Auto-download PDF
    const pdfFileName = "document.pdf";
    doc.save(pdfFileName);
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
