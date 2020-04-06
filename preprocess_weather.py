# Import libraries
import numpy as np
import pandas as pd

# List of all cities
cities = ['Portland', 'San Francisco', 'Seattle', 'Los Angeles', 'San Diego', 'Las Vegas', 'Phoenix',
          'Albuquerque', 'Denver', 'San Antonio', 'Dallas', 'Houston', 'Kansas City', 'Minneapolis',
          'Saint Louis', 'Chicago', 'Nashville', 'Indianapolis', 'Atlanta', 'Detroit', 'Jacksonville',
          'Charlotte', 'Miami', 'Pittsburgh', 'Philadelphia', 'New York']

# List of all features
feats = ['weather_description', 'humidity', 'pressure', 'temperature', 'wind_direction', 'wind_speed']


# A method that preprocesses the dates for a given dataframe
# Inputs
#   dataframe: the pandas dataframe to be modified
#   col: a string that represents the column of the dates
# Outputs
#   the dataframe with modified date format
def preprocess_dates(dataframe, col='datetime'):
    dataframe[col] = pd.to_datetime(dataframe[col], format='%Y-%m-%d %H:%M:%S')
    dataframe[col] = dataframe[col].dt.strftime('%Y-%m-%d-%H')
    return dataframe


# Find size of the entire dataset
sample_df = pd.read_csv('data/humidity.csv')
sample_df = preprocess_dates(sample_df)
data_shape = sample_df.values.shape
cols = sample_df.keys().values
dates = sample_df.values[:, 0]

# Initialize a 3D array of shape (num_timepoints x num_cities x num_feats)
dataset = np.zeros((data_shape[0], len(cities), len(feats) - 1))
description_set = None

# Extract all features and build into a numpy array
for idx, feat in enumerate(feats):
    df = pd.read_csv('data/%s.csv' % feat)
    df = preprocess_dates(df)
    # Check that the dates are consistent
    match_rows = df.values[:, 0] == dates
    assert(match_rows.all())
    # Check that the cities are consistent
    match_cols = df.keys().values == cols
    assert(match_cols.all())
    # Extract data from specified cities
    df_filter = df[cities]
    # Add numerical data to the numpy array
    if feat != 'weather_description':
        dataset[:, :, idx - 1] = np.array(df_filter.values)
    # Add string descriptions to separate array
    else:
        description_set = df_filter.values

# Build the time dataframe using the saved values
output_df = []
for ii in range(np.size(dataset, axis=0)):
    for jj in range(np.size(dataset, axis=1)):
        data = [dates[ii], cities[jj], description_set[ii, jj]] + list(dataset[ii, jj, :])
        if np.nan not in data:
            output_df.append(data)
output_df = pd.DataFrame(output_df, columns=['Time', 'City'] + feats)
output_df.to_csv('weather.csv', index=False)
