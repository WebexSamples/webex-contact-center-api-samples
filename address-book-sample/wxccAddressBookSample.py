import requests

wxcc_access_token = 'your_wxcc_access_token'
org_id = 'your_org_id'
address_book_id = 'your_address_book_id'

# Function to get a list of random users from the randomuser.me API
# This could be data pulled from a CRM or Azure AD, etc.


def get_random_user_list():
    response = requests.get(
        'https://randomuser.me/api/?results=10&inc=name,phone&nat=us&noinfo')
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return None

# Function to populate the payload with the data from the random user list


def populate_payload(response_data):
    # Initialize the payload with an empty 'items' list
    payload = {"items": []}

    # Iterate over each result in the response data
    for idx, user in enumerate(response_data['results']):
        # Extract the full name and phone number
        full_name = f"{user['name']['title']} {user['name']['first']} {user['name']['last']}"
        phone_number = user['phone']

        # Append the new item to the payload
        payload['items'].append({
            "itemIdentifier": idx,
            "item": {
                "name": full_name,
                "number": phone_number,
            },
            "requestAction": "SAVE"
        })

    return payload

# Function to update the address book with the new data via the WxCC API


def update_address_book(data):
    url = f'https://api.wxcc-us1.cisco.com/organization/{org_id}/address-book/{address_book_id}/entry/bulk'
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f'Bearer {wxcc_access_token}'
    }

    response = requests.request("POST", url, json=data, headers=headers)
    return response


print(update_address_book(populate_payload(get_random_user_list())))
