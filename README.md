# membership-database
Software to manage members of organizations
# How to run the api?
> ### 1. Install [python 3.10.8](https://www.python.org/downloads/release/python-3108/)
> ### 2. Set up PostgreSQL
> 1. Download and install the [PostgreSQL](https://www.postgresql.org/download/windows/)
> 2. Setup the PostgreSQL password "s8r2j123"
> 3. Connect the available server
> 4. Create the database on that server with name "sedsnepalmembers.db"
> ### 3. Clone the "backend" branch to your local computer
> 1. Create a folder on your desktop
> 2. Open gitbash in that folder
> 3. Initialize the git using the command:&nbsp;git init
> 4. Clone the "backend" branch in that folder using command:&nbsp;git clone -b backend https://github.com/SEDS-Nepal/membership-database.git
> ### 4. Set up Pycharm
> 1. Download and install [Pycharm](https://www.jetbrains.com/pycharm/download/#section=windows)
> 2. Open the project folder "backend" as a pycharm project in pycharm
> 3. When opened in pycharm then the following screen will pop up
> ![image](https://user-images.githubusercontent.com/101032943/202765073-ae607702-f2c0-4bfa-bc83-caf8a11afa98.png)
> 4. Provide the address of the python installed in your computer into the base interpreter and click "ok"
> 4. Run this command in the pycharm terminal: pip install -r requirements.txt
> ### 5. Run this command in the pycharm teminal:
> &nbsp; uvicorn dbinitialize:app --reload
