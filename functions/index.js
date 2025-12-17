const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

exports.binFillWatcher = functions.firestore
    .document("bin/{binId}")
    .onUpdate(async (change, context) => {
        const after = change.after.data();
        const binId = context.params.binId;

        const distance = after.distanceCm;
        const capacity = 50;

        let percentage = Math.round(
            ((capacity - distance) / capacity) * 100
        );

        percentage = Math.min(100, Math.max(0, percentage));

        if (percentage < 80) return null;

        // Find users who own this bin
        const usersSnap = await admin
            .firestore()
            .collectionGroup("devices")
            .where("deviceId", "==", binId)
            .get();

        for (const snap of usersSnap.docs) {
            const userId = snap.ref.parent.parent.id;

            const userDoc = await admin
                .firestore()
                .collection("users")
                .doc(userId)
                .get();

            const userData = userDoc.data();
            const token = userData && userData.expoPushToken;

            if (!token) continue;

            await sendPush(token, percentage);

        }

        return null;
    });

async function sendPush(token, percentage) {
    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            to: token,
            title: "⚠ Bin Almost Full",
            body: `Your bin is ${percentage}% full. Please empty it soon.`,
            sound: "default"
        })
    });
}
