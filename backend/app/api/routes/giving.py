from fastapi import APIRouter

from app.schemas.giving import GivingIntentRequest, GivingIntentResponse

router = APIRouter()


@router.post("/intent", response_model=GivingIntentResponse)
def create_giving_intent(payload: GivingIntentRequest) -> GivingIntentResponse:
    return GivingIntentResponse(
        provider="stub",
        client_secret=None,
        message=(
            "Payment processing is not configured yet. "
            "This endpoint is ready for Stripe or PayPal integration."
        ),
    )
