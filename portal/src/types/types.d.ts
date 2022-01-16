interface User {
  id: string;
  email: string;
  image?: string;
  name?: string;
  ethAddress?: string;
}

interface ScanRecord {
  userId: string;
  eventId: string;
  asset: any;
  date: number;
}

interface Event {
  id: string;
  userId: string;
  name: string;
  contractAddress: string;
  createdAt: number;
}

interface Pass {
  id: string;
  userId: string;
  contractAddress: string;
  toAddress: string;
  image: string;
  name: string;
  description: string;
  mintStatus: string;
  createdAt: number;
}
