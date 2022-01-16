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
