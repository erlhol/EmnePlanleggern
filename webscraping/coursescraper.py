import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin  # Import urljoin for constructing absolute URLs

def crawl_courses(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all <a> elements within <td> elements with class 'vrtx-course-description-name'
        links = soup.select('td.vrtx-course-description-name a')
        
        for link in links:
            crawl_course(link,url)
            
            print("-" * 30)  # Print a separator between pages

def crawl_course(link,url):
    relative_path = link.get('href')
    absolute_url = urljoin(url, relative_path)  # Construct absolute URL
    print("Scraping:", absolute_url)
            
    # Now you can perform a new request for the absolute URL and scrape its content
    page_response = requests.get(absolute_url)
    if page_response.status_code == 200:
        page_soup = BeautifulSoup(page_response.text, 'html.parser')
        
        # Find all divs with class 'vrtx-distach-bottom vrtx-facts'
        facts_divs = page_soup.find_all('div', id='vrtx-additional-content')
        if facts_divs:
            for facts_div in facts_divs:
                # Print the text content of each facts_div
                print("Facts:", facts_div.get_text(strip=True))
        else:
            print("Facts not found.")

        content_div = page_soup.find('div', id='vrtx-course-content')
        if content_div:
            # Find all <p> elements within the div (after the first <h2>)
            paragraphs = content_div.find_all('p', limit=None)  # Set limit=None to get all <p> elements
            
            for paragraph in paragraphs:
                print("Paragraph:", paragraph.get_text(strip=True))
        else:
            print("'vrtx-course-content' div not found.")

if __name__ == '__main__':
    start_url = 'https://www.uio.no/studier/emner/alle/?filter.semester=h23'
    crawl_courses(start_url)
