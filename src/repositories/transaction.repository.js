import Transaction from "../models/transaction.model.js";

class TransactionRepository {
  // Save transaction
  static async saveTransaction(transaction_data) {
    const transaction = new Transaction(transaction_data);
    return transaction.save();
  }
  // Get transaction by id
  static async getTransactionById(id) {
    const transaction = await Transaction.findById(id);
    return transaction;
  }
  // Get all transactions from this user
  static async getAllTransactionsByUserId(user_id) {
    const transactions = await Transaction.find({ user_id });
    return transactions || {};
  }

  // Get all transactions from this user with this source
  static async getAllTransactionsBySourceId(user_id, source_id) {
    const transactions = await Transaction.find({ user_id, source_id });
    return transactions;
  }

  // Get all transactions from this user with this category
  static async getAllTransactionsByCategoryId(user_id, category_id) {
    const transactions = await Transaction.find({ user_id, category_id });
    return transactions;
  }

  // Get all transactions from this user with a date range
  static async getAllTransactionsByDateRange(user_id, start_date, end_date) {
    const transactions = await Transaction.find({
      user_id,
      date: { $gte: start_date, $lte: end_date },
    });
    return transactions;
  }

  // Get all incoming transactions from this user
  static async getAllIncomingTransactionsByUserId(user_id) {
    const transactions = await Transaction.find({ user_id });
    return transactions.map(transaction => transaction.amount > 0);
  }

  // Get all outgoing transactions from this user
  static async getAllOutgoingTransactionsByUserId(user_id) {
    const transactions = await Transaction.find({ user_id });
    return transactions.map(transaction => transaction.amount < 0);
  }
}

export default TransactionRepository;
