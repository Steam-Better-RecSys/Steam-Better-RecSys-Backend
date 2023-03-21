import os
from dotenv import dotenv_values

# Python Environment Variable setup required on System or .env file
config_env = {
    **dotenv_values(".env"),  # load local file development variables
    **os.environ,  # override loaded values with system environment variables
}
