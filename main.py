from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# In a real application, this would be stored in a database
user_accounts = {
    "Uzair": {"balance": 7000.0},
    "Ahmed": {"balance": 5000.0},
    "Ali": {"balance": 2000.0},
}

user_pins = {
    "Uzair": 1234,
    "Ahmed": 5678,
    "Ali": 9876,
}

class DepositRequest(BaseModel):
    user_name: str
    amount: float

class AuthRequest(BaseModel):
    name: str
    pin_number: int

class TransferRequest(BaseModel):
    sender_name: str
    recipient_name: str
    amount: float

@app.post("/deposit")
async def deposit(request: DepositRequest):
    if request.user_name not in user_accounts:
        return {"message": f"User '{request.user_name}' not found."}
    if request.amount <= 0:
        return {"message": "Deposit amount must be positive."}
    
    user_accounts[request.user_name]["balance"] += request.amount
    new_balance = user_accounts[request.user_name]["balance"]
    return {"message": f"Successfully deposited {request.amount} to {request.user_name}. New balance is {new_balance}"}

@app.get("/balance/{user_name}")
async def get_balance(user_name: str):
    if user_name not in user_accounts:
        return {"message": f"User '{user_name}' not found."}
    balance = user_accounts[user_name]["balance"]
    return {"user_name": user_name, "balance": balance}

@app.post("/authent")
async def authenticate(request: AuthRequest):
    if request.name not in user_pins or user_pins[request.name] != request.pin_number:
        return {"message": "Authentication failed: Invalid name or pin number."}
    
    return {"message": f"Authentication successful for user {request.name}."}

@app.post("/bank-transfer")
async def bank_transfer(request: TransferRequest):
    sender = request.sender_name
    recipient = request.recipient_name
    amount = request.amount

    if sender not in user_accounts:
        return {"message": f"Sender '{sender}' not found."}
    if recipient not in user_accounts:
        return {"message": f"Recipient '{recipient}' not found."}
    if amount <= 0:
        return {"message": "Transfer amount must be positive."}
    if user_accounts[sender]["balance"] < amount:
        return {"message": f"Insufficient funds in '{sender}' account."}

    user_accounts[sender]["balance"] -= amount
    user_accounts[recipient]["balance"] += amount

    return {
        "message": "Transfer successful",
        "sender": sender,
        "recipient": recipient,
        "transferred_amount": amount,
        "sender_new_balance": user_accounts[sender]["balance"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)