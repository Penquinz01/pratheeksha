"""FastAPI dependency that resolves the current authenticated user from a JWT."""
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.auth.models import User
from app.auth.service import get_user_by_email
from app.core.database import get_db
from app.core.security import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

_credentials_error = HTTPException(
    status.HTTP_401_UNAUTHORIZED,
    "Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    email = decode_access_token(token)
    if email is None:
        raise _credentials_error
    user = get_user_by_email(db, email)
    if user is None or not user.is_active:
        raise _credentials_error
    return user
