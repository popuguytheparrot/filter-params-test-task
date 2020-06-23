import React from 'react';
import moment from 'moment';

import { useHistory, useLocation } from 'react-router-dom';

import {
  Drawer,
  Layout,
  Button,
  Typography,
  Select,
  Slider,
  DatePicker,
} from 'antd';

import './App.css';

import { FilterParamsView } from './features/FilterParamsView';
import { useQuery } from './hooks';

const { Header, Content } = Layout;

const { Title } = Typography;

const { Option } = Select;

const { RangePicker } = DatePicker;

function formatRange(range) {
  return range !== undefined ? range.split('-') : [0, 0];
}

function formatDates(params) {
  if (!params.start && !params.end) return [];
  return [moment(params.start), moment(params.end)];
}

function App() {
  const history = useHistory();
  const location = useLocation();

  const URLParams = useQuery();

  const parsedParams = Object.fromEntries(URLParams.entries());

  const [params, changeParams] = React.useState(URLParams);
  const [visible, toggleVisible] = React.useState(false);

  const [person, changePerson] = React.useState(parsedParams.person);
  const [range, changeRange] = React.useState(() =>
    formatRange(parsedParams.range)
  );
  const [dates, changeDates] = React.useState(() => formatDates(parsedParams));

  function handlerToggle() {
    toggleVisible((state) => !state);
  }

  function handleOnChangeSelect(person) {
    params.set('person', person);
    history.replace({ pathname: location.pathname, search: params.toString() });
    changeParams((params) => params);
    changePerson(() => person);
  }

  function handleOnChangeSlide(range) {
    const joined = range.join('-');
    params.set('range', joined);
    history.push({ pathname: location.pathname, search: params.toString() });
    changeParams((params) => params);
    changeRange(() => range);
  }

  function handleOnChangeRange(value, dateStrings) {
    const [start, end] = dateStrings;
    params.set('start', start);
    params.set('end', end);
    history.push({ pathname: location.pathname, search: params.toString() });
    changeParams((params) => params);
    changeDates(() => value);
  }

  return (
    <>
      <Layout className="layout">
        <Header>
          <Button onClick={handlerToggle}>Show filters</Button>
        </Header>
        <Content style={{ padding: '0 50px', height: 'calc(100vh - 64px)' }}>
          <Title>Current filters value</Title>
          <FilterParamsView params={parsedParams} />
        </Content>
      </Layout>

      <Drawer
        title="Filters"
        placement="left"
        visible={visible}
        onClose={handlerToggle}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a person"
          onChange={handleOnChangeSelect}
          value={person}
        >
          <Option value="person1">Person 1</Option>
          <Option value="person2">Person 2</Option>
          <Option value="person3">Person 3</Option>
        </Select>
        <Slider range value={range} onChange={handleOnChangeSlide} />
        <RangePicker value={dates} onChange={handleOnChangeRange} />
      </Drawer>
    </>
  );
}

export default App;
