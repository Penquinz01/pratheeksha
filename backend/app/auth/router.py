from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.auth import service
from app.auth.deps import get_current_user
from app.auth.models import User
from app.auth.schemas import Token, UserCreate, UserRead
from app.core.config import get_settings
from app.core.database import get_db
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    if not get_settings().allow_registration:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Registration is disabled")
    if service.get_user_by_email(db, payload.email) is not None:
        raise HTTPException(status.HTTP_409_CONFLICT, "Email already registered")
    if service.get_user_by_username(db, payload.username) is not None:
        raise HTTPException(status.HTTP_409_CONFLICT, "Username already taken")
    return service.create_user(db, payload)


@router.post("/login", response_model=Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = service.authenticate(db, form.username, form.password)
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect email or password")
    return Token(access_token=create_access_token(user.email))


@router.get("/me", response_model=UserRead)
def me(current_user: User = Depends(get_current_user)):
    return current_user
