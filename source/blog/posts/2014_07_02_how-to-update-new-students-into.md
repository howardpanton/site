{
"title" : "How to: Import new students into showtime (annual update) ",
"date" : "2014-07-02",
"description" : "yearly update to add new students to showtime database"
}

#Import records into Showtime db

##Part 1: Data preparation and local testing

- Acquire new year cohort from Stephen Petty in Academic Registry
- Save excel file as .csv format
- Check the file in a text editor to see that it has column headings and that each row starts a new line
- Test the import script locally at /admin/import
- Extract the column headings and the first line into a separate file, to be used for testing
- If your import script is > 1500 lines, split it into separate files e.g. import01.csv, import02.csv

## Part 2: Prepare the live environment

- Advise IT (Phil Haines, Gerry Hickman) that you are planning to import data into the Showtime db
- Put up a warning notice on Showtime (use the default and admin layout views) at least half a day in advance
- Log in to Showtime using an admin user account and navigate to showtime.arts.ac.uk/admin/import
- Modify app/config/routes.php, commenting out the entire file except a) the ‘Maintenance / downtime’ route at the bottom and b) the two ‘admin’ route lines, so that you can run the importer
- Deploy routes.php to put the site into maintenance mode
- Log in to PHPMyAdmin for the arts_uploader database (for logins see Website General > Writeboards)
- Export/backup the complete arts_uploader db in case things go wrong


## Part 3: Run the importer

- Start by running your 1-line test .csv file in preview mode, then try it in import mode
- Check that the enrolment ID you imported has been inserted into the database
- Import each of your csv files in turn until complete


## Note: Importer options

When running the import for the 2013 cohort, I checked ‘Create new courses’ and ‘Update profiles’ and ‘Update active accounts’ (and all its sub-options). This means that students with existing accounts who have graduated and enrolled on a different course, potentially at a different college, will have their details updated without being told in advance.

While there might be a few cases where students don’t want existing work (from an older course) to be associated with a new course, on balance it’s better to reduce day-to-day Showtime admin where students request their college or graduation year to be updated.
