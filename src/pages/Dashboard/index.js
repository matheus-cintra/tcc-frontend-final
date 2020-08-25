import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { GraphContainer, Graph, BigGraph } from './styles';

const data = [
  { name: 'Janeiro', clientes: 3 },
  { name: 'Fevereiro', clientes: 7 },
  { name: 'Março', clientes: 12 },
  { name: 'Abril', clientes: 24 },
  { name: 'Maio', clientes: 18 },
  { name: 'Junho', clientes: 31 },
];

export default function Dashboard() {
  return (
    <>
      <GraphContainer>
        <Graph>
          <h2>Numero de Cliente (6 meses)</h2>
          <ResponsiveContainer width="100%" height="70%">
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="clientes" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Graph>
        <Graph>
          <h2>Total de Vendas (6 meses)</h2>
          <ResponsiveContainer width="100%" height="70%">
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="clientes" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Graph>
      </GraphContainer>
      <GraphContainer>
        <BigGraph>
          <h2>Total de Caixa (6 meses)</h2>
          <ResponsiveContainer width="100%" height="70%">
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="clientes" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </BigGraph>
      </GraphContainer>
    </>
  );
}
