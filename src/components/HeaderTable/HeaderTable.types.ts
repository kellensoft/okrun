export interface Header {
  id: string;
  name: string;
  value: string;
}

export interface HeaderTableProps {
  headers: Header[];
  onChange: (headers: Header[]) => void;
  errors?: string[]; 
}
