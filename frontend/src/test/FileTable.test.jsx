import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";
import { FileTable } from "../components/files/FileTable";
import { singleFile } from "./variables";


describe('FileTable Component', () => {
    it('renders table with correct data', () => {
        const data = [
            singleFile
        ];

        const { getByText, getAllByText, queryByText } = render(<FileTable data={data} />);

        // Check if lines show up entirely in the table
        expect(getAllByText('mockFile.csv')).toHaveLength(singleFile.lines.length);

        // Check if line data is rendered
        expect(getByText('textMock')).toBeInTheDocument();
        expect(getByText('9')).toBeInTheDocument();
        expect(getByText('hexMock')).toBeInTheDocument();

        // Check if empty file message is rendered
        expect(queryByText('Empty file')).not.toBeInTheDocument();
    });

    it('renders empty file message when lines are empty', () => {
        const data = [
            {
                file: 'empty.csv',
                lines: [],
            },
        ];

        const { getByText } = render(<FileTable data={data} />);

        expect(getByText('Empty file')).toBeInTheDocument();
    });
});