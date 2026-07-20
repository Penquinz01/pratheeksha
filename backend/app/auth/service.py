"""User persistence and credential checks. No HTTP concerns here."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.models import User
from app.auth.schemas import UserCreate
from app.core.security import hash_password, verify_password


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.scalar(select(User).where(User.email == email))


def get_user_by_username(db: Session, username: str) -> User | None:
    return db.scalar(select(User).where(User.username == username))


def create_user(db: Session, payload: UserCreate) -> User:
    user = User(
        email=payload.email,
        username=payload.username,
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)
    if user is None or not user.is_active or not verify_password(password, user.hashed_password):
        return None
    return user
