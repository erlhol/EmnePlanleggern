import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin  # Import urljoin for constructing absolute URLs
import json
import re

def crawl_pages(current_url):
    json_list = []

    while current_url:
        response = requests.get(current_url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            crawl_courses(soup,current_url,json_list)
            next_link = soup.find('a', "vrtx-next")
            if next_link:
                current_url = next_link['href']
            else:
                current_url = None
        else:
            print(f"Failed to fetch {current_url}")
    
    with open('courses.json', 'w', encoding='utf-8') as f:
        json.dump(json_list, f, ensure_ascii=False, indent=4)

def extract_day_info(text):
    translations = {"mon.": "mon", "man.": "mon", "mon": "mon",
                    "tue.": "tue", "tir.": "tue", "tue": "tue",
                    "wed.": "wed", "ons.": "wed", "wed": "wed",
                    "thu.": "thu", "tor.": "thu", "thu": "thu",
                    "fri.": "fri", "fre.": "fri", "fri": "fri",
                    "sat.": "sat", "lør.": "sat", "sat": "sat",
                    "sun.": "sun", "søn.": "søn", "sun": "sun"}

    # Define a regular expression pattern to match weekdays and times
    pattern = r'(\w+\.\s+\d{2}:\d{2}-\d{2}:\d{2})'

    # Use the findall function to extract all matches
    matches = re.findall(pattern, text.lower())
    if not matches:
        pattern = r'(\w+\s+\d{2}:\d{2}-\d{2}:\d{2})'
        matches = re.findall(pattern, text.lower())
    
    print(matches,text.lower())

    # Split the matches into separate weekday and time parts
    days = []

    for match in matches:
        parts = match.split(' ')
        days.append((translations[parts[0]],parts[1]))

    print(days)
    return days

def crawl_courses(soup,url,json_list):
    # Find all <a> elements within <td> elements with class 'vrtx-course-description-name'
    links = soup.select('td.vrtx-course-description-name a')
    for link in links:
        crawl_course(link,url,json_list)
            
        print("-" * 30)  # Print a separator between pages

def crawl_course(link,url,json_list):
    translations = {
    "Nivå": "level",
    "Level": "level",

    "Studiepoeng": "credits",
    "Credits": "credits",

    "Undervisning": "teaching" ,
    "Teaching": "teaching",

    "Eksamen": "examination", 
    "Examination": "examination",

    "Undervisningsspråk" : "teachingLanguage",
    "Teaching language": "teachingLanguage",
    }

    relative_path = link.get('href')
    absolute_url = urljoin(url, relative_path)  # Construct absolute URL
    print("Scraping:", absolute_url)
            
    page_response = requests.get(absolute_url)
    if page_response.status_code == 200:
        page_soup = BeautifulSoup(page_response.text, 'html.parser')

        fact_dict = dict()

        courseInfoTitle = page_soup.title.string.split("–")
        subjectCode = courseInfoTitle[0].strip()
        subjectName = courseInfoTitle[1].strip()
        fact_dict["subjectCode"] = subjectCode
        fact_dict["subjectName"] = subjectName
        fact_dict["lectures"] = []

        # Find all divs with class 'vrtx-distach-bottom vrtx-facts'
        facts_divs = page_soup.find_all('div', id='vrtx-additional-content')
        fact_div = facts_divs[0]
        
        if fact_div:
            dt = [x.text.strip() for x in fact_div.find_all('dt')]
            dd = [x.text.strip() for x in fact_div.find_all('dd')]

            myList = list(zip(dt, dd))
            
            for each in myList:
                if each[0] in translations:
                    translation = translations[each[0]]
                    fact_dict[translation] = each[-1]
            
        else:
            print("Facts not found.")

        course_content_header = page_soup.find('h2', {'id': 'course_content'})
        if course_content_header:
            first_p_after_header = course_content_header.find_next('p')
            # Print the text content of the <p> element
            if first_p_after_header:
                fact_dict["description"] = first_p_after_header.get_text()
                json_list.append(fact_dict)
            else:
                print("No <p> element found after the header with id 'learning_outcomes'.")
        
        fact_dict["lectures"] = crawl_calendar_info(page_soup)
        fact_dict["credits"] = int(fact_dict["credits"])

def find_activites(ref):

    print("Getting:",ref)
    response = requests.get(ref)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        target_elem = soup.find('a',class_='cs-toc-section-link')
        if target_elem != None:
            span = target_elem.find('span')
            if span != None:
                print(span.text)
                return extract_day_info(span.text)
    
    return []

def find_timeplan(href):
    response = requests.get(href)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        target_element = soup.find('a', string="Timeplan")
        if target_element != None:
            ref = target_element.get('href')
            return find_activites(ref)
        
        target_element2 = soup.find('a', string="Schedule")
        if target_element2 != None:
            ref2 = target_element2.get('href')
            return find_activites(ref2)
    return []

def crawl_calendar_info(soup):
    # First: select the first link, that is the most recent semester
    # Then: follow link to "Timeplan / schedule"
    # Last: Crawl the page for all the "forelesninger"
    # This should be a dictionary with two key-value pairs.
    # One is "Forelesninger, the other is "Gruppeundervisning"
    target_element = soup.find('a', string="""
          
            Autumn 2023
            
          
          """)
    target_element2 = soup.find('a', string="""
          
            Høst 2023
            
          
          """)
    if target_element != None:
        href = target_element.get('href')
        return find_timeplan(href)
    if target_element2 != None:
        href2 = target_element2.get('href')
        return find_timeplan(href2)
    
    return []
    


if __name__ == '__main__':
    start_url = 'https://www.uio.no/studier/emner/alle/?filter.semester=h23'
    #ifi_url = 'https://www.uio.no/studier/emner/matnat/ifi/?filter.semester=h23'
    crawl_pages(start_url)
