import React, { useState, useMemo } from "react";
import { Input, Space } from 'antd';
import { IDataSearch } from "../constant/interface";
import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'


const { Search } = Input;

export const SearchCity = () => {
  const [onChangeSearch, setOnChangeSearch] = useState<string>('');
  const [daySearch, setDaySearch] = useState<number>(5);
  const [hourSearch, setHourSearch] = useState<number>(24);
  const url = 'http://api.weatherapi.com/v1';
  const [data, setData] = useState<IDataSearch>({
    key: '6b69c74caace45d5a7293203221811',
    q: onChangeSearch,
    days: daySearch,
    hour: hourSearch,
  });

  const SearchFetch = (async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Works:', JSON.stringify(json));
    }
    catch (error) {
      console.error('Error:', error);
    }
  });

  return (
    <Space direction="vertical">
      <Search placeholder="City"
        onChange={(e) => setOnChangeSearch(e.target.value)}
        onSearch={SearchFetch}
        enterButton />
    </Space>
  )
};

export default SearchCity;