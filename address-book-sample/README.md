# Address Book Sample

This sample code was written to illustrate a use case for the Bulk Save Address Book Entry API for Webex Contact Center.

## Description

This Python script is designed to fetch a list of random users from the `randomuser.me` API and update an address book via the Webex Contact Center API. It's a simple demonstration of how to interact with external APIs using Python.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Python 3 on your machine.
- You have a basic understanding of Python programming.
- You have obtained your WxCC access token, organization ID, and address book ID.

## Installation

To run this script, you need to install the required Python dependencies. Follow these steps to install the dependencies:

1. Install the required packages using `pip`:

```bash
pip install requests
```

## Configuration

Before running the script, you need to set your WxCC access token, organization ID, and address book ID in the script. Replace `your_wxcc_access_token`, `your_org_id`, and `your_address_book_id` with your actual credentials.

## Usage

To run the script, execute the following command in your terminal:

```bash
python3 wxccAddressBookSample.py
```

Replace `wxccAddressBookSample.py` with the actual name of your Python script.

- This project uses the [randomuser.me](https://randomuser.me/) API to generate random user data.
- This project interacts with the Webex Contact Center API to update address book entries.
