import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/entry.webpack';
import resumePDF from '../../assets/documents/resume.pdf';

function Resume() {
  return (
    <div>
      <div className="w-full lg:w-fit lg:ml-32 flex justify-center">
        <a href={resumePDF} download className="p-4 text-blue-600 text-xl text-center">Download my resume as a PDF</a>
      </div>
      <Document file={resumePDF} renderTextLayer={false}>
        <Page pageNumber={1} scale={1.5} />
      </Document>
    </div>
  )
}

export default Resume;