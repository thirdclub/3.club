import { firestore } from "lib/firebase";

export default class Database {
  async createUser(user: User): Promise<void> {
    await firestore.collection("user").add(user);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const snapshot = await firestore
      .collection("user")
      .where("email", "==", email)
      .get();
    if (snapshot.empty) return undefined;
    return snapshot.docs[0].data() as User;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const snapshot = await firestore
      .collection("user")
      .where("id", "==", id)
      .get();
    if (snapshot.empty) return undefined;
    return snapshot.docs[0].data() as User;
  }

  async createConnection(userId: string, address: string): Promise<void> {
    const snapshot = await firestore
      .collection("user")
      .where("id", "==", userId)
      .get();
    await snapshot.docs[0].ref.update({ ethAddress: address });
  }

  async createScanRecord(scanRecord: ScanRecord): Promise<void> {
    await firestore.collection("scan_record").add(scanRecord);
  }
}
