# membership-database
Software to manage members of organizations
# How to run the api?
> ### 1. Install latest version of [python](https://www.python.org/downloads/)
> ### 2. Set up PostgreSQL
> 1. Download and install the [PostgreSQL](https://www.postgresql.org/download/windows/)
> 2. Setup the PostgreSQL password "s8r2j123"
> 3. Connect the available server
> 4. Create the database on that server with name "sedsnepalmembers.db"
> ### 3. Clone the "backend" folder to your local computer
> ### 4. Set up Pycharm
> 1. Download and install [Pycharm](https://www.jetbrains.com/pycharm/download/#section=windows)
> 2. Open the project folder "backend" in pycharm
> 3. Run this command in the pycharm terminal: pip install -r requirements.txt
> ### 5. Run this command in the pycharm teminal:
> &nbsp; uvicorn dbinitialize:app --reload
