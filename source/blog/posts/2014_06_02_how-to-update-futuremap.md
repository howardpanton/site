{
"title" : "How To: Update Futuremap",
"date" : "2014-06-02",
"description" : "Steps required to perform the yearly update for FutureMap"
}

# Before Updating anything on the live site

** Before you begin to make any changes to the live site**
Make sure you have an up to date local version of showtime installed on your machine and the latest version of the database downloaded from the live site.

Make the updates on your local copy of showtime first, test and then repeat the steps on the live site once you have tested locally.

## 1. Setting up a local copy of showtime

1. Download & install sequal pro application for managing databases: [http://www.sequelpro.com/download](http://www.sequelpro.com/download)

2. Export a copy of the live showtime database from PHPMyAdmin. Save the sql file to your desktop.
URL for showtime PHPMyAdmin: [https://web-ip1.arts.local:8443/phpmyadmin](https://web-ip1.arts.local:8443/phpmyadmin)

3. Log in to your localhost PHPMyAdmin using [http://localhost/phpMyAdmin/](http://localhost/phpMyAdmin/)

4. Create a new local database, called "arts_uploader".

5. Create a user for the _arts_uploader_ database called "testuser" and password set to "test". Set the user to have "all privilidges" access on the database. **Hosts** - set to "localhost".

6. Use the sequel Pro app to connect to your local arts_uploader database and import the SQL file you downloaded in step 2.

## 2. Updating student profiles to use Futuremap page template

For each student that you are adding to the Futuremap for this year, you will need to update their record in the showtime databse. 

** How To: **

### Part A - Add a new year to futuremap specialtheme table  

1. Open your local PHPMyAdmin [http://localhost/phpMyAdmin/](http://localhost/phpMyAdmin/)

2. Go to the 'specialtheme' table. Insert a new row for the current year. Take note of the ID. (used in part B - below)


### Part B - Update each student's profile in the database

1. open local PHPMyAdmin

2. Click to view the "student" table. (click the table name in the left sidebar)

3. Select the "search" tab and do a search on the "ProfileName" field for the student you want to add to futuremap. Example if you are searching for the profile for "abigail smith", you would enter "abigailsmith" (_no space between first and lastname_) in the ProfileName field in search. 
Make sure you set the search "operator" to "=" to find an exact match. Click "go" and you should see the student entry in the database.

4. Edit the student entry - change the **specialtheme_id** field to the number that corresponds to the year you are adding. This should update their profile to use the futuremap theme.  

Example. 
For year 2013. Futuremap 2013 specialtheme_id = 6, so each student row in the database should have the special theme_id field updated to '6'

5. To test, navigate to http://localhost/showtime/studentname in your browser. You should see the student profile using the futuremap layout.

6. Repeat for each student you want to add to futuremap.


### Part C - Update showtime php files

1. Clone the showtime repo from Github. [https://github.com/artslondon/Showtime](https://github.com/artslondon/Showtime)
    - to clone, run `git clone https://github.com/artslondon/Showtime.git` from within terminal.

2. Open up the folder you cloned from git in your text editor.(sublime text or equivalent)

3. Open **app/controllers/media_controller.php**.  Edit from line 216, example code below:

```php
    case "futuremap":
        if (!empty($params['year'])) {
            if ($params['year'] == "2013") {                    
                $special_filter['Student.specialtheme_id'] = 6;
            } else if ($params['year'] == "2012") {
                $special_filter['Student.specialtheme_id'] = 5;
            } else if ($params['year'] == "2011") {
                $special_filter['Student.specialtheme_id'] = 4;
            } else if ($params['year'] == "2010") {
                $special_filter['Student.specialtheme_id'] = 3;
            } else if ($params['year'] == "2009") {
                $special_filter['Student.specialtheme_id'] = 1;
            } else {
                $special_filter['Student.specialtheme_id'] = 99;
            }
        }
        else {
            $special_filter[] = "(Student.specialtheme_id = '6')";
        }
        $this->paginate['limit'] =80;
        break;
        }
```

Add a new if statement and increment specialtheme_id to the code block above for the year that you are adding. 

**Example** 

For 2014, you would add the following code to the block above.  

```php
    if ($params['year'] == "2014") {                    
        $special_filter['Student.specialtheme_id'] = 7;
    }
```

4. from the same media_controller.php file, change this line:

```php
    $special_filter[] = "(Student.specialtheme_id = '6')";'
``` 
To use your new specialtheme_id

**Example** 

For 2014, the updated line would read: 

```php 
    $special_filter[] = "(Student.specialtheme_id = '7')";
```



## 3. Repeat changes on the live site

After completing steps 1 and 2 on your local showtime install, repeat for the live site by making changes to the live files and database.

1. Showtime live PHPMyAdmin: [https://web-ip1.arts.local:8443/phpmyadmin/](https://web-ip1.arts.local:8443/phpmyadmin/)
   - if you do not have an admin login for showtime, you will need to request one or use an existing login.

2. update Showtime php files:  (see part ### Part C - 3. from above) copy the modified php file to the live server.






