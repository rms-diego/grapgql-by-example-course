type Job = {
  id: string;
  companyId: string;
  title: string;
  description?: string;
  createdAt: string;
};

type User = {
  id: string;
  companyId: string;
  email: string;
  password: string;
};

type Company = {
  id: string;
  name: string;
  description?: string;
};
