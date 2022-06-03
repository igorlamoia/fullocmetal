import { format, addDays } from 'date-fns';

export const addOneDay = (day) => addDays(new Date(day), 1);
export const showDate = (date) => format(addDays(new Date(date), 1), 'dd/MM/yyyy'); // Tive que add um dia pq tava pegando o anterior ainda

export const { format: priceReal } = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
