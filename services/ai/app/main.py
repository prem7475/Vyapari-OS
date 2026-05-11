from fastapi import FastAPI

app = FastAPI(title="Vyapari OS AI", version="0.1.0")


@app.get("/health")
def health():
    return {"ok": True, "service": "vyapari-ai"}

