import { useState } from 'react';
import Row, { CellData } from './Row';

export declare interface TableInterface {
  headContent: CellData[]
  bodyContent: CellData[][]
}

const initialState = 'asc';

const orders: { [key: string]: string } = {
  asc: 'desc',
  desc: 'asc',
};

const orderValue: { [key: string]: number } = {
  asc: 1,
  desc: -1,
};

const Table = ({ headContent, bodyContent }: TableInterface): JSX.Element => {
  const [tableRows, setTableRows] = useState(bodyContent);
  const [index, setIndex] = useState<number>();
  const [order, setOrder] = useState(initialState);

  const onChangeFilter = (fieldIndex: number): void => {
    let newOrder = order;
    if (fieldIndex === index) {
      newOrder = orders[newOrder];
      setOrder(newOrder);
    } else {
      setOrder(initialState);
      setIndex(fieldIndex);
    }
    handleSorting(fieldIndex, newOrder);
  };

  const handleSorting = (index: number, order: string): void => {
    const rows = [...tableRows]
      .sort((a, b) => a[index].value.toString().localeCompare(b[index].value.toString(), 'en', {
        numeric: true,
      }) * orderValue[order]);
    setTableRows(rows);
  };

  return (
    <div className='rounded-sm overflow-hidden border border-brand-blue-dark'>
      <table className="table-auto border-collapse w-full">
        <thead className="bg-brand-blue-dark">
          <Row id='header' data={headContent} onClick={onChangeFilter} head/>
        </thead>
        <tbody>
          {tableRows.map((cellData, index) => (
            <Row id={`row-${index}`} key={`row-${index}`} data={cellData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
