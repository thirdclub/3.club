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

  async createScanRecord(scanRecord: ScanRecord): Promise<void> {
    await firestore.collection("scan_record").add(scanRecord);
  }

  async createEvent(event: Event): Promise<void> {
    await firestore.collection("event").add(event);
  }

  async getEventByUserId(userId: string): Promise<Event[]> {
    const snapshot = await firestore
      .collection("event")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((e) => e.data() as Event);
  }

  async createPass(pass: Pass): Promise<void> {
    await firestore.collection("pass").add(pass);
  }

  async getPassByUserId(userId: string): Promise<Pass[]> {
    const snapshot = await firestore
      .collection("pass")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((e) => e.data() as Pass);
  }
}
