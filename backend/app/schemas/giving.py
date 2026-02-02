from pydantic import BaseModel


class GivingIntentRequest(BaseModel):
    amount: int
    currency: str
    frequency: str
    category: str


class GivingIntentResponse(BaseModel):
    provider: str
    client_secret: str | None = None
    message: str
