from glob import glob
import os
import csv
import pandas as pd
import json

def get_user_dict():
    result = {}
    with open("./user_list.txt", "r") as f:
            for line in f:
                columns = line.strip().split()

                key = columns[0]
                value = columns[1]

                result[key] = value
    return result


def get_data(tag):
    path = f"./divide/data_{tag}.csv"
    df = pd.read_csv(path)
    data = json.loads(df.to_json(orient='records'))
    return data

def get_df(tag):
    path = f"./divide/data_{tag}.csv"
    df = pd.read_csv(path)
    df = df.rename(columns={"memberId" : "userID", "problemId":"itemID"})
    # print(df)
    df["rating"] = 5
    return df