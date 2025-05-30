export interface Variable {
  id: string;
  name: string;
  value: string;
  pattern?: string;
}

export interface OutputRule {
  id: string;
  type: string;    
  pattern: string;  
  name: string;     
}

export interface Header {
  id: string;
  name: string;
  value: string;
}

export interface TabConfig {
  url: string;
  method: string;
  delay: number | ""; 
  variables: Variable[];
  body: string;
  outputRules: OutputRule[];
  headers: Header[]; 
}