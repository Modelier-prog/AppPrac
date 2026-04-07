export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
}

export interface TestResult {
  id: string;
  feature: string;
  expected: string;
  actual: string;
  status: 'Pass' | 'Fail' | 'Pending';
  notes: string;
}
