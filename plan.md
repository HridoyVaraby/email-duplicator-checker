Implementation Plan: List Percher Feature
This plan outlines the steps to add a new "List Percher" page that transforms email lists into a specific format.

Proposed Changes
Core Components
[NEW] 
ListPercher.jsx
Create a new component for list perching.
Implement file upload capability using FileUploader (or a variation of it).
Implement CSV parsing and transformation logic.
Rule 1: Rename "Email" column to "email".
Rule 2: Create "name" column from "firstname" and "lastname".
Rule 3: Move all other columns to an "attributes" JSON string column.
Rule 4: Final columns: email, name, attributes.
Display a preview of the transformed data.
Add a download button for the transformed CSV.
Routing & Navigation
[MODIFY] 
App.jsx
Add a new route /list-percher for the ListPercher component.
[MODIFY] 
LandingPage.jsx
Add a button or link to navigate to the List Percher page.
Verification Plan
Automated Tests
I will verify the logic by running a sample CSV through the transformation function and checking the output.
Manual Verification
Upload a CSV with Email, firstname, lastname, age, and planet columns.
Verify that the output has email, name, and attributes.
Verify that attributes contains age and planet.
Verify that name contains the concatenation of firstname and lastname.
Download and check the final CSV file.