# MealCard

🔹 1. Data Modeling
Student

We need to store data that uniquely identifies the student and ties them to their card:

studentId (unique ID / roll number)

name

email

password (hashed)

year, branch, college (optional, for reporting)

mealCardId (foreign key reference to their card)

transactionHistory (array of IDs → transactions collection)

Staff (Manager / Cashier)

staffId (unique ID)

name

email

password (hashed)

role → "manager" or "cashier"

Managers: Approve recharge requests.

Cashiers: Deduct balance when meals are purchased.

Admin

adminId

name

email

password (hashed)

role: "admin"

Admins don’t directly handle transactions but oversee reports.

Meal Card

mealCardId

studentId (1-to-1 mapping with student)

balance (numeric, default 0)

status (active, blocked, expired)

Transactions

transactionId

studentId

type (recharge | purchase)

amount

timestamp

status (pending, approved, completed, failed)

approvedBy (if recharge requires manager approval)

mealDetails (only for purchase: e.g., "Veg Thali", "Idli Sambar")

🔹 2. Edge Cases & Business Rules
❓ What if a student tries to buy a meal with insufficient balance?

The transaction fails immediately with status = failed.

A proper error message is shown to the cashier UI → “Insufficient Balance.”

❓ How do we prevent duplicate/double transactions if two recharges happen at once?

Use atomic database operations (e.g., MongoDB $inc, PostgreSQL transactions).

Each recharge request is locked by a transaction ID + studentId, so only one is processed.

If duplicate request arrives, backend rejects it with "Duplicate recharge request."

❓ Should recharges be auto-approved or require manager approval?

Choice: Recharges require manager approval (realistic for accountability).

Reason: Prevents fake/mistaken recharges, ensures transparency, and allows monitoring fraud.

But for a smoother system, we can also configure a rule → recharges below ₹500 auto-approve, above ₹500 require manager approval.

🔹 3. Dashboards (Views & Why)
Admin View

What to show:

Total students registered

Total active cards

Total daily/weekly/monthly transactions

Top-up summary vs expenditure summary

Reports on meal consumption trends

Why: Admins need high-level visibility to track adoption, finances, and detect misuse.

Manager View

What to show:

Pending recharge requests → approve/reject

List of students & their balances (filter low balance students)

Transaction history for verification

Why: Managers need to validate payments and monitor overall card usage.

Cashier View

What to show:

Student card quick lookup (scan card or enter student ID)

Current balance displayed immediately

Option to deduct amount (meal purchase)

Transaction success/failure status shown instantly

Why: In rush hours, speed is critical — only essential data shown to avoid delays.

Student View (Mobile/Web)

What to show:

Current balance

Option to request recharge (mock payment flow)

Transaction history (purchases + recharges)

Why: Students need simple visibility into their money, history, and recharge requests.
