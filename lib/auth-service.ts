import { currentUser } from "@clerk/nextjs/server";
import { firestore } from "@/lib/firebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";
import { getUserByUsername } from "./user-service";

export const getSelf = async () => {
    const self = await currentUser();
    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const usersCollection = collection(firestore, "users");
    const q = query(usersCollection, where("externalUserId", "==", self.id));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        throw new Error("User not found");
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    return {
        id: userDoc.id,
        ...userData,
    };
};

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const user = await getUserByUsername(username);

    if (self.username !== user?.username) {
        throw new Error("Unauthorized");
    }

    return user;
};
