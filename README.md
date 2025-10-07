# jobsearchtracking
This project is to use a Chrome Extension to populate a Google Spreadsheet that you can use as an Active Job Search Tracker using the 15-10-2 method

<b>PART I: How to Download and Install the Job Data to Google Sheets Chrome Extension</b>

- Click the Green Code drop down button above
- Select DownloadZip
- Unzip the files into a local folder
- open a Chrome tab to enable the chrome extension and install it or goto: chrome://extensions
- Turn on: Developer mode
- Load unpacked
- browse to the folder where you unzipped the files from above


<b>PART II: Copy the necessary Google Spreadsheet and Configure it to work with the Chrome Extension</b>

Step 1: Make your own copy of this Google Spreadsheet: File > Make a Copy of: <a href="https://docs.google.com/spreadsheets/d/1QaB6toLxA3B4MwaJZ-tV8kMV5VbZrNMiep4t__1PYpg/edit?usp=sharing" target="_blank">https://docs.google.com/spreadsheets/d/1QaB6toLxA3B4MwaJZ-tV8kMV5VbZrNMiep4t__1PYpg/edit?usp=sharing</a>

Step 2: There is a File URL you that you will need to copy and paste into your Extension in the Sheets field.

Step 3: While still in the google sheet page, there is a top menu choice of Extensions > App Script > Deploy > New Deployment > Select type > Web App > Who has access > Anyone > Deploy > Authorize Access > Choose your account > Advanced > Go to Untitled Project (unsafe) > Allow > Copy the url from your screen that looks like this: https://script.google.com/macros/s/*****************/exec

Step 4: When you click on the Job Data to Google Sheets Extension in your Chrome Toolbar, the URL from step 2 is what you will paste as the Sheet Script Input Click Save Sheet Script


<b>PART III: How to use the Job Data to Google Sheets Chrome Extension</b>

Step 1: The Extension had difficulty tracking quality data when activated on a page with frames or inclusions.  It is best to open items in their own page.  Example on the basic job search pages for Indeed there is a list of jobs on the left and a scrollable section on the right.  If you want the extension to track the best data you should right click on the job on the left scrollable area and choose Open in New Tab before recording information with the Extension.

Step 2: Change the Data Type to one of the dropdown items you see fit for the current open resource.

Step 3: Click Send Data to my sheet

- You will see data show up in your sheet in a few seconds. I have seen it take as long as 50 seconds.

Step 4: Open your Google Sheet to see the data the Job Data to Google Sheets Chrome Extension has stored

- The Progress tab is where you see a daily running total - they will be color coded on whether you are meeting your goals or not
- The Data tab is where the raw data you entered will be recorded from the Extension
- Job Search Tracking tab is where you can put in detailed information about jobs you have applied to, contact info, application dates, interview dates, etc
- Goals tab is where you can change your goals from the 15-10-2 targets to something higher or lower that meets your needs