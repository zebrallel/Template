import React from 'react';
import useSortableTable from '@/hooks/useSortableTable';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

const SortableTablePage = function () {
  const SortableTable = useSortableTable({
    dataSource: data,
    columns,
    rowKey: 'index',
    onSortChange: () => {},
  });

  return (
    <div>
      <h1>sortable table</h1>
      <br />
      {SortableTable}
    </div>
  );
};

export default SortableTablePage;
