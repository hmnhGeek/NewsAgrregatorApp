from fastapi import FastAPI
import uvicorn
from Utilities.thehindu import TheHindu
from fastapi.middleware.cors import CORSMiddleware

api = FastAPI()

origins = [
    "http://localhost:3001",
]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@api.get("/getheadlinesfor")
def get_headlines_for(keyword: str, page: int):
    return TheHindu().search_for(keyword, page)

@api.get("/fullnews")
def get_full_news(link: str):
    return TheHindu().full_news(link)

if __name__ == '__main__':
    uvicorn.run("api:api", host='0.0.0.0', port=8080)