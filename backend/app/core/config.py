"""Application settings loaded from environment variables / .env file."""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Pratheeksha API"
    database_url: str = "postgresql+psycopg://pratheeksha:pratheeksha@localhost:5432/pratheeksha"
    secret_key: str = "insecure-dev-key-change-me"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    cors_origins: list[str] = ["http://localhost:3000"]
    allow_registration: bool = True


@lru_cache
def get_settings() -> Settings:
    return Settings()
