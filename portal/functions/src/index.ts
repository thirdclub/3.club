import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

exports.createPass = functions.firestore
  .document("pass/{passRef}")
  .onCreate(async (snap) => {
    const pass = snap.data();
    const sdk = new ThirdwebSDK(
      new ethers.Wallet(
        functions.config().thirdweb.privatekey,
        ethers.getDefaultProvider("https://matic-mumbai.chainstacklabs.com")
      )
    );
    const nft = sdk.getNFTModule(pass.contractAddress);
    console.log("mint start", snap.id);
    try {
      await nft.mintTo(pass.toAddress, {
        name: pass.name,
        description: pass.description,
        image: pass.image,
      });
      await snap.ref.update({ mintStatus: "done" });
    } catch (e) {
      await snap.ref.update({ mintStatus: "fail" });
      console.error(e);
    }
    console.log("mint done", snap.id);
    return;
  });
