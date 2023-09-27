import requests
api_key = 'f2c7e409-2c12-474a-9ecd-32439ec8a991'
headers = {'X-Gravitee-Api-Key': api_key } 
url = 'https://gw-uio.intark.uh-it.no/fs-api/undervisning'

def get_request(url):
    print("Showing response from:",url)
    response = requests.get(url,headers=headers)
    print(response.text)
    print()
    return response

response = get_request(url)
new_url = response.json()["items"][0]["href"]
response2 = get_request(new_url)
#print(response2.text)

response = get_request("https://gw-uio.intark.uh-it.no/fs-api/emner")

#response = get_request("https://gw-uio.intark.uh-it.no/fs-api/emner/185,A106,1")