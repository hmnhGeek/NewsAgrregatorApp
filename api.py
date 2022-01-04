from fastapi import FastAPI
import uvicorn
from Utilities.thehindu import TheHindu
from fastapi.middleware.cors import CORSMiddleware

api = FastAPI()

origins = [
    "*"
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

@api.get("/opinions")
def get_opinions():
    return TheHindu().get_opinions()

@api.get("/opinion")
def get_opinion(link: str):
    return TheHindu().get_opinion(link)