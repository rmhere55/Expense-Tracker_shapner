import { child, get, getDatabase, ref, remove, set, update } from "firebase/database";
import firebaseApp from "./initialize";
import { getAuth } from "firebase/auth"; // Import auth to get user ID

const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

// Add an expense under the current user's UID
export const addExpense = async (expense) => {
  const expenseId = Date.now();
  const user = auth.currentUser; // Get the currently authenticated user

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    await set(ref(database, `expenses/${user.uid}/${expenseId}`), {
      ...expense,
      id: expenseId,
      userId: user.uid, // Store the UID in the expense
    });
    return expenseId;
  } catch (err) {
    console.error("Error adding expense: ", err);
    throw err.message;
  }
};

// Get all expenses for the currently authenticated user
export const getAllExpenses = async () => {
  const user = auth.currentUser; // Get the currently authenticated user

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `expenses/${user.uid}`)); // Fetch expenses for the user's UID

    if (snapshot.exists()) {
      return snapshot.val(); // Return the expenses object
    } else {
      return {}; // Return an empty object if no expenses are found
    }
  } catch (err) {
    console.error("Error getting expenses: ", err);
    throw err.message;
  }
};

// Update an expense by expenseId for the current user
export const updateExpense = async (expenseId, updatedExpense) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    const updates = {};
    updates[`/expenses/${user.uid}/${expenseId}`] = updatedExpense;
    await update(ref(database), updates);
    return updatedExpense;
  } catch (err) {
    console.error("Error updating expense: ", err);
    throw err.message;
  }
};

// Delete an expense by expenseId for the current user
export const deleteExpense = async (expenseId) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    await remove(ref(database, `expenses/${user.uid}/${expenseId}`));
  } catch (err) {
    console.error("Error deleting expense: ", err);
    throw err.message;
  }
};
