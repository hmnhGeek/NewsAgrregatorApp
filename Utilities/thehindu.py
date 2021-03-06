from bs4 import BeautifulSoup
import requests
from pydantic import BaseModel

class ShortNews(BaseModel):
    headline: str
    description: str = None
    link: str
    date: str
    news_source: str
    thumbnail: str = None

class FullNews(BaseModel):
    title: str
    news: str
    image: str = None

class TheHindu:
    def __init__(self):
        pass

    def search_for(self, keyword, page=1):
        url = f'https://www.thehindu.com/search/?q={keyword}&order=DESC&sort=publishdate&page={page}'
        r = requests.get(url)
        html_text = r.content

        soup = BeautifulSoup(html_text, 'html.parser')
        divs = soup.find_all('div', {'class': 'story-card story-card75x1-cont'})
        result = []

        for div in divs:
            headline = div.find_all("a", {'class': 'story-card75x1-text'})[0].text.replace('\n', '')
            date = div.find_all("span", {'class': 'dateline'})[0].text
            description = div.find_all('span', {'class': 'light-gray-color story-card-33-text hidden-xs'})[0].text.replace('\n', '')
            link = div.find_all("a", {'class': 'story-card75x1-text'})[0]['href']

            try:
                anchor = div.find_all('a', {'class': 'story-card-img focuspoint'})[0]
                thumbnail = anchor.find('img')["data-src-template"]
            except:
                thumbnail = None

            result.append(ShortNews(headline=headline, date=date, description=description, thumbnail=thumbnail, link=link, news_source="The Hindu"))

        return result

    def full_news(self, link):
        html_text = requests.get(link).content

        soup = BeautifulSoup(html_text, 'html.parser')
        paragraphs = soup.find_all('p')
        news = ' '.join([p.text.replace('\n', '') for p in paragraphs])
        title = soup.find_all('h1', {'class': 'title'})[0].text.replace('\n', '')
        try: 
            img = soup.find_all('source')[0]['srcset'] 
        except IndexError: img = None
        
        return FullNews(title=title, news=news, image=img)

    def get_opinions(self):

        # GETTING OPINIONS
        link = "https://www.thehindu.com/opinion/"
        html_text = requests.get(link).content

        soup = BeautifulSoup(html_text, 'html.parser')
        anchors = soup.find_all("a", attrs={"class": "ES2-100x4-text1-heading"})
        small_news = soup.find_all("span", attrs={"class": "ES2-100x4-text1-content mobilGrad"})

        results = []
        for i in range(len(anchors)):
            results.append(
                ShortNews(
                    headline = anchors[i].string,
                    description = small_news[i].string,
                    link = anchors[i]['href'],
                    news_source = "The Hindu",
                    thumbnail = None,
                    date = anchors[i]["title"]
                )
            )

        # GETTING OPEDS
        link = link + 'op-ed'
        html_text = requests.get(link).content
        soup = BeautifulSoup(html_text, 'html.parser')
        anchors = soup.find_all("a", attrs={"class": "story1-3x100-heading"})
        anchors = [i for i in anchors]

        for i in soup.find_all("a", attrs={"class": "spc33x3-1story-content"}):
            anchors.append(i)

        for i in soup.find_all("p", attrs={"class": "story-card-33-heading"}):
            anchors.append(i.find("a"))

        for i in range(len(anchors)):
            results.append(
                ShortNews(
                    headline = anchors[i].string,
                    description = None,
                    link = anchors[i]['href'],
                    news_source = "The Hindu",
                    thumbnail = None,
                    date = anchors[i]["title"]
                )
            )

        return results

    def get_opinion(self, link):
        return self.full_news(link)

