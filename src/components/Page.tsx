import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Tabs, Button } from 'antd';


export const Page = () => {
  const [city, setCity] = useState<string>('');

  const onChange = (key: React.Key) => {
    console.log(key);
  };

  const lication = () => {
    fetch('https://extreme-ip-lookup.com/json/')
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setCity(response.city);
      })
  };

  useEffect(() => {
    lication();
  }, [])

  return (
    <div>
      <Tabs
        onChange={onChange}
        type="card"
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tabi instans ${id}`,
            key: id,
            children: `Content of Tab Pane ${id}`,
          };
        })}
      />
    </div>
  );
};

export default Page;