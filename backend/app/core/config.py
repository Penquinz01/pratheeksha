"""Application settings loaded from environment variables / .env file."""
import json
from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Pratheeksha API"
    database_url: str = "postgresql+psycopg://pratheeksha:pratheeksha@localhost:5432/pratheeksha"
    secret_key: str = "insecure-dev-key-change-me"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    # Kept as a raw string (not list[str]) because pydantic-settings JSON-decodes
    # list-typed env vars before any validator runs, which rejects plain
    # comma-separated input — much easier to type correctly in a dashboard than JSON.
    cors_origins_raw: str = Field(default="http://localhost:3000", alias="CORS_ORIGINS")
    allow_registration: bool = True

    # Read-only database assistant. Absent key = feature disabled, not an error;
    # /assistant/status reports this so the UI can hide the panel.
    gemini_api_key: str = ""
    # Pin a specific model rather than a floating alias so behaviour doesn't
    # change under you between deploys.
    gemini_model: str = "gemini-3.5-flash"
    # Ceiling on tool calls per question — bounds both latency and cost when a
    # question sends the model round the loop repeatedly.
    assistant_max_tool_calls: int = 8

    @property
    def cors_origins(self) -> list[str]:
        v = self.cors_origins_raw.strip()
        if v.startswith("["):
            return json.loads(v)
        return [origin.strip() for origin in v.split(",") if origin.strip()]

    @field_validator("database_url")
    @classmethod
    def _use_psycopg_driver(cls, v: str) -> str:
        # Managed Postgres providers (e.g. Railway) hand out plain
        # postgres:// / postgresql:// URLs; SQLAlchemy needs the psycopg driver named.
        if v.startswith("postgres://"):
            return "postgresql+psycopg://" + v[len("postgres://"):]
        if v.startswith("postgresql://"):
            return "postgresql+psycopg://" + v[len("postgresql://"):]
        return v


@lru_cache
def get_settings() -> Settings:
    return Settings()
