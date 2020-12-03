import React, { useState, useLayoutEffect } from 'react'; 
import { Document, Page,pdfjs } from 'react-pdf'; 
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const url = 
"https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"

export default function App() { 
	
const [open, setOpen] = useState(false);
const [size, setSize] = useState(0);

const onOpenModal = () => setOpen(true);
const onCloseModal = () => setOpen(false);
 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
const [numPages, setNumPages] = useState(null); 
const [pageNumber, setPageNumber] = useState(1); 

useLayoutEffect(() => {
	function updateSize() {
	  setSize(window.innerWidth);
	}
	window.addEventListener('resize', updateSize);
	updateSize();
	return () => window.removeEventListener('resize', updateSize);
  }, []);

/*To Prevent right click on screen*/
document.addEventListener("contextmenu", (event) => { 
	event.preventDefault(); 
}); 
	
/*When document gets loaded successfully*/
function onDocumentLoadSuccess({ numPages }) { 
	setNumPages(numPages); 
	setPageNumber(1); 
} 

function changePage(offset) { 
	setPageNumber(prevPageNumber => prevPageNumber + offset); 
} 

function previousPage() { 
	changePage(-1); 
} 

function nextPage() { 
	changePage(1); 
} 

function scalePdf() { 
	if(size > 700) return 1.0;
	if(size >= 628 && size <= 700) return 0.9;
	if(size >= 564 && size <= 627) return 0.8;
	if(size >= 504 && size <= 563) return 0.7;
	if(size >= 442 && size <= 503) return 0.6;
	if(size >= 383 && size <= 441) return 0.5;

	return 0.4;
} 

return ( 
	<> 
	<div className="main"> 
		<button onClick={onOpenModal}>Open modal</button>
			<Modal open={open} onClose={onCloseModal} center>
				<Document 
					file={url} 
					onLoadSuccess={onDocumentLoadSuccess} 
				> 
					<Page pageNumber={pageNumber} scale={scalePdf()} /> 
				</Document> 
			<div> 
				<div className="pagec"> 
						Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} 
				</div> 
				<div className="buttonc"> 
					<button 
						type="button"
						disabled={pageNumber <= 1} 
						onClick={previousPage} 
						className="Pre">Previous
					</button> 
					<button 
						type="button"
						disabled={pageNumber >= numPages} 
						onClick={nextPage}>Next
					</button> 
				</div> 
			</div> 
			</Modal>
	</div> 
	</> 
); 
}
